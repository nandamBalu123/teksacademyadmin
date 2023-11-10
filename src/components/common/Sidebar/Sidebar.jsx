import { useState, useEffect } from "react";
import "./Sidebar.css";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../../theme";
import GroupsIcon from "@mui/icons-material/Groups";
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupIcon from '@mui/icons-material/Group';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import FeedIcon from '@mui/icons-material/Feed';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PlaceIcon from '@mui/icons-material/Place';
import SafetyDividerIcon from '@mui/icons-material/SafetyDivider';
import SourceIcon from '@mui/icons-material/Source';
import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import zaheer from "../../../images/zaheer.jpg";
import EditNoteIcon from "@mui/icons-material/EditNote";
import CloseIcon from "@mui/icons-material/Close";
import StorageIcon from "@mui/icons-material/Storage"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Diversity3Icon from "@mui/icons-material/Diversity3";


import profilelogo from '../../../images/Teks-Logo-with-Trade.png';
import MenuIcon from '@mui/icons-material/Menu';
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
        // background: selected === title ? "blue !important": "black !important",
        // color: "black",
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};
// const [useritemsbgcolor , setUseritembgcolor] = useState(false);
// handleitembgcolor =()=>{ 
//   setUseritembgcolor
// }

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
  console.log("selected",selected)
  // const [active,setActive]=useState( { 
  //   createuser : false,
  //   userdata:false,
  //   studentdata:false,
  //   registration:false,
  //   feedetails:false,
  //   certificate:false,
  //   requestcertificate:false,
  //   roles :false,
  //   branch:false,
  //   leadsource:false,
  // }
    
  // );
  // handleactive = ()=>{ 
  //   setActive (e =>!e);
  // }
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
            fontSize:"14px !important",
            fontWeight:"400 !important",
            
          },
          "& .pro-inner-item:hover": {
            background:"#f5f5f5 !important",
            color:"blue !important",
            borderTopRightRadius:"20px !important",
            borderBottomRightRadius:"20px !important"
            // borderRadius:"20px !important",
           
          },
     
          "& .pro-menu-item.active": {
            color: "blue !important",
          },
        
          letterSpacing: "0.6px",
        }}
      >
        <ProSidebar collapsed={isCollapsed} style={{ height: "100vh" }}>
          <Menu iconShape="square">
            {/* LOGO AND MENU ICON */}
            <MenuItem
              onClick={() => setIsCollapsed(!isCollapsed)}
              icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
              style={{
                margin: "10px 8px 10px 5px",
              
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
                  
                    <img className="profilelogo" src={profilelogo}/>  
                  </Typography>
                  <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                    <MenuIcon />
                  </IconButton>
                </Box>
              )}
            </MenuItem>

            {/* {!isCollapsed && (
              <Box mb="25px">
                <Box display="flex" justifyContent="center" alignItems="center">
                  <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={zaheer}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
                </Box>
                <Box textAlign="center">
                  <Typography
                    variant="h3"
                    color={colors.grey[100]}
                    fontWeight="400"
                    sx={{ m: "20px 0 0 0" }}
                    letterSpacing="1px"
                  >
                    Zaheer
                    {fullname}
                  </Typography>
                  <Typography variant="h5" color={colors.grey[100]}>
                    {profile}
                  </Typography>
                </Box>
              </Box>
            )} */}

            <Box paddingLeft={isCollapsed ? undefined : "1%"}>
              <Item
                style={{
                  color: colors.grey[100],
                }}
                icon={<SpaceDashboardIcon />}
                label={"Dashboard"}
                
                
                title="Dashboard"
             
                    to="/"
                    
                    selected={selected}
                    setSelected={setSelected}
              >
                
              </Item><hr/>
              {/* <Item
                title="Dashboard"
                to="/"
                icon={<HomeOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
                style={{ color: "black" }}
              /> */}
              {profile == "admin" ? (
                <SubMenu
                style={{
                  color: colors.grey[100],
                }}
                
                  icon={<GroupsIcon/>}
                  label={"User Details"}
                  title={"User Management"}
                >
                  <Item
                  
                    title="Create User"
                    to="/createuser"
                    icon={<PersonAddIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    // onClick= {()=> setActive({handleactive})}
                  />
                  <Item
                    title="User Details"
                    to="/usersdata"
                    icon={<GroupIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                </SubMenu>
              ) : undefined}<hr/>

              <SubMenu
                style={{
                  color: colors.grey[100],
                }}
                icon={<Diversity3Icon />}
                label={"Student Management"}
                title={"Student Managem..."}
              >
                <Item
                  title="Student Details"
                  to="/studentdata"
                  icon={<PeopleOutlineIcon/>}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Registration Form"
                  to="/registrationform"
                  icon={<FeedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                
                <Item
                
                  title="Fee Details"
                  to="/feedetails"
                  icon={<CurrencyRupeeIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              
                <Item
                  title="Certificate"
                  to="/certificate"
                  icon={<WorkspacePremiumIcon/>}
                  selected={selected}
                  setSelected={setSelected}
                />
                {profile == "admin" &&
                <Item
                  title="Requested Certificates"
                  to="/requestedcertificates"
                  icon={<ImportContactsIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                }
              </SubMenu><hr/>
              {/* start */}
              {profile == "admin" ? (
                <SubMenu
                  style={{
                    // color: colors.grey[100],
                    color: "black",
                  }}
                  icon={<StorageIcon />}
                  label={"Inventory"}
                  title={"Inventory"}
                >
                  <Item
                    title="Inventory"
                    to="/inventory"
                    icon={<StorageIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                </SubMenu>
              ) : undefined}<hr />
            {/* end */}
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
                    icon={<ManageAccountsIcon/>}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Branch"
                    to="/branch"
                    icon={<PlaceIcon/>}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Departments"
                    to="/departments"
                    icon={<SafetyDividerIcon/>}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Lead Source"
                    to="/leadsource"
                    icon={<SourceIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Courses"
                    to="/courses"
                    icon={<LaptopChromebookIcon/>}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Course Package"
                    to="/coursepackage"
                    icon={<CollectionsBookmarkIcon/>}
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
