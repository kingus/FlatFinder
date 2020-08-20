import React from "react";
import "./App.css";
import RegisterBox from "./components/RegisterBox";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ActivateUser from "./components/ActivateUser";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginBox from "./components/Login";
import Home from "./components/Home";
import AparamentsList from "./components/ApartamentsList";

const App = () => (
  <div className="app_container">
    <Router>
      <Switch>
        <Route exact path="/signup" component={RegisterBox} />
        <Route exact path="/login" component={LoginBox} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/apartaments" component={AparamentsList} />
        <Route exact path="/activate/:uid/:token" component={ActivateUser} />
      </Switch>
    </Router>
  </div>
);
export default App;
