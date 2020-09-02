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
    context.changeUserActivity(false);
  };

  const [icons, setIcons] = useState(
    context.isAuthenticated
      ? [
          {
            icon: heart,
            func: handleLogOut,
            redirect: "#",
          },
          {
            icon: logout,
            func: handleLogOut,
            redirect: "/login",
          },
        ]
      : []
  );

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
              <li className="">{link.name}</li>
            </Link>
          );
        })}
      </ul>
      <div className="icons-container">
        {icons.map((icon) => {
          return (
            <Link to={icon.redirect} key={uuid.v4()}>
              <img
                src={icon.icon}
                alt="Logo"
                className="icon"
                onClick={icon.func}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default Navbar;
