import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";

// import Dashboard from "./components/dashboard/Dashboard";
import "./App.css";
import Login from "./components/logins/adminlogins/Login";
// import { BrowserRouter } from "react-router-dom";
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Signup from "./components/logins/adminlogins/Signup";
import Register from "./components/inventory/Register";
import Edit from "./components/inventory/Edit";
import Details from "./components/inventory/Details";

import Assignassets from "./components/inventory/Assignassets";
import Addassets from "./components/inventory/Addassets";
import Addassetsform from "./components/inventory/Addassetsform";
import Inventoryhome from "./components/inventory/Inventoryhome";
import ReturnAssetsForm from "./components/inventory/ReturnAssetsForm";
import RegistrationForm from "./scenes/registrationform";
import CreateUserForm from "./scenes/user/createUserForm/CreateUserForm";
import StudentDetails from "./scenes/studentDetails";
import UserData from "./scenes/user/userData";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/registrationform" element={<RegistrationForm />} />
              <Route path="/createuser" element={<CreateUserForm />} />
              <Route path="/userdata" element={<UserData />} />
              <Route path="/studentdetails" element={<StudentDetails />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/login" element={<Login />}></Route>
              <Route path="/assignassets" element={<Assignassets />} />
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
              ></Route>
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

// import { useState } from "react";

// import Navbaar from "./components/Navbar/Navbaar";
// import SideBar from "./components/Sidebar/SideBar";
// import Dashboard from "./components/dashboard/Dashboard";
// import "./App.css";
// import Login from "./components/logins/adminlogins/Login";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// // import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Signup from "./components/logins/adminlogins/Signup";
// import Register from "./components/inventory/Register";
// import Edit from "./components/inventory/Edit";
// import Details from "./components/inventory/Details";

// import Assignassets from "./components/inventory/Assignassets";
// import Addassets from "./components/inventory/Addassets";
// import Addassetsform from "./components/inventory/Addassetsform";
// import Inventoryhome from "./components/inventory/Inventoryhome";
// import ReturnAssetsForm from "./components/inventory/ReturnAssetsForm";
// import RegistrationForm from "./components/RegistrationForm/RegistrationForm";

// function App() {
//   return (
//     <div className="app">
//       <Navbaar />
//       <div style={{ display: "flex" }}>
//         <div>
//           <SideBar />
//         </div>
//         <div style={{ width: "100%", padding: "0 2em 0 2em" }}>
//           <Routes>
//             <Route path="/" element={<Dashboard />}></Route>
//             <Route path="/registrationform" element={<RegistrationForm />} />
//             {/* <Route path="/login" element={<Login />}></Route>
//           <Route path="/signup" element={<Signup />}></Route>

//           <Route path="/assignassets" element={<Assignassets />} />

//           <Route exact path="/register" element={<Register />} />
//           <Route exact path="/assignassets/edit/:id" element={<Edit />} />
//           <Route exact path="/assignassets/view/:id" element={<Details />} />

//           <Route path='/addassets' element={<Addassets />}></Route>
//           <Route path='/addassetsform' element={<Addassetsform />}></Route>
//           <Route path='/inventory' element={<Inventoryhome />}></Route>
//           <Route path='/assignassets/returnassets/:id' element={<ReturnAssetsForm />}></Route> */}
//           </Routes>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;
