import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import "./ActivateUser.css";
import flat from "../images/flat.jpg";
import MySlider from "./MySlider";

const ActivateUser = ({ match }) => {
  const [verified, setVerified] = useState(false);

  const verifyAccount = () => {
    const uid = match.params.uid;
    const token = match.params.token;
    setVerified(true);

    console.log(uid);
    console.log(token);
    verify(uid, token);
  };

  const verify = (uid, token) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ uid, token });

    axios
      .post("http://127.0.0.1:8000/auth/users/activation/", body, config)
      .then(function (response) {
        // handle success
        console.log(response);
        setVerified(true);
      })
      .catch(function (error) {
        // handle error
        setVerified(false);
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };
  if (verified) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="container">
      <Navbar></Navbar>
      <div className="page-container">
        <div className="activatebox">
          <div className="photo-div">
            <img src={flat} alt="Logo" className="photo" />
          </div>
          <div className="verification">
            <h1>Activate your account</h1>
            <MySlider verifyAccount={verifyAccount}></MySlider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivateUser;
