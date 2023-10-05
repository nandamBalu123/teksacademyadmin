import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { LoggedUserContextProvider } from "./context/LoggedUserContext";
import { UsersContextProvider } from "./context/UserContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <UsersContextProvider>
        <LoggedUserContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </LoggedUserContextProvider>
      </UsersContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
