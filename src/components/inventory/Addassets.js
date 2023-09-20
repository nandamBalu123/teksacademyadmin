import React, { useState, useEffect, useContext } from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { NavLink, Navigate } from 'react-router-dom';
import { adddata, deldata } from './context/ContextProvider';
import { updatedata } from './context/ContextProvider';

// import axios from 'axios'
import SideBar from '../Sidebar/SideBar';

import Navbaar from '../Navbar/Navbaar';

const Addassets = () => {

    // var apiUrl = 'https://demo.teksacademy.com:3000';
    var apiUrl = 'http://localhost:3003';


    


    // start

    const [getuserdata, setUserdata] = useState([]);
    console.log(getuserdata);

    const { udata, setUdata } = useContext(adddata);

    const {updata, setUPdata} = useContext(updatedata);

    const {dltdata, setDLTdata} = useContext(deldata);

    // const getdata = async () => {
    //     const response = await axios.get('http://localhost:3003/getusers');
    //     setUserdata(response.data);
    //     console.log('get data');
    //   };
    
    //   useEffect(() => {
    //     getdata();
    //   }, []);
    const getdata = async () => {
        
        const res = await fetch(`${apiUrl}/getusers`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error");

        } else {
            setUserdata(data)
            console.log("get data");

        }
    }

    useEffect(() => {
        getdata();
    }, [])

    const deleteuser = async (id) => {

        const res2 = await fetch(`${apiUrl}/deleteuser/${id}`, {
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
            // setDLTdata(deletedata)
            getdata();
        }

    }


// new
const getLaptopCount = () => {
    let laptopCount = 0;
    for (const element of getuserdata) {
      if (element['assettype'] === 'laptop') {
        laptopCount += parseInt(element['anonymity'], 10) || 0;
      }
    }
    console.log('Laptop Count:', laptopCount); // Log the laptopCount value to check
    return laptopCount;
  };

  const getTshirtCount = () => {
    let tshirtCount = 0;
    for(const element of getuserdata){
        if(element['assettype'] === 't-shirt'){
            tshirtCount += parseInt(element['anonymity'], 10) || 0;
        }
    }
    return tshirtCount;
  }

  const getShirtCount = () => {
    let shirtCount = 0;
    for(const element of getuserdata){
        if(element['assettype'] === 'shirt'){
            shirtCount += parseInt(element['anonymity'], 10) || 0;
        }
    }
    return shirtCount;
  }

  const getChargerCount = () => {
    let chargerCount = 0;
    for(const element of getuserdata){
        if(element['assettype'] === 'charger'){
            chargerCount += parseInt(element['anonymity'], 10) || 0;
        }
    }
    return chargerCount;
  }
    
  const getMouseCount = () => {
    let mouseCount = 0;
    for(const element of getuserdata){
        if(element['assettype'] === 'mouse'){
            mouseCount += parseInt(element['anonymity'], 10) || 0;
        }
    }
    return mouseCount;
  }

  const getStudentsBags = () => {
    let studentsBag = 0;
    for(const element of getuserdata){
        if(element['assettype'] === 'student bags'){
            studentsBag += parseInt(element['anonymity'], 10) || 0;
        }
    }
    return studentsBag;
  }


//   const laptopCount = getLaptopCount();
//   const tshirtCount = getTshirtCount();
//   const shirtCount = getShirtCount();
//   const chargerCount = getChargerCount();
//   const mouseCount = getMouseCount();
//   const studentsBagCount = getStudentsBags();

    return (
        
        <>
            {
                udata ?
                    <>
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>{udata.name}</strong>  added succesfully!
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </> : ""
            }
            {
                updata ?
                    <>
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>{updata.name}</strong>  updated succesfully!
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </> : ""
            }

            {
                dltdata ?
                    <>
                        <div class="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>{dltdata.name}</strong>  deleted succesfully!
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </> : ""
            }
            <Navbaar />
            <SideBar>
            <div className="mt-5">
                <div className="container">
                    <div className='col-lg-12'>
                        <div className='row'>
                            <div className='col-lg-3'>
                                <div className="mt-2 mb-2">
                                <NavLink to="/addassetsform" className="btn btn-primary">Add Record</NavLink><br></br>
                                    {/* <span>Rows : <strong>{getuserdata.length}</strong></span><br></br>
                                    <span>Total quantity: <strong>{getLaptopCount() + getTshirtCount() + getShirtCount() + getChargerCount() + getMouseCount() + getStudentsBags()}</strong></span><br></br> */}
                                </div>
                            </div>
                            <div className='col-lg-3'>
                                <div className="mt-2 mb-2">
                                    <span>Total laptops: <strong>{getLaptopCount()}</strong></span><br></br>
                                    <span>Total t-shirt: <strong>{getTshirtCount()}</strong></span><br></br>
                                </div>
                            </div>
                            <div className='col-lg-3'>
                                <div className="mt-2 mb-2">
                                    <span>Total shirt: <strong>{getShirtCount()}</strong></span><br></br>
                                    <span>Total charger: <strong>{getChargerCount()}</strong></span><br></br>
                                </div>
                            </div>
                            <div className='col-lg-3'>
                                <div className="mt-2 mb-2">
                                    <span>Total mouse: <strong>{getMouseCount()}</strong></span><br></br>
                                    <span>Total bags: <strong>{getStudentsBags()}</strong></span><br></br>
                                </div>
                            </div>
                        </div>
                    {/* <div className="add_btn mt-2 mb-2">
                        <NavLink to="/addassetsform" className="btn btn-primary">Add Record</NavLink><br></br>
                        <span>Rows : {getuserdata.length}</span><br></br>
                        <span>Total laptops: {getLaptopCount()}</span><br></br>
                        <span>Total t-shirt: {getTshirtCount()}</span><br></br>
                        <span>Total shirt: {getShirtCount()}</span><br></br>
                        <span>Total charger: {getChargerCount()}</span><br></br>
                        <span>Total mouse: {getMouseCount()}</span><br></br>
                        <span>Total bags: {getStudentsBags()}</span><br></br>
                        <hr></hr>
                        <span>Total quantity: {getLaptopCount() + getTshirtCount() + getShirtCount() + getChargerCount() + getMouseCount() + getStudentsBags()}</span><br></br>
                    </div> */}
                    <div className="mt-2 mb-2">
                        {/* <NavLink to="/addassetsform" className="btn btn-primary">Add Record</NavLink><br></br> */}
                    </div>
                    <table class="table col-12" id='your-table-id'>
                        <thead>
                            <tr className="table-dark">
                                <th scope="col">id</th>
                                {/* <th scope="col">Name</th> */}
                                <th scope="col">Vender Name</th>
                                {/* <th scope="col">Designation</th> */}
                                {/* <th scope="col">Branch</th> */}
                                <th scope="col">Asset Type</th>
                                <th scope="col">Brand Name</th>
                                {/* <th scope="col">Remarks</th> */}
                                {/* <th scope="col">Issued Date</th> */}
                                <th scope="col">Asset Code</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Status</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        
                        <tbody >
                            {getuserdata.map((element, id) => (
                                <React.Fragment key={id}>
                                <tr>
                                    <th scope="row">{id + 1}</th>
                                    {/* <td>{element.name}</td> */}
                                    <td>{element.vendername}</td>
                                    {/* <td>{element.designation}</td> */}
                                    {/* <td>{element.branch}</td> */}
                                    <td>{element.assettype}</td>
                                    <td>{element.brandname}</td>
                                    {/* <td>{element.remarks}</td> */}
                                    {/* <td>{element.issueddate}</td> */}
                                    <td>{element.assetcode}</td>
                                    <td>{element.anonymity}</td>
                                    <td>{element.returndate}</td>

                                    
                                    <td className="d-flex justify-content-between">
                                    <NavLink to={`view/${element.id}`}>
                                        <button className="btn btn-success">
                                        <RemoveRedEyeIcon />
                                        </button>
                                    </NavLink>
                                    <NavLink to={`edit/${element.id}`}>
                                        <button className="btn btn-primary">
                                        <CreateIcon />
                                        </button>
                                    </NavLink>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => deleteuser(element.id)}
                                    >
                                        <DeleteOutlineIcon />
                                    </button>
                                    </td>
                                </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                        {/* <tbody>

                            {
                                getuserdata.map((element, id) => {
                                    return (
                                        <>
                                            <tr>
                                                <th scope="row">{id + 1}</th>
                                                <td>{element.name}</td>
                                                <td>{element.email}</td>
                                                <td>{element.work}</td>
                                                <td>{element.mobile}</td>
                                                <td className="d-flex justify-content-between">
                                                    <NavLink to={`view/${element.id}`}> <button className="btn btn-success"><RemoveRedEyeIcon /></button></NavLink>
                                                    <NavLink to={`edit/${element.id}`}>  <button className="btn btn-primary"><CreateIcon /></button></NavLink>
                                                    <button className="btn btn-danger" onClick={() => deleteuser(element.id)}><DeleteOutlineIcon /></button>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody> */}
                    </table>

                    </div>
                </div>
            </div>
            </SideBar>
        </>
    )
}

export default Addassets

















