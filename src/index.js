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

import { CoursePackageContextProvider } from "./context/CoursePackageContext";
import { CourseContextProvider } from "./context/CourseContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <RoleContextProvider>
        <BranchContextProvider>
          <LeadSourceContextProvider>
            <DepartmentContextProvider>
              <CourseContextProvider>
                <CoursePackageContextProvider>
                  <UsersContextProvider>
                    <App />
                  </UsersContextProvider>
                </CoursePackageContextProvider>
              </CourseContextProvider>
            </DepartmentContextProvider>
          </LeadSourceContextProvider>
        </BranchContextProvider>
      </RoleContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
