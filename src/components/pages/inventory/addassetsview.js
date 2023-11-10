import React, { useEffect, useState } from 'react'
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import WorkIcon from '@mui/icons-material/Work';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { NavLink, useParams, useNavigate } from 'react-router-dom';




function Addassetsview() {

    

const [getassigndata, setUserdata] = useState([]);
console.log("getassigndata", getassigndata);

const { id } = useParams("");
console.log(id);

const navigate = useNavigate();


const getdata = async () => {

    const res = await fetch(`${process.env.REACT_APP_API_URL}/addassetsview/${id}`, {
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

    const res2 = await fetch(`${process.env.REACT_APP_API_URL}/addassetsdelete/${id}`, {
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
        console.log("asset deleted");
        alert("Asset Deleted");
        navigate("/addassets");
    }

}
  return (
    <div className="container mt-3">
      
            <h1 style={{ fontWeight: 400 }}>Welcome </h1>
            <NavLink to="/assignassets">Back</NavLink>
            <Card sx={{ maxWidth: 600 }}>
                <CardContent>
                    <div className="add_btn">
                        <NavLink to={`/edit/${getassigndata.id}`}>  <button className="btn btn-primary mx-2"><CreateIcon /></button></NavLink>
                        <button className="btn btn-danger" onClick={() => deleteuser(getassigndata.id)}><DeleteOutlineIcon /></button>
                    </div>
                    <div className="row">
                        <div className="left_view col-lg-6 col-md-6 col-12">
                            {/* <img src="/profile.png" style={{ width: 50 }} alt="profile" /> */}
                            {/* <h3 className="mt-3">Name: <span >{getassigndata.name}</span></h3> */}
                            <h3 className="mt-3">Name: <span >{getassigndata.vendername}</span></h3>
                            {/* <h3 className="mt-3">Designation: <span >{getassigndata.designation}</span></h3> */}
                            {/* <h3 className="mt-3">Branch: <span>{getassigndata.branch}</span></h3> */}
                            <h3 className="mt-3">Asset type: <span>{getassigndata.assettype}</span></h3>
                            {/* <h3 className="mt-3">Brand Name: <span>{getassigndata.brandname}</span></h3> */}
                            <h3 className="mt-3">Remarks: <span>{getassigndata.remarks}</span></h3>
                        </div>
                        <div className="left_view  col-lg-6 col-md-6 col-12">
                            
                            {/* <h3 className="mt-3">Issued Date: <span>{getassigndata.issueddate}</span></h3> */}
                            <h3 className="mt-3">Asset Code: <span>{getassigndata.assetcode}</span></h3>
                            <h3 className="mt-3">Quantity: <span>{getassigndata.anonymity}</span></h3>
                            
                        </div>
                    </div>

                </CardContent>
            </Card>
        
    </div>
  )
}

export default Addassetsview
