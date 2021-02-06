import React, { createContext } from "react";
import useAuthentication from "./hooks/useAuthentication";

const Context = createContext();

function AuthProvider({ children }) {
  const { authenticated, loading, handleLogout } = useAuthentication();

  return (
    <Context.Provider
      value={{ loading, authenticated, handleLogout }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };
