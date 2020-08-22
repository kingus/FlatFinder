import React, { useState, useEffect, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import "./LoginBox.css";
import Navbar from "./Navbar";
import flat from "../images/flat.jpg";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import Footer from "./Footer";

const LoginBox = () => {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [token, setToken] = useState();
  const { username, password } = formData;
  const context = useContext(AuthContext);

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
    axios
      .post("http://localhost:8000/auth/jwt/create/", body, config)
      .then(function (response) {
        // handle success
        setToken(response.data.access);
        localStorage.setItem("token", response.data.access);
        localStorage.setItem("access", response.data.access);
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

  useEffect(() => {
    load_user();
  }, [token]);

  const load_user = () => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
        },
      };
      try {
        const res = axios.get(
          "http://localhost:8000/auth/users/me/",

          config
        );
        context.changeUserActivity();
        // setIsAuthenticated(true);
      } catch (err) {}
    } else {
    }
  };

  if (context.isAuthenticated) {
    return <Redirect to="/apartaments" />;
  }

  return (
    <div className="container">
      <Navbar></Navbar>
      <div className="page-container">
        <div className="loginbox">
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
      <Footer></Footer>
    </div>
  );
};

export default LoginBox;
