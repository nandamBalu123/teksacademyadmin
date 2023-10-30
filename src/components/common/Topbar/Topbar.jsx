import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ColorModeContext, tokens } from "../../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import profilepic from "../../../images/profilepic.jpg";
import "./Topbar.css";
import zIndex from "@mui/material/styles/zIndex";
import { useAuthContext } from "../../../hooks/useAuthContext";

const Topbar = () => {
  const { user } = useAuthContext();
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("token");

    // dispatch logout action
    dispatch({ type: "LOGOUT" });
    navigate("/login");
    // axios
    //   .get("http://localhost:3030/logout")
    //   .then((res) => {
    //     navigate("/login");
    //   })
    //   .catch((err) => cFuseronsole.log(err));
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleProfile = () => {
    navigate("");
    navigate("/userview/" + user.id);
    setAnchorEl(null);
  };
  let fullname;
  let email;
  if (user) {
    fullname = user.fullname;
    email = user.email;
  }
  return (
    <div className="container ">
      
      <div className="row topbar mt-0 ">
        <div className="col-6 col-md-9 col-lg-10 col-xl-10 ">
          {/* <Box
            backgroundColor={colors.primary[400]}
            borderRadius="3px"
            width={"35%"}
          >
            <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
            <IconButton type="button" sx={{ p: 1 }}>
              <SearchIcon />
            </IconButton>
          </Box> */}
        </div>

        {/* <Box>
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton> 
        </Box> */}

        <div className="col-1 col-md-1 col-lg-1 col-xl-1 ">
          <IconButton>
            <NotificationsOutlinedIcon className="Topbar-icon end" ></NotificationsOutlinedIcon>
          </IconButton>{" "}
        </div>
       
        <div className="col-1 col-md-1 col-lg-1 col-xl-1 ">
          <div>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
            
              <PersonOutlinedIcon className="Topbar-icon end"> </PersonOutlinedIcon>
             
              
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <div className="d-flex">
                <img className="w-25" src={profilepic} alt="phpto" />

                <div className=" ms-3 mt-3">
                  {" "}
                  <h5 onClick={handleClose}>{fullname}</h5>
                  <p onClick={handleClose}>{email}</p>
                </div>
              </div> <hr/>
             <div className="d-flex justify-content-between">
              <MenuItem onClick={handleProfile}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>Setting </MenuItem>
             
              <MenuItem onClick={handleLogout}>Logout </MenuItem></div>
            </Menu>
          </div>
        </div>
      </div>
    </div>
    // <div
    // className="topbar"
    //   style={{
    //     display: "flex",
    //     justifyContent: "space-between",
    //     padding: "20px"

    //   }}
    // >
    //   <div >
    //     {/* SEARCH BAR */}
    //   <Box
    //     display="flex"
    //     backgroundColor={colors.primary[400]}
    //     borderRadius="3px"
    //     sx={{ position: "fixed" }}
    //   >
    //     <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
    //     <IconButton type="button" sx={{ p: 1 }}>
    //       <SearchIcon />
    //     </IconButton>
    //   </Box>

    //   {/* ICONS */}
    //   <Box
    //     display="flex"
    //     sx={{
    //       position: "fixed",
    //       right: "0",
    //     }}
    //   >
    //     <IconButton onClick={colorMode.toggleColorMode}>
    //       {theme.palette.mode === "dark" ? (
    //         <DarkModeOutlinedIcon />
    //       ) : (
    //         <LightModeOutlinedIcon />
    //       )}
    //     </IconButton>
    //     <IconButton>
    //       <NotificationsOutlinedIcon />
    //     </IconButton>
    //     <IconButton>
    //       <SettingsOutlinedIcon />
    //     </IconButton>
    //     <IconButton>
    //       <div>
    //         <Button
    //           id="basic-button"
    //           aria-controls={open ? "basic-menu" : undefined}
    //           aria-haspopup="true"
    //           aria-expanded={open ? "true" : undefined}
    //           onClick={handleClick}
    //         >
    //           <PersonOutlinedIcon> </PersonOutlinedIcon>
    //         </Button>
    //         <Menu
    //           id="basic-menu"
    //           anchorEl={anchorEl}
    //           open={open}
    //           onClose={handleClose}
    //           MenuListProps={{
    //             "aria-labelledby": "basic-button",
    //           }}
    //         >
    //           <div className="d-flex">
    //             <img className="w-25" src={profilepic} alt="phpto" />

    //             <div className=" ms-3 mt-3">
    //               {" "}
    //               <h5 onClick={handleClose}>Bhavitha</h5>
    //               <p onClick={handleClose}>Bhavitha@gmail.com</p>
    //             </div>
    //           </div>

    //           <MenuItem onClick={handleClose}>Profile & Acoount</MenuItem>
    //           <MenuItem onClick={handleClose}>Setting </MenuItem>
    //           <hr />
    //           <MenuItem onClick={handleClose}>Sing Out </MenuItem>
    //         </Menu>
    //       </div>
    //       {/* <PersonOutlinedIcon> </PersonOutlinedIcon> */}
    //     </IconButton>
    //     <button onClick={handleLogout} type="submit" class="btn btn-primary">
    //       logout
    //     </button>
    //   </Box>

    //     </div>    </div>
  );
};

export default Topbar;
