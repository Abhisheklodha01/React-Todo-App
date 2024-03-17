import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/app.scss";

export const Context = createContext({ isAuthenticated: false });

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loader, setLoader] = useState(false)
  const [user, setUser] = useState({})

  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        loader,
        setLoader,
        user,
        setUser
      }}
    >
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
