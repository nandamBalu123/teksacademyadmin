import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Login from "./components/pages/logins/adminlogins/Login";

import "./App.css";

// inventory start
// import Signup from "../src/components/pages/inventory/Signup";
import Register from "../src/components/pages/inventory/Register";
import AssigneAssetsEdit from "./components/pages/inventory/AssigneAssetsEdit";
import Details from "../src/components/pages/inventory/Details";

import Assignassets from "../src/components/pages/inventory/Assignassets";
import Addassets from "../src/components/pages/inventory/Addassets";
import Addassetsform from "../src/components/pages/inventory/Addassetsform";
import Inventoryhome from "../src/components/pages/inventory/Inventoryhome";
import ReturnAssetsForm from "../src/components/pages/inventory/ReturnAssetsForm";
import Addassetsview from "./components/pages/inventory/addassetsview";
import AssetType from "./components/pages/inventory/Settings/AssetType";
import Vendor from "./components/pages/inventory/Settings/Vendor";
import Addassetsedit from "./components/pages/inventory/Addassetsedit";
// inventory end
import Dashboard from "./components/pages/dashboard/Dashboard";
import Sidebar from "./components/common/Sidebar/Sidebar";
import Topbar from "./components/common/Topbar/Topbar";

import RegistrationForm from "./components/pages/student/studentRegistrationForm/RegistrationForm";
import StudentData from "./components/pages/student/studentData/StudentData";
import CreateUserForm from "./components/pages/user/createUserForm/CreateUserForm";

import UsersData from "./components/pages/user/userData/UsersData";
import LoginPage from "./components/pages/loginpage/LoginPage";
import { Box } from "@mui/material";
import CreateRole from "./components/pages/settings/roles/CreateRole";

import Roles from "./components/pages/settings/roles/Roles";
import UserView from "./components/pages/user/userData/UserView";

// import UserViewCopy from "./components/pages/user/userData/UserViewCopy";
import Edit from "./components/pages/user/userData/EditUser";
import RoleAccess from "./components/pages/settings/roles/RoleAccess";
import StudentDataView from "./components/pages/student/studentData/StudentDataView";

import StudentApplicationPrint from "./components/pages/student/studentData/StudentApplicationPrint";
import FeeDetails from "./components/pages/student/fee/FeeDetails";
import Feefollowup from "./components/pages/student/fee/Feefollowup";
import FeeView from "./components/pages/student/fee/FeeView";
import Addtofee from "./components/pages/student/fee/Addtofee";
import EditStudentForm from "./components/pages/student/studentData/EditStudentForm";
import { useAuthContext } from "./hooks/useAuthContext";
import { useEffect } from "react";
import Branch from "./components/pages/settings/branch/Branch";
import CreateBranch from "./components/pages/settings/branch/CreateBranch";
import LeadSource from "./components/pages/settings/leadsource/LeadSource";
import CreateLeadSource from "./components/pages/settings/leadsource/CreateLeadSource";
import Department from "./components/pages/settings/departments/Department";
import CreateDepartment from "./components/pages/settings/departments/CreateDepartment";
import Certificate from "./components/pages/student/Certificate/Certificate";
import CoursePackage from "./components/pages/settings/coursepackage/CoursePackage";
import CreateCoursePackage from "./components/pages/settings/coursepackage/CreateCoursePackage";
import Course from "./components/pages/settings/courses/Course";
import CreateCourse from "./components/pages/settings/courses/CreateCourse";
import Requestedcertificates from "./components/pages/student/Certificate/Requestedcertificates";
import Sidebar1 from "./components/common/Sidebar/Sidebar1";
import Invoice from "./components/pages/student/fee/Invoice";
import ZipCodeLookup from "./components/pages/student/studentRegistrationForm/Zipcode";
import Reports from "./components/pages/Reports/Reports";
import Report from "./components/pages/Reports/Report";
import CreateReport from "./components/pages/Reports/CreateReport";
import FeeReceived from "./components/pages/student/fee/FeeReceived";
import Webinar from "./components/pages/Leads/Website Leads/Webinar";
import WhatsApp  from "./components/pages/Leads/Website Leads/Whatsapp";
// import Formm from "./components/pages/user/createUserForm/Form";

function App() {
  const { user } = useAuthContext();

  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  let role;
  useEffect(() => {
    role = localStorage.getItem("role");
    console.log("role", role);
  }, [user]);

  // let user = localStorage.getItem("user"); //admin-all Counseller-!user and !roles manager-!user and !roles regionalmanager- !user and !roles
  // let token = localStorage.getItem("token");

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <div className="app">
            {user ? <Sidebar /> : undefined}
            {/* {user ? <Sidebar1 /> : undefined} */}
            {/* <Sidebar /> */}

            <div
              style={{ marginBottom: "50px", backgroundColor: "white" }}
            ></div>
            <main className="content" style={{ overflow: "auto" }}>
              {user ? <Topbar /> : undefined}
              {/* <Topbar /> */}
              <Routes>
                <Route
                  path="/"
                  element={user ? <Dashboard /> : <Navigate to="/login" />}
                />
                <Route
                  path="/login"
                  element={!user ? <LoginPage /> : <Navigate to="/" />}
                />
                <Route
                  path="/registrationform"
                  element={
                    user ? <RegistrationForm /> : <Navigate to="/login" />
                  }
                />
                {/* <Route
                  path="/ZipCodeLookup"
                  element={user ? <ZipCodeLookup /> : <Navigate to="/login" />}
                /> */}
                <Route
                  path="/feedetails/:id"
                  element={user ? <FeeDetails /> : <Dashboard />}
                />
                <Route
                  path="/feedetails"
                  element={user ? <FeeDetails /> : <Dashboard />}
                />
                <Route
                  path="/feefollowup"
                  element={user ? <Feefollowup /> : <Dashboard />}
                />
                <Route
                  path="/feereceived"
                  element={user ? <FeeReceived /> : <Dashboard />}
                />
                <Route
                  path="/feeview/:id"
                  element={user ? <FeeView /> : <Dashboard />}
                />
                <Route
                  path="/invoice/:id/:index/:name/:nametype"
                  element={user ? <Invoice /> : <Dashboard />}
                />
                <Route
                  path="/addtofee"
                  element={user ? <Addtofee /> : <Dashboard />}
                />
                <Route path="/studentdata" element={<StudentData />} />
                <Route
                  path="/studentdataview/:id"
                  element={user ? <StudentDataView /> : <Dashboard />}
                />
                <Route path="/certificate" element={<Certificate />} />
                <Route
                  path="/createuser"
                  element={
                    user && user.profile == "admin" ? (
                      <CreateUserForm />
                    ) : (
                      <Dashboard />
                    )
                  }
                />
                <Route
                  path="/requestedcertificates"
                  element={
                    user && user.profile == "admin" ? (
                      <Requestedcertificates />
                    ) : (
                      <Dashboard />
                    )
                  }
                  // element={user ? <Requestedcertificates /> : <Dashboard />}
                />
                <Route
                  path="/usersdata"
                  element={
                    user && user.profile == "admin" ? (
                      <UsersData />
                    ) : (
                      <Dashboard />
                    )
                  }
                />
                <Route
                  path="/userview/:id"
                  element={user ? <UserView /> : <Dashboard />}
                />
                <Route
                  path="/studentApplicationprint/:id"
                  element={user ? <StudentApplicationPrint /> : <Dashboard />}
                />
                <Route
                  path="/roleaccess/:id"
                  element={
                    user && user.profile == "admin" ? (
                      <RoleAccess />
                    ) : (
                      <Dashboard />
                    )
                  }
                />
                <Route
                  path="/edituser/:id"
                  element={
                    user && user.profile == "admin" ? <Edit /> : <Dashboard />
                  }
                />
                <Route
                  path="/editstudent/:id"
                  element={user ? <EditStudentForm /> : <Dashboard />}
                />
                <Route
                  path="/roles"
                  element={
                    user && user.profile == "admin" ? <Roles /> : <Dashboard />
                  }
                />
                <Route
                  path="/createrole"
                  element={
                    user && user.profile == "admin" ? (
                      <CreateRole />
                    ) : (
                      <Dashboard />
                    )
                  }
                />
                <Route
                  path="/branch"
                  element={
                    user && user.profile == "admin" ? <Branch /> : <Dashboard />
                  }
                />
                <Route
                  path="/createbranch"
                  element={
                    user && user.profile == "admin" ? (
                      <CreateBranch />
                    ) : (
                      <Dashboard />
                    )
                  }
                />
                <Route
                  path="/leadsource"
                  element={
                    user && user.profile == "admin" ? (
                      <LeadSource />
                    ) : (
                      <Dashboard />
                    )
                  }
                />
                <Route
                  path="/createleadsource"
                  element={
                    user && user.profile == "admin" ? (
                      <CreateLeadSource />
                    ) : (
                      <Dashboard />
                    )
                  }
                />
                <Route
                  path="/departments"
                  element={
                    user && user.profile == "admin" ? (
                      <Department />
                    ) : (
                      <Dashboard />
                    )
                  }
                />{" "}
                <Route
                  path="/createdepartment"
                  element={
                    user && user.profile == "admin" ? (
                      <CreateDepartment />
                    ) : (
                      <Dashboard />
                    )
                  }
                />
                <Route
                  path="/courses"
                  element={
                    user && user.profile == "admin" ? <Course /> : <Dashboard />
                  }
                />{" "}
                <Route
                  path="/createcourse"
                  element={
                    user && user.profile == "admin" ? (
                      <CreateCourse />
                    ) : (
                      <Dashboard />
                    )
                  }
                />
                <Route
                  path="/coursepackage"
                  element={
                    user && user.profile == "admin" ? (
                      <CoursePackage />
                    ) : (
                      <Dashboard />
                    )
                  }
                />{" "}
                <Route
                  path="/createcoursepackage"
                  element={
                    user && user.profile == "admin" ? (
                      <CreateCoursePackage />
                    ) : (
                      <Dashboard />
                    )
                  }
                />
                {/* <Route path="/inn" element={<Login />}></Route> */}
                {/* <Route
                path="/feedetails"
                element={role=='admin'? <Feedetails/> :<Dashboard/>}/> */}
                {/* <Route path="/formm" element={<Formm />}></Route> */}
                <Route
                  path="/assignassets"
                  element={
                    user && user.profile == "admin" ? (
                      <Assignassets />
                    ) : (
                      <Dashboard />
                    )
                  }
                />
                <Route
                  path="/addassets/view/:id"
                  element={
                    user && user.profile == "admin" ? (
                      <Addassetsview />
                    ) : (
                      <Dashboard />
                    )
                  }
                />
                <Route
                  path="/addassets/edit/:id"
                  element={
                    user && user.profile == "admin" ? (
                      <Addassetsedit />
                    ) : (
                      <Dashboard />
                    )
                  }
                />
                <Route
                  exact
                  path="/register"
                  element={
                    user && user.profile == "admin" ? (
                      <Register />
                    ) : (
                      <Dashboard />
                    )
                  }
                />{" "}
                <Route
                  exact
                  path="/assignassets/edit/:id"
                  element={
                    user && user.profile == "admin" ? (
                      <AssigneAssetsEdit />
                    ) : (
                      <Dashboard />
                    )
                  }
                />
                <Route
                  exact
                  path="/assignassets/view/:id"
                  element={
                    user && user.profile == "admin" ? (
                      <Details />
                    ) : (
                      <Dashboard />
                    )
                  }
                />
                <Route
                  path="/addassets"
                  element={
                    user && user.profile == "admin" ? (
                      <Addassets />
                    ) : (
                      <Addassets />
                    )
                  }
                ></Route>
                <Route
                  path="/addassetsform"
                  element={
                    user && user.profile == "admin" ? (
                      <Addassetsform />
                    ) : (
                      <Dashboard />
                    )
                  }
                ></Route>
                <Route
                  path="/inventory"
                  element={
                    user && user.profile == "admin" ? (
                      <Inventoryhome />
                    ) : (
                      <Dashboard />
                    )
                  }
                ></Route>
                <Route
                  path="/assignassets/returnassets/:id"
                  element={
                    user && user.profile == "admin" ? (
                      <ReturnAssetsForm />
                    ) : (
                      <Dashboard />
                    )
                  }
                ></Route>
                {/* inventory settings */}
                <Route
                  path="/assettype"
                  element={
                    user && user.profile == "admin" ? (
                      <AssetType />
                    ) : (
                      <Dashboard />
                    )
                  }
                ></Route>
                <Route
                  path="/vendor"
                  element={
                    user && user.profile == "admin" ? <Vendor /> : <Dashboard />
                  }
                ></Route>
                {/* Reports */}
                <Route
                  path="/reports"
                  element={
                    user && user.profile == "admin" ? (
                      <Reports />
                    ) : (
                      <Dashboard />
                    )
                  }
                ></Route>
                <Route
                  path="/report/:id"
                  element={
                    user && user.profile == "admin" ? <Report /> : <Dashboard />
                  }
                ></Route>
                <Route
                  path="/report/create"
                  element={
                    user && user.profile == "admin" ? (
                      <CreateReport />
                    ) : (
                      <Dashboard />
                    )
                  }
                ></Route>
                {/* Leads sstart */}
                <Route
                  path="/webinar"
                  element={
                    user && user.profile == "admin" ? (
                      <Webinar />
                    ) : (
                      <Dashboard />
                    )
                  }
                />
                 <Route
                  path="/whatsapp"
                  element={
                    user && user.profile == "admin" ? (
                      <WhatsApp />
                    ) : (
                      <Dashboard />
                    )
                  }
                />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
