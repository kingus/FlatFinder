import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../images/logo.png";
import heart from "../images/heart.png";
import logout from "../images/logout.png";
import { logOut } from "../actions/auth";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = (props) => {
  const context = useContext(AuthContext);
  // const [linksAuth, setLinksAuth] = useState([
  //   {
  //     name: "Apartament",
  //     path: "/apartaments",
  //   },
  // ]);

  // if (context.isAuthenticated) {
  //   setLinksAuth(
  //     {
  //       name: "Apartament",
  //       path: "/apartaments",
  //     },
  //     {
  //       name: "Home",
  //       path: "/home",
  //     }
  //   );
  // }

  const handleLogOut = () => {
    logOut();
    context.changeUserActivity();
  };

  if (!context.isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="navbar">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
        <h1>Flat Finder</h1>
      </div>
      <ul></ul>
      <div className="icons-container">
        <img src={heart} alt="Logo" className="icon" />

        <img src={logout} alt="Logo" className="icon" onClick={handleLogOut} />
      </div>
    </div>
  );
};
export default Navbar;
