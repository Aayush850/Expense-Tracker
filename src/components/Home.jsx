import React from "react";
import Transaction from "./Transaction";
import { useGlobalContext } from "../context";
import Modal from "./Modal";

const Home = () => {
  const { balance, transactions, totalIncome, totalExpense } =
    useGlobalContext();
  return (
    <main className="home-section container">
      <div className="budget-info">
        <div className="info-card">
          <h3>Your Balance</h3>
          <p
            className={
              balance > 0
                ? "income amount"
                : balance === 0
                ? "amount"
                : "expense amount"
            }
          >
            {balance >= 0 ? `$${balance}` : `-$${balance * -1}`}
          </p>
        </div>
        <div className="info-card">
          <h3>Income</h3>
          <p className=" amount">${totalIncome}</p>
        </div>
        <div className="info-card">
          <h3>Expenses</h3>
          <p className=" amount">${totalExpense}</p>
        </div>
      </div>
      <div className="transaction-history">
        <h3>Transaction History</h3>
        <hr></hr>
        <div className="transactions">
          <Modal />
          {transactions.length > 0 ? (
            transactions.map((transaction) => {
              const { id } = transaction;
              return <Transaction key={id} {...transaction}></Transaction>;
            })
          ) : (
            <p>You have not made any transactions</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
