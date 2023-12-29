import React from 'react'
import './Settings.css';
import Card from "@mui/material/Card";
import { NavLink, Navigate } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";

const Settings = () => {
    const { user } = useAuthContext();

    return (
        <div className='container mt-3'>
            <div className='allsettings py-3'>
                <div className='row px-2'>
                    <div className='col-6 col-md-6 col-lg-3 col-xl-3'>
                        <Card
                            className="cardcolor"

                        >
                            <NavLink
                                to="/organizationprofile"
                                //  to={`/userview/${user.id}`} 
                                className="text-center pt-3">
                                <p className="text-center pt-3 text-light" >
                                    Organization Profile
                                </p>
                            </NavLink>
                        </Card>
                    </div>
                    <div className='col-6 col-md-6 col-lg-3 col-xl-3'>
                        <Card
                            className="cardcolor"
                        >
                            <NavLink to="/customform" className="text-center pt-3">
                                <p className="text-center pt-3 text-light" >
                                    Forms
                                </p>
                            </NavLink>
                        </Card>
                    </div>
                    <div className='col-6 col-md-6 col-lg-3 col-xl-3'>
                        <Card
                            className="cardcolor"
                        >
                            <NavLink to="" className="text-center pt-3">
                                <p className="text-center pt-3 text-light" >
                                    Communication
                                </p>
                            </NavLink>

                        </Card>
                    </div>

                    <div className='col-6 col-md-6 col-lg-3 col-xl-3'>
                        <Card
                            className="cardcolor"
                        >
                            <NavLink to="/roles" className="text-center pt-3">
                                <p className="text-center pt-3 text-light" >
                                    Roles
                                </p>
                            </NavLink>

                        </Card>
                    </div>


                </div>
                <div className='row px-2'>
                    <div className='col-6 col-md-6 col-lg-3 col-xl-3'>
                        <Card
                            className="cardcolor"
                        >
                            <NavLink to="/branch" className="text-center pt-3">
                                <p className="text-center pt-3 text-light" >
                                    Branch
                                </p>
                            </NavLink>
                        </Card>
                    </div>
                    <div className='col-6 col-md-6 col-lg-3 col-xl-3'>
                        <Card
                            className="cardcolor"
                        >
                            <NavLink to="/departments" className="text-center pt-3">
                                <p className="text-center pt-3 text-light" >
                                    Departments
                                </p>
                            </NavLink>
                        </Card>
                    </div>
                    <div className='col-6 col-md-6 col-lg-3 col-xl-3'>
                        <Card
                            className="cardcolor"
                        >
                            <NavLink to="/leadsource" className="text-center pt-3">
                                <p className="text-center pt-3 text-light" >
                                    Lead Sources
                                </p>
                            </NavLink>
                            {/* <p className="text-center pt-3">
                                Lead Sources
                            </p> */}
                        </Card>
                    </div>
                    <div className='col-6 col-md-6 col-lg-3 col-xl-3'>
                        <Card
                            className="cardcolor"
                        >
                            <NavLink to="/admissionfee" className="text-center pt-3">
                                <p className="text-center pt-3 text-light" >
                                    Admission Fee
                                </p>
                            </NavLink>
                        </Card>
                    </div>



                </div>
                <div className='row px-2'>
                    <div className='col-6 col-md-6 col-lg-3 col-xl-3'>
                        <Card
                            className="cardcolor"
                        >
                            <NavLink to="/courses" className="text-center pt-3">
                                <p className="text-center pt-3 text-light" >
                                    Courses
                                </p>
                            </NavLink>
                        </Card>
                    </div>

                    <div className='col-6 col-md-6 col-lg-3 col-xl-3'>
                        <Card
                            className="cardcolor"
                        >
                            <NavLink to="/coursepackage" className="text-center pt-3">
                                <p className="text-center pt-3 text-light" >
                                    Course Package
                                </p>
                            </NavLink>
                        </Card>
                    </div>
                    <div className='col-6 col-md-6 col-lg-3 col-xl-3'>
                        <Card
                            className="cardcolor"
                        >
                            <NavLink to="/assettype" className="text-center pt-3">
                                <p className="text-center pt-3 text-light" >
                                    Add Assets Type
                                </p>
                            </NavLink>
                        </Card>
                    </div>
                    <div className='col-6 col-md-6 col-lg-3 col-xl-3'>
                        <Card
                            className="cardcolor"
                        >
                            <NavLink to="/vendor" className="text-center pt-3">
                                <p className="text-center pt-3 text-light" >
                                    Add Vendor
                                </p>
                            </NavLink>
                        </Card>
                    </div>

                </div>



            </div>
        </div>
    )
}

export default Settings