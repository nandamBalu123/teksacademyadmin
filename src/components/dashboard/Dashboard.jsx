import React, { useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import { AiOutlineMenu } from 'react-icons/ai';
import './Dashboard.css';
import Navbaar from '../inventory/Navbaar';
import SideBar from '../Sidebar/SideBar';

const Dashboard = () => {
  return (
    <div>
        <Navbaar></Navbaar>
        <SideBar></SideBar>
    </div>
  )
  
};

export default Dashboard;
