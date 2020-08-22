import React, { useState, createContext } from "react";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const changeUserActivity = () => {
    setIsAuthenticated(!isAuthenticated);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, changeUserActivity: changeUserActivity }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
