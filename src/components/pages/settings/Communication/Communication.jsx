import React from 'react'
import './Communication.css';
import Card from "@mui/material/Card";
import { NavLink, Navigate } from "react-router-dom";

const Communication = () => {
    return (
        <div className='container mt-3'>
            <div className='communication my-3'>
                <div className='row px-2 pb-2'>
                    <div className='col-6 col-md-6 col-lg-3 col-xl-3'>
                        <Card
                            className="cardcolor"
                        >
                            <NavLink to="/whatsappcommunication" className="text-center pt-3">
                                <p className="text-center pt-3 text-light" >
                                    Whatsapp
                                </p>
                            </NavLink>
                        </Card>
                    </div>
                    <div className='col-6 col-md-6 col-lg-3 col-xl-3'>
                        <Card
                            className="cardcolor"
                        >
                            <NavLink to="/emailcommunication" className="text-center pt-3">
                                <p className="text-center pt-3 text-light" >
                                    Email
                                </p>
                            </NavLink>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Communication