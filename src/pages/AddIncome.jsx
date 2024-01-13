import React from "react";
import { useGlobalContext } from "../context";
const AddIncome = () => {
  const { transactionInput, setTransactionInput, addTransaction, isEdit } =
    useGlobalContext();
  return (
    <div className="container">
      <div className="form-container">
        <h3>Add an Income Source</h3>
        <p>Adds on to your current income amount</p>
        <form id="income" onSubmit={addTransaction}>
          <div className="form-control">
            <label htmlFor="label">Label</label>
            <input
              type="text"
              id="label"
              placeholder="Ex: Salary"
              name="income-label"
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
              name="income-amount"
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
            {isEdit ? "Edit Income" : "Add Income"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddIncome;
