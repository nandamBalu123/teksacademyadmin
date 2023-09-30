import { useState, useEffect } from "react";
import "./Sidebar.css";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import zaheer from "../../../images/zaheer.jpg";
import EditNoteIcon from "@mui/icons-material/EditNote";
import CloseIcon from "@mui/icons-material/Close";
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
let username = "zaheer";
// let role = localStorage.getItem("role");
let role = "admin";

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  // let role = localStorage.getItem(role);
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
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `rgb(232, 232, 241); !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 14px 5px 0px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
        letterSpacing: "0.6px",
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
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
                  sx={{ m: "10px 0 0 0" }}
                  letterSpacing="1px"
                >
                  {/* Zaheer */}
                  {username}
                </Typography>
                <Typography variant="h5" color={colors.grey[100]}>
                  {role}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {role == "admin" ? (
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
                  icon={<PeopleOutlinedIcon />}
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
                <SubMenu
                  style={{
                    color: colors.grey[100],
                  }}
                  icon={<PeopleOutlinedIcon />}
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
                </SubMenu>
              </SubMenu>
            ) : undefined}

            <SubMenu
              style={{
                color: colors.grey[100],
              }}
              icon={<PeopleOutlinedIcon />}
              label={"Student Management"}
              title={"Student Management"}
            >
              <Item
                title="Student Details"
                to="/studentdata"
                icon={<EditNoteIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Registration Form"
                to="/registrationform"
                icon={<EditNoteIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Item
                title="Fee Details"
                to="/feedetails"
                icon={<EditNoteIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Certificate"
                to="/certificate"
                icon={<EditNoteIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
