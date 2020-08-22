import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../images/logo.png";
import heart from "../images/heart.png";
import logout from "../images/logout.png";
import { logOut } from "../actions/auth";
import { Redirect, Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import uuid from "uuid";

const Navbar = (props) => {
  const context = useContext(AuthContext);
  const [linksAuth, setLinksAuth] = useState(
    context.isAuthenticated
      ? [
          {
            name: "Apartament",
            path: "/apartaments",
          },
          {
            name: "Home",
            path: "/home",
          },
        ]
      : []
  );

  const handleLogOut = () => {
    logOut();
    context.changeUserActivity();
  };

  return (
    <div className="navbar">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
        <h1>Flat Finder</h1>
      </div>
      <ul>
        {linksAuth.map((link) => {
          return (
            <Link to={link.path} key={uuid.v4()}>
              <li>{link.name}</li>
            </Link>
          );
        })}
      </ul>
      <div className="icons-container">
        <img src={heart} alt="Logo" className="icon" />

        <Link to="/login">
          <img
            src={logout}
            alt="Logo"
            className="icon"
            onClick={handleLogOut}
          />
        </Link>
      </div>
    </div>
  );
};
export default Navbar;
