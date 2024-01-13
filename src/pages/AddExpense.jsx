import React from "react";
import { useGlobalContext } from "../context";

const AddExpense = () => {
  const { transactionInput, setTransactionInput, addTransaction, isEdit } =
    useGlobalContext();
  return (
    <div className="container">
      <div className="form-container">
        <h3>Add an Expense</h3>
        <p>Adds on to your current expense amount</p>
        <form id="expense" onSubmit={addTransaction}>
          <div className="form-control">
            <label htmlFor="label">Label</label>
            <input
              type="text"
              id="label"
              placeholder="Ex: Shopping"
              value={transactionInput.label}
              onChange={(e) =>
                setTransactionInput({
                  ...transactionInput,
                  label: e.target.value,
                })
              }
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              placeholder="Ex: 3000"
              value={transactionInput.amount}
              onChange={(e) =>
                setTransactionInput({
                  ...transactionInput,
                  amount: e.target.value,
                })
              }
            />
          </div>
          <button className="btn">
            {isEdit ? "Edit Expense" : "Add Expense"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;
