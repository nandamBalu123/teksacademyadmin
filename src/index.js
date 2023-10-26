import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { AuthContextProvider } from "./context/AuthContext";

import { UsersContextProvider } from "./context/UserContext";
import { BranchContextProvider } from "./context/BranchContext";
import { RoleContextProvider } from "./context/RoleContext";

import { LeadSourceContextProvider } from "./context/LeadSourceContext";
import { DepartmentContextProvider } from "./context/DepartmentContext";

import { CoursePackageContextProvider } from "./context/CoursePackageContext";
import { CourseContextProvider } from "./context/CourseContext";
import { StudentsContextProvider } from "./context/StudentsContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <StudentsContextProvider>
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
      </StudentsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
