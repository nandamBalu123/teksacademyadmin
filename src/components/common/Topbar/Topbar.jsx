import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import profilepic from "../../../images/img4.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { ColorModeContext, tokens } from "../../../theme";
import { useTheme } from "@mui/material";
import { useContext } from "react";
import "./Topbar.css";
import { useScroll } from "framer-motion";
import { useState } from "react";
import { useEffect } from "react";

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
    localStorage.removeItem("id");

    // dispatch logout action
    dispatch({ type: "LOGOUT" });
    navigate("/login");
    // axios
    //   .get("http://localhost:3030/logout")
    //   .then((res) => {
    //     navigate("/login");
    //   })
    //   .catch((err) => cFuseronsole.log(err));
    // window.location.reload();
  };

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleProfile = () => {
    navigate("");
    navigate("/userview/" + user.id);
    setAnchorElUser(null);
  };
  const [fullname, setFullname] = useState();
  let email;
  if (user) {
    email = user.email;
  }
  useEffect(() => {
    setFullname(user.fullname);
  }, [user]);
  useEffect(() => {
    console.log("user", fullname);
  });
  return (
    <div className='container Top-bar' > 
    <AppBar position="static" className='bg-white'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          {/* <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            {/* <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography> */}
            {/* <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box> */}
            <Box sx={{ flexGrow: 1, textAlign: "end" }}>
              {/* <Tooltip title="Open settings"   > */}

              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <img src={profilepic} alt="" className="userpic" />
              </IconButton>
            {/* </Tooltip> */}
              <Menu
                style={{marginLeft:"6rem"}}
              sx={{ mt: '45px'  }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}

              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
               {/* <div className='d-flex justify-content-between'> 
                <img src={profilepic} alt=""  className='dropdownuserimg'/>
             <span> 
             <MenuItem className='fs-5  ms-4 m-0 p-0 ' > {fullname}</MenuItem>
               <MenuItem className='fs-11 text-center'> {email}</MenuItem>
             </span>
               </div><hr/> */}
                <div > 
                <MenuItem className='fs-6' onClick={handleProfile}><AccountCircleIcon className='fs-5'/> &nbsp;Profile </MenuItem>
                <MenuItem  className='fs-6'onClick={handleLogout}><PowerSettingsNewIcon className='fs-5'/> &nbsp; Logout </MenuItem>
                </div>
            </Menu>
            </Box>
            <p style={{ color: "black", margin:"auto 5px" }} >{fullname }</p>
        </Toolbar>
      </Container>
    </AppBar> </div>
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
