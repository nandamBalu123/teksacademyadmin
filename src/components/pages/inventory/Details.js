import React, { useEffect, useState } from 'react'
import './Details.css';
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import WorkIcon from '@mui/icons-material/Work';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { NavLink, useParams, useNavigate } from 'react-router-dom';



const Details = () => {


    // var apiUrl = 'https://demo.teksacademy.com:3000';
// var apiUrl = 'http://localhost:3003/';

    const [getassigndata, setUserdata] = useState([]);
    console.log("getassigndata", getassigndata);

    const { id } = useParams("");
    console.log(id);

    const navigate = useNavigate();


    const getdata = async () => {

        const res = await fetch(`${process.env.REACT_APP_API_URL}/viewassets/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");

        } else {
            setUserdata(data[0])
            console.log("get data");
        }
    }

    useEffect(() => {
        getdata();
    }, [])

    const deleteuser = async (id) => {

        const res2 = await fetch(`${process.env.REACT_APP_API_URL}/deleteuser/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const deletedata = await res2.json();
        console.log(deletedata);

        if (res2.status === 422 || !deletedata) {
            console.log("error");
        } else {
            console.log("user deleted");
            navigate("/");
        }

    }

    return (
        <div className="container mt-3">
             <div className='assignassets-view'> 
              <h3 className='text-center my-3'>Assign Assets View </h3>
             <div className='d-flex justify-content-evenly'> 
           <div> 
           <h5 className="mt-3"><b> Name: </b><span >{getassigndata.name}</span></h5>
           <h5 className="mt-3"><b>Designation: </b> <span >{getassigndata.designation}</span></h5>
           <h5 className="mt-3"><b> Branch: </b> <span>{getassigndata.branch}</span></h5>
           <h5 className="mt-3"><b> Asset type:</b> <span>{getassigndata.assettype}</span></h5>
           <h5 className='mt-3'> <b> Issued Date:</b>  <span>{getassigndata.issueddate}</span></h5>
           {/* <h5 className="mt-3">Issued Date:<span>{getassigndata.issueddate}</span></h5> */}
           </div>
           <div> 
           <h5 className='mt-3'> <b>Brand Name:</b>  <span>{getassigndata.brandname}</span></h5>
           <h5 className='mt-3'> <b>Asset Code :</b>  <span>{getassigndata.assetcode}</span></h5>
           <h5 className='mt-3'> <b>Quantity :</b>  <span>{getassigndata.anonymity}</span></h5>
           <h5 className='mt-3'> <b>Remarks :</b>  <span>{getassigndata.remarks}</span></h5>
           {/* <h5 className="mt-3">Asset Code: <span>{getassigndata.assetcode}</span></h5> */}
           {/* <h5 className="mt-3">Brand Name: <span>{getassigndata.brandname}</span></h5> */}
           </div>
              </div>
             <div className='text-end me-5'> 
             <NavLink to="/assignassets"><button className='btn btn-primary mb-4 '> Back</button></NavLink>
             </div>
</div>
            {/* <Card sx={{ maxWidth: 600 }}>
                <CardContent>
                    <div className="add_btn">
                        <NavLink to={`/edit/${getassigndata.id}`}>  <button className="btn btn-primary mx-2"><CreateIcon /></button></NavLink>
                        <button className="btn btn-danger" onClick={() => deleteuser(getassigndata.id)}><DeleteOutlineIcon /></button>
                    </div>
                    <div className="row">
                        <div className="left_view col-lg-6 col-md-6 col-12"> */}
                            {/* <img src="/profile.png" style={{ width: 50 }} alt="profile" /> */}
                            {/* <h3 className="mt-3">Name: <span >{getassigndata.name}</span></h3> */}
                            {/* <h3 className="mt-3">Name: <span >{getassigndata.vendername}</span></h3> */}
                            {/* <h3 className="mt-3">Designation: <span >{getassigndata.designation}</span></h3>
                            <h3 className="mt-3">Branch: <span>{getassigndata.branch}</span></h3>
                            <h3 className="mt-3">Asset type: <span>{getassigndata.assettype}</span></h3>
                            <h3 className="mt-3">Brand Name: <span>{getassigndata.brandname}</span></h3>
                        </div>
                        <div className="left_view  col-lg-6 col-md-6 col-12">
                            <h3 className="mt-3">Remarks: <span>{getassigndata.remarks}</span></h3>
                            <h3 className="mt-3">Issued Date: <span>{getassigndata.issueddate}</span></h3>
                            <h3 className="mt-3">Asset Code: <span>{getassigndata.assetcode}</span></h3>
                            <h3 className="mt-3">Quantity: <span>{getassigndata.anonymity}</span></h3>
                            
                        </div>
                    </div>

                </CardContent>
            </Card> */}
        </div>
    )
}

export default Details
