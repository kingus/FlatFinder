import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import "./LoginBox.css";
import Navbar from "./Navbar";
import flat from "../images/flat.jpg";
import axios from "axios";

const LoginBox = () => {
  const [accoutCreated, setAccountCreated] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [token, setToken] = useState();

  const { username, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("SUBMIT");
    login(username, password);
  };

  const login = (username, password) => {
    console.log(username);
    console.log(password);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    var token;
    const body = JSON.stringify({ username, password });
    console.log(body);
    axios
      .post("http://localhost:8000/auth/jwt/create/", body, config)
      .then(function (response) {
        // handle success
        console.log(response);
        setToken(response.data.access);
        console.log(token);
        // verify();
        localStorage.setItem("token", response.data.access);
        localStorage.setItem("access", response.data.access);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  const verify = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body2 = '"{token": ' + token + "}";
    console.log(body2);
    axios
      .post("http://localhost:8000/auth/jwt/verify/", body2, config)
      .then(function (response) {
        console.log("RESP:", response);
      })
      .catch(function (error) {
        // handle error
        console.log("ERR", error);
      })
      .then(function () {
        // always executed
      });
  };

  useEffect(() => {
    load_user();
  }, [token]);

  const load_user = () => {
    console.log("FFFFFF");
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
        },
      };
      console.log("TTTYY");
      try {
        const res = axios.get(
          "http://localhost:8000/auth/users/me/",

          config
        );
        console.log("TYYY", res);
      } catch (err) {
        console.log("ERR", err);
      }
    } else {
    }
  };

  return (
    <div className="container">
      <Navbar></Navbar>

      <div className="mainbox">
        <div className="photo-div">
          <img src={flat} alt="Logo" className="photo" />
        </div>
        <div className="form_container">
          <h1>Sign in</h1>
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
                type="password"
                name="password"
                value={password}
                className="login_input"
                placeholder="Password"
                onChange={(e) => onChange(e)}
              ></input>
            </div>
            <div className="btn-div">
              <button className="btn-login" type="submit">
                Login
              </button>
            </div>
          </form>

          <div className="bottom-btns">
            <Link to="/signup">
              <label className="lbl">Register</label>{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginBox;
