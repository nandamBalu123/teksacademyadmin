import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { AuthContextProvider } from "./context/AuthContext";

import { UsersContextProvider } from "./context/UsersContext";
import { BranchContextProvider } from "./context/BranchContext";
import { RoleContextProvider } from "./context/RoleContext";

import { LeadSourceContextProvider } from "./context/LeadSourceContext";
import { DepartmentContextProvider } from "./context/DepartmentContext";

import { CoursePackageContextProvider } from "./context/CoursePackageContext";
import { CourseContextProvider } from "./context/CourseContext";
import { StudentsContextProvider } from "./context/StudentsContext";
import { StudentContextProvider } from "./context/StudentContext";
import { ToastContainer } from "react-toastify";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <StudentsContextProvider>
        <StudentContextProvider>
          <RoleContextProvider>
            <BranchContextProvider>
              <LeadSourceContextProvider>
                <DepartmentContextProvider>
                  <CourseContextProvider>
                    <CoursePackageContextProvider>
                      <UsersContextProvider>
                        <App />
                        <ToastContainer />
                      </UsersContextProvider>
                    </CoursePackageContextProvider>
                  </CourseContextProvider>
                </DepartmentContextProvider>
              </LeadSourceContextProvider>
            </BranchContextProvider>
          </RoleContextProvider>
        </StudentContextProvider>
      </StudentsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
