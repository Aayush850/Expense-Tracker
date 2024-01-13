import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { auth, authProvider, db } from "./config/firebase-config";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import {
  doc,
  collection,
  getDoc,
  setDoc,
  deleteDoc,
  serverTimestamp,
  addDoc,
  query,
  onSnapshot,
  orderBy,
  where,
} from "firebase/firestore";
import { toast } from "react-toastify";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [loading, setLoading] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [transactionInput, setTransactionInput] = useState({
    label: "",
    amount: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const userRef = collection(db, "users");
  const transactionsRef = collection(db, "transactions");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedInUser({
          id: user.uid,
          name: user.displayName,
          image: user.photoURL,
          email: user.email,
        });
        setLoading(false);
      } else {
        setLoggedInUser(null);
        setLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    if (loggedInUser) {
      getTransactions();
    }
  }, [loggedInUser]);

  useEffect(() => {
    const income = transactions
      .filter((transaction) => transaction.type === "income")
      .reduce(
        (accumulator, transaction) => accumulator + transaction.amount,
        0
      );
    const expense = transactions
      .filter((transaction) => transaction.type === "expense")
      .reduce(
        (accumulator, transaction) => accumulator + transaction.amount,
        0
      );
    setTotalIncome(income);
    setTotalExpense(expense);
    setBalance(income - expense);
  }, [transactions]);

  const signIn = async () => {
    try {
      const { user } = await signInWithPopup(auth, authProvider);
      const { displayName, photoURL, email, uid } = user;
      const userDocRef = doc(userRef, uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await setDoc(userDocRef, { name: displayName, email });
      }
      setLoggedInUser({
        id: uid,
        name: displayName,
        image: photoURL,
        email,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  const getTransactions = async () => {
    try {
      const q = query(
        transactionsRef,
        where("userId", "==", loggedInUser.id),
        orderBy("createdAt")
      );
      onSnapshot(q, (snapshot) => {
        let docs = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;
          docs.push({ ...data, id });
        });
        setTransactions(docs.reverse());
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addTransaction = async (e) => {
    e.preventDefault();

    if (transactionInput.label === "" || transactionInput.amount === "") {
      alert("Invalid entries! Make sure the label and amount is not empty");
      return;
    }
    const transactionType = e.target.id;
    let newTransaction = {
      ...transactionInput,
      amount: +transactionInput.amount,
      type: transactionType,
      userId: loggedInUser.id,
      createdAt: serverTimestamp(),
    };
    try {
      if (isEdit) {
        const transactionDocRef = doc(db, "transactions", modalData.id);
        await setDoc(transactionDocRef, newTransaction);
        setTransactionInput({
          label: "",
          amount: "",
        });
        setIsEdit(false);
        toast.success("Transaction edited");
        return;
      }
      await addDoc(transactionsRef, newTransaction);
      toast.success(`${newTransaction.type} added`);
      setTransactionInput({
        label: "",
        amount: "",
      });
    } catch (error) {
      toast.error("An error occured!");
    }
  };

  const openModal = (id, label, amount, type, createdAt) => {
    let date = new Date(createdAt.seconds * 1000).toLocaleDateString();
    setModalData({ id, label, amount, type, date });
    setIsModalOpen(true);
  };

  const deleteTransaction = async (id) => {
    try {
      const transactionDoc = doc(db, "transactions", id);
      await deleteDoc(transactionDoc);
      toast.success("Transaction deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const resetTransactionInput = () => {
    setTransactionInput({
      label: "",
      amount: "",
    });
  };

  return (
    <AppContext.Provider
      value={{
        isSidebarOpen,
        setIsSidebarOpen,
        signIn,
        logOut,
        loggedInUser,
        loading,
        transactionInput,
        balance,
        transactions,
        totalIncome,
        totalExpense,
        setTransactionInput,
        resetTransactionInput,
        addTransaction,
        openModal,
        isModalOpen,
        setIsModalOpen,
        modalData,
        setModalData,
        deleteTransaction,
        isEdit,
        setIsEdit,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
