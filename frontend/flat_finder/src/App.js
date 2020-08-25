import React, { useContext } from "react";
import "./App.css";
import RegisterBox from "./components/RegisterBox";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import ActivateUser from "./components/ActivateUser";
import LoginBox from "./components/Login";
import Home from "./components/Home";
import AparamentsList from "./components/ApartamentsList";
import AuthContextProvider, { AuthContext } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <AuthContextProvider>
      <div className="app_container">
        <Router>
          <Switch>
            <Route exact path="/signup" component={RegisterBox} />
            <Route exact path="/login" component={LoginBox} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/apartaments" component={AparamentsList} />
            <Route
              exact
              path="/activate/:uid/:token"
              component={ActivateUser}
            />
          </Switch>
        </Router>
      </div>
    </AuthContextProvider>
  );
};
export default App;
