import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
  });

  useEffect(() => {
    localStorage.setItem(
      "isAuthenticated",
      authState.isAuthenticated.toString()
    );
    localStorage.setItem("user", JSON.stringify(authState.user));
  }, [authState]);

  const login = (userData) => {
    setAuthState({ isAuthenticated: true, user: userData });
  };

  const logout = () => {
    setAuthState({ isAuthenticated: false, user: null });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
