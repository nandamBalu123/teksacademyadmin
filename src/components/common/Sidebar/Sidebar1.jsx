import React , {useState} from 'react'
// import favicon from "../../../images/favicon.jpeg";
// import CloseIcon from "@mui/icons-material/Close";
// import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
// import "./Sidebar1.css";
// import { styled, useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import MuiDrawer from '@mui/material/Drawer';
// import MuiAppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import List from '@mui/material/List';
// import CssBaseline from '@mui/material/CssBaseline';
// import Typography from '@mui/material/Typography';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';

// const drawerWidth = 240;

// const openedMixin = (theme) => ({
//   width: drawerWidth,
//   transition: theme.transitions.create('width', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
//   overflowX: 'hidden',
// });

// const closedMixin = (theme) => ({
//   transition: theme.transitions.create('width', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   overflowX: 'hidden',
//   width: `calc(${theme.spacing(7)} + 1px)`,
//   [theme.breakpoints.up('sm')]: {
//     width: `calc(${theme.spacing(8)} + 1px)`,
//   },
// });

// const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'flex-end',
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
// }));

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== 'open',
// })(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(['width', 'margin'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(['width', 'margin'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
//   ({ theme, open }) => ({
//     width: drawerWidth,
//     flexShrink: 0,
//     whiteSpace: 'nowrap',
//     boxSizing: 'border-box',
//     ...(open && {
//       ...openedMixin(theme),
//       '& .MuiDrawer-paper': openedMixin(theme),
//     }),
//     ...(!open && {
//       ...closedMixin(theme),
//       '& .MuiDrawer-paper': closedMixin(theme),
//     }),
//   }),
// );


const Sidebar1 = () => {
    // const theme = useTheme(); ////////////////////////////////////////////
    // const [open, setOpen] = React.useState(false);
  
    // const handleDrawerOpen = () => {
    //   setOpen(true);
    // };
  
    // const handleDrawerClose = () => {
    //   setOpen(false);
    // };
  
  return (
    <div>
        {/* <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Mini variant drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
     
    </Box> */}
        {/* <div>
        <div className="sidebar">
    <div className="logo-details">
      <i className='bx bxl-c-plus-plus icon'></i>
        <div className="logo_name">CodingLab</div>
        <i className='bx bx-menu' id="btn" ></i>
    </div>
    <ul className="nav-list">
      <li>
          
          <p> sgr</p>
         <input type="text" placeholder="Search..."/>
         <span className="tooltip">Search</span>
      </li>
      <li>
        <a href="#">
       <p > hbh</p>
       <p className='hidden'>gvgvg</p>
          <span className="links_name">Dashboard</span>
        </a>
         <span className="tooltip">Dashboard</span>
      </li>
      <li>
       <a href="#">
         <i className='bx bx-user' ></i>
         <span className="links_name">User</span>
       </a>
       <span className="tooltip">User</span>
     </li>
     <li>
       <a href="#">
         <i className='bx bx-chat' ></i>
         <span className="links_name">Messages</span>
       </a>
       <span className="tooltip">Messages</span>
     </li>
     <li>
       <a href="#">
         <i className='bx bx-pie-chart-alt-2' ></i>
         <span className="links_name">Analytics</span>
       </a>
       <span className="tooltip">Analytics</span>
     </li>
     <li>
       <a href="#">
         <i className='bx bx-folder' ></i>
         <span className="links_name">File Manager</span>
       </a>
       <span className="tooltip">Files</span>
     </li>
     <li>
       <a href="#">
         <i className='bx bx-cart-alt' ></i>
         <span className="links_name">Order</span>
       </a>
       <span className="tooltip">Order</span>
     </li>
     <li>
       <a href="#">
         <i className='bx bx-heart' ></i>
         <span className="links_name">Saved</span>
       </a>
       <span className="tooltip">Saved</span>
     </li>
     <li>
       <a href="#">
         <i className='bx bx-cog' ></i>
         <span className="links_name">Setting</span>
       </a>
       <span className="tooltip">Setting</span>
     </li>
     <li className="profile">
         <div className="profile-details">
           <img src="profile.jpg" alt="profileImg"/>
           <div className="name_job">
             <div className="name">Prem Shahi</div>
             <div className="job">Web designer</div>
           </div>
         </div>
         <i className='bx bx-log-out' id="log_out" ></i>
     </li>
    </ul>
  </div>
  <section className="home-section">
      <div className="text">Dashboard</div>
  </section>
 
    </div> */}

        {/* <section className={isActive ? 'active' : ""}>
            <div className='button' onClick={toggleSection}>
                <i className='fa-solid fa-bars'/>  
                </div>
                <div className='sidebar'>
                    <div className='profile'>
                        <div className='pro-img'> 
                        <img src={favicon} alt='profile-pic'/> </div>
                        <div className='pro-info'>
                            <h3> Bhavitha</h3> </div>
                         </div>
                         
                         <ul> 
                            {navigationLinks.map((link,index)=>{ 
                                <li key={index}> 
                                <a href={link.href} className={link.isActive ? 'active' : ""}> 
                                <span className='icon'> 
                                <i className='{link.iconClass}'/></span>
                                <span className='item'>{link.text}</span>
                                {link.count && <span className='count'> {link.count} </span>}
                                </a>
                                </li>
                            })}
                         </ul>
                          </div>
             </section> */}
  {/* <nav className='sidebar'> 
      <div className='sidebar-top-wrapper'> 
      <div className='sidebar-top'>  
      <a href="#" className="logo__wrapper">
        
          <img src={favicon} alt="Logo" className="logo-small"/>
          <span >
            Teks Academy
          </span>
        </a>
      </div><hr/>
      <div className='expand-btn'> 
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.00979 2.72L10.3565 7.06667C10.8698 7.58 10.8698 8.42 10.3565 8.93333L6.00979 13.28"
            stroke="#4A516D" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
       </div>
      <div className='sidebar-links'>
        <h2><HomeOutlinedIcon /> &nbsp;Dashboard</h2>
        <ul className='menu-link'> 
            <li className='nav-link'> 
            <a href='#'>
                <span className='text nav-text'> Dashboard </span>
                 </a>

                         </li>
           <li> 
           <a href='#orders' title='Orders' className='tooltip'> 
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-box" width="24" height="24"
              viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
              stroke-linejoin="round"></svg>
                <span className="link hide">Orders</span>
            <span className="tooltip__content">Orders</span>
            </a>
           </li>
           <li> 
           <a href="#documentation" title="Documentation" className="tooltip">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
              stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2"></path>
            </svg>
            <span className="link hide">Documentation</span>
            <span className="tooltip__content">Documentation</span>
          </a>
           </li>
        </ul>
         </div>
       </nav> */}
     {/* <aside className='sidebar'> 
     <header className='sidebar-header'> 
     <div className='pro-img d-flex'> 
                        <img src={favicon} alt='profile-pic' className='logo-small'/> 
                        <div className='pro-info'>
                            <h3> Teks Academy</h3> </div></div>
                      
     
      </header></aside> */}
      {/* <div> 
      <nav className='sidebar close'> 
      <header> 
        <div className='image-text'> 
        <span className='image'> 
        <img src={favicon} alt='profile-pic' /> </span> 
        <div className='text logo-text'>
            <span className='name'> Name</span>
            <span className='proffession'> Web Developer </span>
             </div>
        
        </div>
      <CloseIcon className='sidebar-icon' />
      </header>
      <section className='home'> 
      <div className='text'> Dashboard Sidebar</div>
      </section>
       </nav>
     <div className='menu-bar'> 
     <div className='menu' >
        <ul className='menu-links'>
     <li className='nav-link' > 
     <a href='#'> 
     <span className='text nav-text'> Dashboard </span>
     </a>
     </li> 
     <li className='nav-link' > 
     <a href='#'> 
     <span className='text nav-text'>Revenue</span>
     </a>
     </li>
     <li className='nav-link' > 
     <a href='#'> 
     <span className='text nav-text'>Notification </span>
     </a>
     </li>
     <li className='nav-link' > 
     <a href='#'> 
     <span className='text nav-text'> Analytics</span>
     </a>
     </li>
     </ul>
     </div>
     
     <div className='bottom-content'> </div>
     </div>
      </div> */}
     {/* <div className="sidebar">
    <div className="logo_details">
      <i className="bx bxl-audible icon"></i>
      <div className="logo_name">Code Effect</div>
      <i className="bx bx-menu" id="btn"></i>
    </div>
    <ul className="nav-list">
      <li>
        <i classNameName="bx bx-search"></i>
        <input type="text" placeholder="Search..."/>
         <span className="tooltip">Search</span>
      </li>
      <li>
        <a href="#">
          <i className="bx bx-grid-alt"></i>
          <span className="link_name">Dashboard</span>
        </a>
        <span className="tooltip">Dashboard</span>
      </li>
      <li>
        <a href="#">
          <i className="bx bx-user"></i>
          <span className="link_name">User</span>
        </a>
        <span className="tooltip">User</span>
      </li>
      <li>
        <a href="#">
          <i className="bx bx-chat"></i>
          <span className="link_name">Message</span>
        </a>
        <span className="tooltip">Message</span>
      </li>
      <li>
        <a href="#">
          <i className="bx bx-pie-chart-alt-2"></i>
          <span className="link_name">Analytics</span>
        </a>
        <span className="tooltip">Analytics</span>
      </li>
      <li>
        <a href="#">
          <i className="bx bx-folder"></i>
          <span className="link_name">File Manger</span>
        </a>
        <span className="tooltip">File Manger</span>
      </li>
      <li>
        <a href="#">
          <i className="bx bx-cart-alt"></i>
          <span className="link_name">Order</span>
        </a>
        <span className="tooltip">Order</span>
      </li>
      <li>
        <a href="#">
          <i className="bx bx-cog"></i>
          <span className="link_name">Settings</span>
        </a>
        <span className="tooltip">Settings</span>
      </li>
      <li className="profile">
        <div className="profile_details">
          <img src="profile.jpeg" alt="profile image"/>
          <div className="profile_content">
            <div className="name">Anna Jhon</div>
            <div className="designation">Admin</div>
          </div>
        </div>
        <i className="bx bx-log-out" id="log_out"></i>
      </li>
    </ul>
  </div>
  <section className="home-section">
    <div className="text">Dashboard</div>
  </section> */}


    </div>
   
  )
}

export default Sidebar1

