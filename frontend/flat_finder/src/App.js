import React from "react";
import "./App.css";
import RegisterBox from "./components/RegisterBox";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ActivateUser from "./components/ActivateUser";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => (
  <div className="app_container">
    <Router>
      <Switch>
        <Route exact path="/signup" component={RegisterBox} />
        <Route exact path="/activate/:uid/:token" component={ActivateUser} />
      </Switch>
    </Router>
    <Footer></Footer>
  </div>
);
export default App;
