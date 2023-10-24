import { useState, useEffect } from "react";
import "./Sidebar.css";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SettingsIcon from "@mui/icons-material/Settings";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import zaheer from "../../../images/zaheer.jpg";
import EditNoteIcon from "@mui/icons-material/EditNote";
import CloseIcon from "@mui/icons-material/Close";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import InfoIcon from "@mui/icons-material/Info";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import favicon from "../../../images/favicon.jpeg";
import axios from "axios";
import { useAuthContext } from "../../../hooks/useAuthContext";
// let role = localStorage.getItem(role);

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const { user } = useAuthContext();
  let fullname;
  let profile;
  if (user) {
    fullname = user.fullname;
    profile = user.profile;
    console.log("fulname", fullname, profile);
  }
  // let role;
  // let user;
  // let username;
  // if (localStorage.getItem("user")) {
  //   user = localStorage.getItem("user");
  //   user = JSON.parse(user);
  //   role = user.profile;
  //   username = user.fullname;
  // }
  // let user = localStorage.getItem("user"); //admin-all Counseller-!user and !roles manager-!user and !roles regionalmanager- !user and !roles
  let token = localStorage.getItem("token");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  // let logggeduser = JSON.parse(user);
  // console.log("usser", logggeduser);
  // let username = JSON.parse(user.fullname);
  // let role = localStorage.getItem("role");
  // let role = JSON.parse(user.profile);
  // let role = localStorage.getItem(role);
  // let username = "zHERER";
  // let role = "admin";
  let screenSize = window.innerWidth;
  console.log(screenSize);

  useEffect(() => {
    if (screenSize < 720) {
      setIsCollapsed(true);
    }
    if (screenSize > 721) {
      setIsCollapsed(false);
    }
  }, []);

  return (
    <div>
      <Box
        sx={{
          "& .pro-sidebar-inner": {
            background: `white; !important`,
          },
          "& .pro-icon-wrapper": {
            backgroundColor: "transparent !important",
          },
          "& .pro-inner-item": {
            padding: "5px 14px 5px 20px !important",
          },
          "& .pro-inner-item:hover": {
            color: "#335eea !important",
          },
          "& .pro-menu-item.active": {
            color: "#335eea !important",
          },
          letterSpacing: "0.6px",
        }}
      >
        <ProSidebar collapsed={isCollapsed} style={{height:"100vh"}}>
          <Menu iconShape="square">
            {/* LOGO AND MENU ICON */}
            <MenuItem
              onClick={() => setIsCollapsed(!isCollapsed)}
              icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
              style={{
                margin: "10px 8px 10px 5px",
                color: colors.grey[100],
              }}
            >
              {!isCollapsed && (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml="15px"
                  pr="2px"
                >
                  <Typography
                    variant="h3"
                    color="#335eea;"
                    className="tekslogo"
                    fontWeight="900"
                  >
                    Teks Academy
                    {/* <img className="w-25 rounded-5" src={favicon}/>  Teks Academy */}
                  </Typography>
                  <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              )}
            </MenuItem>

            {!isCollapsed && (
              <Box mb="25px">
                <Box display="flex" justifyContent="center" alignItems="center">
                  {/* <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={zaheer}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                /> */}
                </Box>
                <Box textAlign="center">
                  <Typography
                    variant="h3"
                    color={colors.grey[100]}
                    fontWeight="400"
                    sx={{ m: "20px 0 0 0" }}
                    letterSpacing="1px"
                  >
                    {/* Zaheer */}
                    {fullname}
                  </Typography>
                  <Typography variant="h5" color={colors.grey[100]}>
                    {profile}
                  </Typography>
                </Box>
              </Box>
            )}

            <Box paddingLeft={isCollapsed ? undefined : "1%"}>
              <Item
             
                title="Dashboard"
                to="/"
                icon={<HomeOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
                style={{ color: "black" }}
              />
              {profile == "admin" ? (
                <SubMenu
                  style={{
                    color: colors.grey[100],
                  }}
                  icon={<PeopleOutlinedIcon />}
                  label={"User Details"}
                  title={"User Management"}
                >
                  <Item
                    title="Create User"
                    to="/createuser"
                    icon={<PersonAddIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="User Details"
                    to="/usersdata"
                    icon={<PeopleOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                </SubMenu>
              ) : undefined}

              <SubMenu
                style={{
                  color: colors.grey[100],
                }}
                icon={<PeopleOutlinedIcon />}
                label={"Student Management"}
                title={"Student Managem..."}
              >
                <Item
                  title="Student Details"
                  to="/studentdata"
                  icon={<InfoIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Registration Form"
                  to="/registrationform"
                  icon={<Diversity3Icon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  title="Fee Details"
                  to="/feedetails"
                  icon={<AttachMoneyIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Certificate"
                  to="/certificate"
                  icon={<CardMembershipIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </SubMenu>
              {profile == "admin" ? (
                <SubMenu
                  style={{
                    // color: colors.grey[100],
                    color: "black",
                  }}
                  icon={<SettingsIcon />}
                  label={"Roles Management"}
                  title={"Settings"}
                >
                  <Item
                    title="Roles"
                    to="/roles"
                    icon={<EditNoteIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Branch"
                    to="/branch"
                    icon={<EditNoteIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Departments"
                    to="/departments"
                    icon={<EditNoteIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Lead Source"
                    to="/leadsource"
                    icon={<EditNoteIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Courses"
                    to="/courses"
                    icon={<EditNoteIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Course Package"
                    to="/coursepackage"
                    icon={<EditNoteIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                </SubMenu>
              ) : undefined}
            </Box>
          </Menu>
        </ProSidebar>
      </Box>
    </div>
  );
};

export default Sidebar;
