import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import "./LoginBox.css";

const ActivateUser = ({ verify, match }) => {
  const [verified, setVerified] = useState(false);

  const verifyAccount = (e) => {
    e.preventDefault();
    const uid = match.params.uid;
    const token = match.params.token;
    verify(uid, token);
    setVerified(true);
    console.log("SUBMIT");
  };

  return (
    <div className="mainbox">
      <h1>Activate your account</h1>
      <button onClick={verifyAccount} type="button" className="btn-login">
        Activate
      </button>
    </div>
  );
};

export default ActivateUser;
