import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useGlobalContext } from "../context";
const Navbar = () => {
  const { setIsSidebarOpen, loggedInUser, logOut } = useGlobalContext();
  const { name, image } = loggedInUser;
  return (
    <nav className="navbar">
      <div className="nav-container">
        <GiHamburgerMenu
          className="toggle"
          onClick={() => setIsSidebarOpen(true)}
        />
        <div className="user">
          <img src={image} alt={name} className="user-image"></img>
          <p>
            Welcome, <span className="name">{name}</span>
          </p>
        </div>
        <button className="logout-btn" onClick={logOut}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
