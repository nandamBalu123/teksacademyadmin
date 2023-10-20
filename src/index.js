import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";

import { UsersContextProvider } from "./context/UserContext";
import { BranchContextProvider } from "./context/BranchContext";
import { RoleContextProvider } from "./context/RoleContext";
import { SettingsContextProvider } from "./context/SettingsContext";
import { LeadSourceContextProvider } from "./context/LeadSourceContext";
import { DepartmentContextProvider } from "./context/DepartmentContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <SettingsContextProvider>
        <RoleContextProvider>
          <BranchContextProvider>
            <LeadSourceContextProvider>
              <DepartmentContextProvider>
                <UsersContextProvider>
                  <App />
                </UsersContextProvider>
              </DepartmentContextProvider>
            </LeadSourceContextProvider>
          </BranchContextProvider>
        </RoleContextProvider>
      </SettingsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
