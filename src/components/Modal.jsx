import React from "react";
import { useGlobalContext } from "../context";
import { IoCloseSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Modal = () => {
  const navigate = useNavigate("/");
  const {
    isModalOpen,
    setIsModalOpen,
    modalData,
    deleteTransaction,
    setIsEdit,
    setTransactionInput,
  } = useGlobalContext();
  const { id, label, amount, type, date } = modalData;
  return (
    <div
      className={isModalOpen ? "modal-overlay" : "modal-overlay hide-modal"}
      onClick={() => setIsModalOpen(false)}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <IoCloseSharp className="close" onClick={() => setIsModalOpen(false)} />
        <h3 className="modal-title">Transaction Details</h3>
        <div className="transaction-details">
          <p>
            Id: <span>{id}</span>
          </p>
          <p>
            Label:{" "}
            {type === "balance" ? (
              <span>
                {label} {amount}
              </span>
            ) : (
              <span>{label}</span>
            )}
          </p>
          <p>
            Type: <span>{type}</span>
          </p>
          <p>
            Amount: <span>${amount}</span>
          </p>
          <p>
            Date Created: <span>{date}</span>
          </p>
        </div>
        <button
          onClick={() => {
            setIsEdit(true);
            setTransactionInput({
              label: modalData.label,
              amount: modalData.amount,
            });
            if (type === "expense") {
              navigate("/addExpense");
            } else {
              navigate("/addIncome");
            }
            setIsModalOpen(false);
          }}
          className="btn"
        >
          Edit
        </button>
        <button
          onClick={() => {
            deleteTransaction(id);
            setIsModalOpen(false);
          }}
          className="btn"
          style={{ backgroundColor: "rgb(223, 37, 37)" }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Modal;
