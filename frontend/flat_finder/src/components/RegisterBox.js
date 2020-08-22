import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import "./LoginBox.css";
import Navbar from "./Navbar";
import flat from "../images/flat.jpg";
import axios from "axios";
import Footer from "./Footer";
const RegisterBox = () => {
  const [accoutCreated, setAccountCreated] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    re_password: "",
  });

  const { username, email, password, re_password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("SUBMIT");
    if (password === re_password) {
      signup(username, email, password, re_password);
      setAccountCreated(true);
    }
  };

  if (accoutCreated) {
    return <Redirect to="/login" />;
  }

  const signup = (username, email, password, re_password) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ username, email, password, re_password });

    axios
      .post("http://127.0.0.1:8000/auth/users/", body, config)
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  return (
    <div className="container">
      <Navbar></Navbar>
      <div className="page-container">
        <div className="loginbox">
          <div className="photo-div">
            <img src={flat} alt="Logo" className="photo" />
          </div>
          <div className="form_container">
            <h1>Sign up</h1>
            <form onSubmit={(e) => onSubmit(e)} className="form-style">
              <div className="input-group">
                <input
                  type="username"
                  name="username"
                  className="login_input"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => onChange(e)}
                ></input>
              </div>
              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  value={email}
                  className="login_input"
                  placeholder="Email"
                  onChange={(e) => onChange(e)}
                ></input>
              </div>
              <div className="input-group">
                <input
                  type="password"
                  name="password"
                  value={password}
                  className="login_input"
                  placeholder="Password"
                  onChange={(e) => onChange(e)}
                ></input>
              </div>
              <div className="input-group">
                <input
                  type="password"
                  name="re_password"
                  className="login_input"
                  placeholder="Repeat password"
                  value={re_password}
                  onChange={(e) => onChange(e)}
                ></input>
              </div>
              <div className="btn-div">
                <button className="btn-login" type="submit">
                  Register
                </button>
              </div>
            </form>

            <div className="bottom-btns">
              <Link to="/login">
                <label className="lbl">Login</label>{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default RegisterBox;
