import { borderRadius, color } from "@mui/system";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
// import {cchargerCount} from './Assignassets';
import Addassets from "./Addassets";
import Assignassets from "./Assignassets";
// import SideBar from '../Sidebar/SideBar';

// import Navbaar from '../Navbar/Navbaar';
export default function Inventoryhome() {
  const counts = Addassets();

  return (
    <div>
      {/* <Navbaar /> */}
      <div>
        <div className="container">
          <div className="row">
            <div className="col-2">
              <NavLink
                to="/addassets"
                style={{
                  textDecoration: "none",
                  padding: "5px 10px",
                  background: "#0d6efd",
                  color: "white",
                  borderRadius: "5px",
                  margin: "10px auto",
                  display: "block",
                  textAlign: "center",
                }}
              >
                Add Assets
              </NavLink>
              <NavLink
                to="/assignassets"
                style={{
                  textDecoration: "none",
                  padding: "5px 10px",
                  background: "#0d6efd",
                  color: "white",
                  borderRadius: "5px",
                  margin: "10px auto",
                  display: "block",
                  textAlign: "center",
                }}
              >
                Assign Assets
              </NavLink>
            </div>
          </div>
          {/* <div className='row'>
        <div className='col-lg-3'></div>
        <div className='col-lg-3 admin' style={{height:'200px', background:'#1479ff', color:'white', margin: '5px 5px', borderRadius: '5px'}}>
          <NavLink to='/addassets' style={{textDecoration: 'none', color: 'white'}}><div className='' to='/addassets'>
            <h3 className='text-center'>Main</h3>
            
                        <span>Total laptops:  </span><br></br>
                        <span>Total t-shirt: </span><br></br>
                        <span>Total shirt: </span><br></br>
                        <span>Total charger: {props.getChargerCount}</span><br></br>
                        <span>Total mouse: </span><br></br>
                        <span>Total bags: </span><br></br>
                        
           
            
            
          </div></NavLink>
        </div>
        
        <div className='col-lg-3'></div>
      </div>
      <div className='row'>
        <div className='col-lg-3 admin' style={{height:'200px', background:'#1479ff', color:'white', margin: '0px 5px', borderRadius: '5px'}}>
            <div className='' >
              <h3 className='text-center'>Hitech city</h3><br></br>
              <strong>Total Assets:</strong>
              
            </div>
        </div>
        <div className='col-lg-3 admin' style={{height:'200px', background:'#1479ff', color:'white',margin: '0px 5px', borderRadius: '5px'}}>
            <div className='' >
              <h3 className='text-center'>Ameerpet</h3><br></br>
              <strong>Total Assets:</strong>
              
            </div>
        </div>
          <div className='col-lg-3 admin' style={{height:'200px', background:'#1479ff', color:'white',margin: '0px 5px', borderRadius: '5px'}}>
            <div className='' >
              <h3 className='text-center'>Dilsukhnagar</h3><br></br>
              <strong>Total Assets:</strong>
             
            </div>
        </div>
      </div> */}
        </div>
      </div>
    </div>
  );
}
