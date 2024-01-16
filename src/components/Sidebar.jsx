import React from "react";
import { IoMdHome } from "react-icons/io";
import { IoIosAddCircle } from "react-icons/io";
import { BiSolidDollarCircle } from "react-icons/bi";
import { IoCloseSharp } from "react-icons/io5";
import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { isSidebarOpen, setIsSidebarOpen, resetTransactionInput, setIsEdit } =
    useGlobalContext();
  return (
    <div className={isSidebarOpen ? "sidebar" : "sidebar hide-sidebar"}>
      <IoCloseSharp className="close" onClick={() => setIsSidebarOpen(false)} />
      <ul className="sidebar-items">
        <li className="sidebar-item">
          <Link
            to="/"
            onClick={() => {
              resetTransactionInput();
              setIsSidebarOpen(false);
              setIsEdit(false);
            }}
            className="sidebar-link"
          >
            <IoMdHome style={{ marginRight: "0.5rem" }} />
            Home
          </Link>
        </li>
        <li className="sidebar-item">
          <Link
            to="/addIncome"
            onClick={() => {
              resetTransactionInput();
              setIsSidebarOpen(false);
              setIsEdit(false);
            }}
            className="sidebar-link"
          >
            <BiSolidDollarCircle
              style={{ color: "green", marginRight: "0.5rem" }}
            />
            Add Income
          </Link>
        </li>
        <li className="sidebar-item">
          <Link
            to="/addExpense"
            onClick={() => {
              resetTransactionInput();
              setIsSidebarOpen(false);
              setIsEdit(false);
            }}
            className="sidebar-link"
          >
            <IoIosAddCircle style={{ color: "red", marginRight: "0.5rem" }} />
            Add Expense
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
