import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Login from "./components/pages/logins/adminlogins/Login";

import "./App.css";

// import Signup from "./components/logins/adminlogins/Signup";
// import Register from "./components/inventory/Register";
// import Edit from "./components/inventory/Edit";
// import Details from "./components/inventory/Details";

// import Assignassets from "./components/inventory/Assignassets";
// import Addassets from "./components/inventory/Addassets";
// import Addassetsform from "./components/inventory/Addassetsform";
// import Inventoryhome from "./components/inventory/Inventoryhome";
// import ReturnAssetsForm from "./components/inventory/ReturnAssetsForm";
import Dashboard from "./components/pages/dashboard/Dashboard";
import Sidebar from "./components/common/Sidebar/Sidebar";
import Topbar from "./components/common/Topbar/Topbar";

import RegistrationForm from "./components/pages/student/studentRegistrationForm/RegistrationForm";
import StudentData from "./components/pages/student/studentData/StudentData";
// import CreateUserForm from "./components/pages/user/createUserForm/CreateUserForm";
import CreateUserForm from "./components/pages/user/createUserForm/CreateUserFormDup";

import UsersData from "./components/pages/user/userData/UsersData";
import LoginPage from "./components/pages/loginpage/LoginPage";
import { Box } from "@mui/material";
import CreateRole from "./components/pages/roles/CreateRole";
import Roles from "./components/pages/roles/Roles";
import UserView from "./components/pages/user/userData/UserView";

// import UserViewCopy from "./components/pages/user/userData/UserViewCopy";
import Edit from "./components/pages/user/userData/EditUser";
import RoleAccess from "./components/pages/roles/RoleAccess";
import StudentDataView from "./components/pages/student/studentData/StudentDataView";

import StudentApplicationPrint from "./components/pages/student/studentData/StudentApplicationPrint";
import FeeDetails from "./components/pages/student/fee/FeeDetails";
import Feefollowup from "./components/pages/student/fee/Feefollowup";
import FeeView from "./components/pages/student/fee/FeeView";
import Addtofee from "./components/pages/student/fee/Addtofee";
import EditStudentForm from "./components/pages/student/studentData/EditStudentForm";
import { useAuthContext } from "./hooks/useAuthContext";
import { useEffect } from "react";
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
            {/* {user ? <Sidebar /> : undefined} */}
            <Sidebar />

            <div
              style={{ marginBottom: "50px", backgroundColor: "white" }}
            ></div>
            <main className="content" style={{ overflow: "auto" }}>
              {/* {user ? <Topbar /> : undefined} */}
              <Topbar />
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
                <Route
                  path="/feedetails/:id"
                  element={
                    user && user.profile == "admin" ? (
                      <FeeDetails />
                    ) : (
                      <Dashboard />
                    )
                  }
                />
                <Route
                  path="/feedetails"
                  element={
                    user && user.profile == "admin" ? (
                      <FeeDetails />
                    ) : (
                      <Dashboard />
                    )
                  }
                />

                <Route
                  path="/feefollowup"
                  element={
                    user && user.profile == "admin" ? (
                      <Feefollowup />
                    ) : (
                      <Dashboard />
                    )
                  }
                />

                <Route
                  path="/feeview/:id"
                  element={
                    user && user.profile == "admin" ? (
                      <FeeView />
                    ) : (
                      <Dashboard />
                    )
                  }
                />

                <Route
                  path="/addtofee/:id"
                  element={
                    user && user.profile == "admin" ? (
                      <Addtofee />
                    ) : (
                      <Dashboard />
                    )
                  }
                />

                <Route path="/studentdata" element={<StudentData />} />
                <Route
                  path="/studentdataview/:id"
                  element={
                    user && user.profile == "admin" ? (
                      <StudentDataView />
                    ) : (
                      <Dashboard />
                    )
                  }
                />
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
                  path="/roles"
                  element={
                    user && user.profile == "admin" ? <Roles /> : <Dashboard />
                  }
                />
                <Route
                  path="/studentApplicationprint/:id"
                  element={user ? <StudentApplicationPrint /> : <Dashboard />}
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
                {/* <Route path="/inn" element={<Login />}></Route> */}

                {/* <Route
                path="/feedetails"
                element={role=='admin'? <Feedetails/> :<Dashboard/>}/> */}
                {/* <Route path="/formm" element={<Formm />}></Route> */}
                {/*<Route path="/assignassets" element={<Assignassets />} />
              <Route exact path="/register" element={<Register />} />{" "}
              <Route exact path="/assignassets/edit/:id" element={<Edit />} />{" "}
              <Route
                exact
                path="/assignassets/view/:id"
                element={<Details />}
              />
              <Route path="/addassets" element={<Addassets />}></Route>
              <Route path="/addassetsform" element={<Addassetsform />}></Route>
              <Route path="/inventory" element={<Inventoryhome />}></Route>
              <Route
                path="/assignassets/returnassets/:id"
                element={<ReturnAssetsForm />}
              ></Route> */}
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
