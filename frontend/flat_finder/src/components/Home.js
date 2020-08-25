import React, { useState } from "react";
import "./LoginBox.css";

const Home = () => {
  const [accoutCreated, setAccountCreated] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  return <div className="container"></div>;
};

export default Home;
