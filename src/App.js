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
import { useRoleContext } from "./hooks/useRoleContext";
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
import Reports from "./components/pages/Reports/Reports";
import Report from "./components/pages/Reports/Report";
import CreateReport from "./components/pages/Reports/CreateReport";
import FeeReceived from "./components/pages/student/fee/FeeReceived";
import Webinar from "./components/pages/Leads/Website Leads/Webinar";
import WhatsApp from "./components/pages/Leads/Website Leads/Whatsapp";
import DownloadSyllabus from "./components/pages/Leads/Website Leads/DownloadSyllabus";
import ViewCourse from "./components/pages/Leads/Website Leads/ViewCourse";
import ContactUs from "./components/pages/Leads/Website Leads/ContactUs";
import HlpEnquireLeads from "./components/pages/Leads/Website Leads/HlpEnquireLeads";
import SlpEnquireLeads from "./components/pages/Leads/Website Leads/SlpEnquireLeads";
import Permissions from "./components/pages/settings/roles/Permissions";
import Settings from "./components/pages/Setting/Settings";
import Forms from "./components/pages/settings/Form/Forms";
import AdmissionFee from "./components/pages/settings/Admission Fee/AdmissionFee";
import CreateAdmissionFee from "./components/pages/settings/Admission Fee/CreateAdmissionFee";
import Organizationprofile from "./components/pages/settings/Organizationprofile/Organizationprofile";
// import Formm from "./components/pages/user/createUserForm/Form";
function App() {
  const { user } = useAuthContext();

  let fullname;
  let profile;
  if (user) {
    fullname = user.fullname;
    profile = user.profile;
  }
  // start roles
  const { roles } = useRoleContext();

  const [filteredroles, setfilteredroles] = useState();

  useEffect(() => {


    if (roles) {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].role === profile) {
          console.log("roles", roles[i].role);
          setfilteredroles(roles[i]);
        }
      }
    }
  }, [roles]);
  { filteredroles && console.log("test1", filteredroles) }
  // useEffect(() => {
  //   if (filteredroles) {
  //     console.log("filteredroles", filteredroles.id);
  //   }
  // }, [filteredroles]);
  if (filteredroles) {
    console.log("filteredroles", filteredroles);
  }

  // end roles

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



                {/* user route start*/}
                <Route
                  path="/createuser"
                  element={
                    filteredroles && profile == filteredroles.role && filteredroles.permissions[0].submenus[0].create == true ? (
                      <CreateUserForm />
                    ) : (
                      <Dashboard />
                    )
                  }
                />
                <Route
                  path="/usersdata"
                  element={
                    filteredroles && profile == filteredroles.role && filteredroles.permissions[0].submenus[1].create == true ? (
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
                  path="/edituser/:id"
                  element={
                    user && user.profile == "admin" ? <Edit /> : <Dashboard />
                  }
                />
                {/* user route end*/}

                {/* student route start */}
                <Route
                  path="/registrationform"
                  element={
                    filteredroles && profile == filteredroles.role && filteredroles.permissions[1].submenus[0].create == true ? (
                      <RegistrationForm />
                    ) : (
                      <Dashboard />
                    )

                  }
                />
                <Route path="/studentdata" element={
                  filteredroles && profile == filteredroles.role && filteredroles.permissions[1].submenus[1].read == true ? (
                    <StudentData />
                  ) : (
                    <Dashboard />
                  )
                } />
                <Route
                  path="/feedetails"
                  element={
                    filteredroles && profile == filteredroles.role && filteredroles.permissions[1].submenus[2].read == true ? (
                      <FeeDetails />
                    ) : (
                      <Dashboard />
                    )
                  }
                />
                <Route
                  path="/certificate"
                  element={
                    filteredroles && profile == filteredroles.role && filteredroles.permissions[1].submenus[3].create == true ? (
                      <Certificate />
                    ) : (
                      <Dashboard />
                    )
                  }
                />
                <Route
                  path="/requestedcertificates"
                  element={
                    filteredroles && profile == filteredroles.role && filteredroles.permissions[1].submenus[4].read == true ? (
                      <Requestedcertificates />
                    ) : (
                      <Dashboard />
                    )
                  }
                />

                {/* inside */}
                <Route
                  path="/feedetails/:id"
                  element={
                    filteredroles && profile == filteredroles.role && filteredroles.permissions[0].submenus[0].create == true ? (
                      <FeeDetails />
                    ) : (
                      <Dashboard />
                    )
                  }
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

                <Route
                  path="/studentdataview/:id"
                  element={user ? <StudentDataView /> : <Dashboard />}
                />


                <Route
                  path="/studentApplicationprint/:id"
                  element={user ? <StudentApplicationPrint /> : <Dashboard />}
                />
                <Route
                  path="/editstudent/:id"
                  element={user ? <EditStudentForm /> : <Dashboard />}
                />
                {/* student route end */}

                {/* inventory start*/}
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
                  path="/addassets"
                  element={
                    filteredroles && profile == filteredroles.role && filteredroles.permissions[2].submenus[0].create == true ? (
                      <Addassets />
                    ) : (
                      <Addassets />
                    )
                  }
                ></Route>
                <Route
                  path="/assignassets"
                  element={
                    filteredroles && profile == filteredroles.role && filteredroles.permissions[2].submenus[1].create == true ? (
                      <Assignassets />
                    ) : (
                      <Dashboard />
                    )
                  }
                />
                <Route
                  path="/assettype"
                  element={
                    user ? (
                      <AssetType />
                    ) : (
                      <Dashboard />
                    )
                  }
                ></Route>
                <Route
                  path="/vendor"
                  element={
                    user ? <Vendor /> : <Dashboard />
                  }
                ></Route>


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
                />
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
                  path="/addassetsform"
                  element={
                    user && user.profile == "admin" ? (
                      <Addassetsform />
                    ) : (
                      <Dashboard />
                    )
                  }
                ></Route>
                {/* inventory end */}

                {/* leads start */}

                <Route
                  path="/webinar"
                  element={
                    user ? (
                      <Webinar />
                    ) : (
                      <Dashboard />
                    )
                  }
                />
                <Route
                  path="/whatsapp"
                  element={
                    user ? (
                      <WhatsApp />
                    ) : (
                      <Dashboard />
                    )
                  }
                />
                <Route
                  path="/downloadsyllabus"
                  element={
                    user ? (
                      <DownloadSyllabus />
                    ) : (
                      <Dashboard />
                    )
                  }
                />
                <Route
                  path="/viewcourse"
                  element={
                    user ? (
                      <ViewCourse />
                    ) : (
                      <Dashboard />
                    )
                  }
                />
                <Route
                  path="/contactus"
                  element={
                    user ? (
                      <ContactUs />
                    ) : (
                      <Dashboard />
                    )
                  }
                />
                <Route
                  path="/hlpenquireleads"
                  element={
                    user ? (
                      <HlpEnquireLeads />
                    ) : (
                      <Dashboard />
                    )
                  }
                />
                <Route
                  path="/slpenquireleads"
                  element={
                    user ? (
                      <SlpEnquireLeads />
                    ) : (
                      <Dashboard />
                    )
                  }
                />
                {/* leads end */}
                {/* Reports start*/}
                <Route
                  path="/reports"
                  element={
                    filteredroles && profile == filteredroles.role && filteredroles.permissions[4].submenus[0].create == true ? (
                      <Reports />
                    ) : (
                      <Dashboard />
                    )
                  }
                ></Route>
                <Route
                  path="/report/:id"
                  element={
                    filteredroles && profile == filteredroles.role && filteredroles.permissions[4].submenus[0].create == true ? (
                      <Report />
                    ) : (<Dashboard />)
                  }
                ></Route>
                <Route
                  path="/report/create"
                  element={
                    filteredroles && profile == filteredroles.role && filteredroles.permissions[4].submenus[0].create == true ? (
                      <CreateReport />
                    ) : (
                      <Dashboard />
                    )
                  }
                ></Route>
                {/* reports end */}


                {/* settings start */}
                <Route
                  path="/roles"
                  element={
                    user && user.profile == "admin" ? <Roles /> : <Dashboard />
                  }
                />
                <Route
                  path="/roleaccess/:id"
                  element={
                    user ? (
                      <RoleAccess />
                    ) : (
                      <Dashboard />
                    )
                  }
                />
                <Route
                  path="/permissions"
                  element={
                    user ? (
                      <Permissions />
                    ) : (
                      <Dashboard />
                    )
                  }
                />
                <Route
                  path="/createrole"
                  element={
                    user ? (
                      <CreateRole />
                    ) : (
                      <Dashboard />
                    )
                  }
                />
                <Route
                  path="/branch"
                  element={
                    user ? <Branch /> : <Dashboard />
                  }
                />
                <Route
                  path="/createbranch"
                  element={
                    user ? (
                      <CreateBranch />
                    ) : (
                      <Dashboard />
                    )
                  }
                />
                <Route
                  path="/leadsource"
                  element={
                    user ? (
                      <LeadSource />
                    ) : (
                      <Dashboard />
                    )
                  }
                />
                <Route
                  path="/createleadsource"
                  element={
                    user ? (
                      <CreateLeadSource />
                    ) : (
                      <Dashboard />
                    )
                  }
                />
                <Route
                  path="/departments"
                  element={
                    user ? (
                      <Department />
                    ) : (
                      <Dashboard />
                    )
                  }
                />{" "}
                <Route
                  path="/createdepartment"
                  element={
                    user ? (
                      <CreateDepartment />
                    ) : (
                      <Dashboard />
                    )
                  }
                />

                <Route
                  path="/courses"
                  element={
                    user ? <Course /> : <Dashboard />
                  }
                />{" "}
                <Route
                  path="/createcourse"
                  element={
                    user ? (
                      <CreateCourse />
                    ) : (
                      <Dashboard />
                    )
                  }
                />
                <Route
                  path="/coursepackage"
                  element={
                    user ? (
                      <CoursePackage />
                    ) : (
                      <Dashboard />
                    )
                  }
                />{" "}
                <Route
                  path="/createcoursepackage"
                  element={
                    user ? (
                      <CreateCoursePackage />
                    ) : (
                      <Dashboard />
                    )
                  }
                />
                <Route
                  path="/admissionfee"
                  element={
                    user ? (
                      <AdmissionFee />
                    ) : (
                      <Dashboard />
                    )
                  }
                />
                <Route
                  path="/createadmissionfee"
                  element={
                    user ? (
                      <CreateAdmissionFee />

                    ) : (
                      <Dashboard />
                    )
                  }
                />
                <Route
                  path="/organizationprofile"
                  element={
                    user ? (
                      <Organizationprofile />

                    ) : (
                      <Dashboard />
                    )
                  }
                />


                {/* settings end */}

                <Route
                  path="/setting"
                  element={
                    user && user.profile == "admin" ? <Settings /> : <Dashboard />
                  } />
              </Routes>

            </main>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
