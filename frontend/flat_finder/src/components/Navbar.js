import React from "react";
import "./Navbar.css";
import logo from "../images/logo.png";
import heart from "../images/heart.png";
import logout from "../images/logout.png";

const Navbar = () => (
  <div className="navbar">
    <div className="logo-container">
      <img src={logo} alt="Logo" className="logo" />
      <h1>Flat Finder</h1>
    </div>
    <ul>
      <li>Home</li>
      <li>Apartaments</li>
    </ul>
    <div className="icons-container">
      <img src={heart} alt="Logo" className="icon" />

      <img src={logout} alt="Logo" className="icon" />
    </div>
  </div>
);
export default Navbar;
