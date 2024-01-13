import React, { useEffect } from "react";
import { useGlobalContext } from "../context";
import { useNavigate } from "react-router-dom";
import budget from "../assets/budget.png";
import { FcGoogle } from "react-icons/fc";
const Login = () => {
  const navigate = useNavigate();
  const { signIn, loggedInUser } = useGlobalContext();

  useEffect(() => {
    if (loggedInUser) {
      navigate("/");
    }
    return;
  }, [loggedInUser]);

  return (
    <div className="login">
      <img src={budget} alt="expense" className="hero-img" />
      <h1 className="hero-title">Expense Tracker</h1>
      <button className="login-btn" onClick={signIn}>
        <FcGoogle style={{ marginRight: "1rem", fontSize: "2rem" }} /> Login
        with google
      </button>
    </div>
  );
};

export default Login;
