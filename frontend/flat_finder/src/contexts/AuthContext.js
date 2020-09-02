import React, { useState, createContext } from "react";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  const changeUserActivity = (value) => {
    setIsAuthenticated(value);
    console.log("CHANGED");
  };

  const changeUsername = (username) => {
    setUsername(username);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        changeUserActivity: changeUserActivity,
        changeUsername: changeUsername,
        username,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
