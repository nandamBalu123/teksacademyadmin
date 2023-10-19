import React from 'react';
import './RoleAccess.css';

import Switch from '@mui/material/Switch';

const label = { inputProps: { 'aria-label': 'Switch demo' } };
const RoleAccess = () => {
    return (
        <div className='container'>
            <h3 style={{ fontFamily: "italic" }}> Branch Manager</h3>
            <div className='access'>
                <div className='flex' >
                    <h6> Active</h6>
                    <h6 > Custom Profile</h6>
                </div><hr />
                <h5> General Information</h5>

                <div className='row'>
                    <div className="col-12 col-md-6 col-lg-6">
                        <label> Name<span className='text-danger'>*</span> </label>
                        <input
                            type="text"

                            required
                            style={{
                                height: "35px",
                                border: "1.5px solid black",
                                borderRadius: "5px",
                            }}

                        />
                    </div>
                    <div className="col-12 col-md-6 col-lg-6">
                        <label> Description<span className='text-danger'>*</span> </label>
                        <input
                            type="text"

                            required
                            style={{
                                height: "35px",
                                border: "1.5px solid black",
                                borderRadius: "5px",
                            }}
                        /></div></div> <hr />
                <h5> Product Access</h5>
                <div>   <Switch  {...label} color="info" /></div><hr />
                <h5> Modele & Object Permissions</h5>
                <table className='table' border={1} >
                    <thead>
                        <tr>
                            <th className='text-center'> Name</th>
                            <th colSpan={4} className='text-center'> Access</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td> </td>
                            <td> Read</td>
                            <td>Update</td>
                            <td> Delete</td>
                            <td> Create</td>
                        </tr>
                        <tr>
                            <td> All</td>
                            <td>  <tr> <Switch  {...label} color="info" /></tr></td>
                            <td>  <tr> <Switch  {...label} color="info" /></tr></td>
                            <td>  <tr> <Switch  {...label} color="info" /></tr></td>
                            <td>  <tr> <Switch  {...label} color="info" /></tr></td>
                        </tr>
                        <tr ></tr>

                    </tbody>
                </table>

            </div>

        </div>

    )
}

export default RoleAccess