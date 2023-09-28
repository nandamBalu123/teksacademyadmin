import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

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
import CreateUserForm from "./components/pages/user/createUserForm/CreateUserForm";
import UsersData from "./components/pages/user/userData/UsersData";
import LoginPage from "./components/pages/loginpage/LoginPage";
import { Box } from "@mui/material";
import CreateRole from "./components/pages/roles/CreateRole";
import Roles from "./components/pages/roles/Roles";
import UserView from "./components/pages/user/userData/UserView";
import Edit from "./components/pages/user/userData/EditUser";





function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const toggle = true;
  // let role = localStorage.getItem(role); //admin-all Counseller-!user and !roles manager-!user and !roles regionalmanager- !user and !roles
  // let role = localStorage.getItem(role);
  let role = localStorage.getItem("role");
  let token = localStorage.getItem("token");
  console.log('hello: ', localStorage.getItem("token"))
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {!token ? (
            <Routes>
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          ) : <Navigate to = "/" />}
          {token ? <Sidebar isSidebar={isSidebar} /> : undefined}
          {token ? (
            <main className="content" style={{ overflow: "auto" }}>
              <Topbar setIsSidebar={setIsSidebar} />
              <div style={{ marginBottom: "50px" }}></div>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route
                  path="/registrationform"
                  element={<RegistrationForm />}
                />
                <Route path="/studentdata" element={<StudentData />} />
                <Route
                  path="/createuser"
                  element={role == "admin" ? <CreateUserForm /> : <Dashboard />}
                />
                <Route
                  path="/usersdata"
                  element={role == "admin" ? <UsersData /> : <Dashboard />}
                />
                <Route
                  path="/userview"
                  element={role == "admin" ? <UserView /> : <Dashboard />}
                />
                <Route
                  path="/roles"
                  element={role == "admin" ? <Roles /> : <Dashboard />}
                />
                <Route
                  path="/createrole"
                  element={role == "admin" ? <CreateRole /> : <Dashboard />}
                />
                <Route
                  path="/edit"
                  element={role == "admin" ? <Edit /> : <Dashboard />}
                />
                <Route path="/inn" element={<Login />}></Route>

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
          ) : (
            <LoginPage />
          )}
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
