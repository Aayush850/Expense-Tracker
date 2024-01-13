import React from "react";
import { useGlobalContext } from "../context";

const Transaction = ({ id, label, amount, type, createdAt }) => {
  const { openModal } = useGlobalContext();
  return (
    <div
      className="transaction"
      onClick={() => {
        openModal(id, label, amount, type, createdAt);
      }}
    >
      <p className="transaction-info">{label}</p>
      <span className="transaction-amount">
        {type === "income" || type === "balance" ? `$${amount}` : `-$${amount}`}
      </span>
      <div
        className="color"
        style={
          type === "income" || type === "balance"
            ? { backgroundColor: "green" }
            : { backgroundColor: "red" }
        }
      ></div>
    </div>
  );
};

export default Transaction;
