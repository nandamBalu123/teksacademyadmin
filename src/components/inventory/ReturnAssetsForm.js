import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useParams,useNavigate } from 'react-router-dom'
import { updatedata } from './context/ContextProvider';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Navbaar from './Navbaar';
import SideBar from '../Sidebar/SideBar';


export default function ReturnAssets() {
 
    var apiUrl = 'https://demo.teksacademy.com:3000';
    // var apiUrl = 'http://localhost:3003/';

    // const [getuserdata, setUserdata] = useState([]);
    // console.log(getuserdata);

    const handleDateChange = (date) => {
        setINP((prevState) => ({
          ...prevState,
          returndate: date // Update the 'work' property with the selected date
        }));
      };
    
    const [getassigndata, setUserdata] = useState([]);
    console.log(getassigndata);

   const {updata, setUPdata} = useContext(updatedata)

    const navigate = useNavigate("");

    const [inpval, setINP] = useState({
        name: "",
        designation: "",
        branch: "",
        assettype: "",
        // issueddate: "",
        assetcode: "",
        anonymity: "",
        remarks: "",
        returndate: ""
    })

    const setdata = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        setINP((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    }


    const { id } = useParams("");
    console.log(id);



    const getdata = async () => {

        const res = await fetch(`${apiUrl}/viewassets/${id}`, {
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
            setINP(data[0])
            console.log("get data");

        }
    }

    useEffect(() => {
        getdata();
    }, []);


    const updateuser = async(e)=>{
        e.preventDefault();

        const {name,designation,branch,assettype,brandname,assetcode,anonymity,remarks,returndate} = inpval;

        const res2 = await fetch(`${apiUrl}/updatassignassets/${id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                name,designation,branch,assettype,brandname,assetcode,anonymity,remarks,returndate
            })
        });

        const data2 = await res2.json();
        console.log(data2);

        if(res2.status === 422 || !data2){
            alert("fill the data");
        }else{
            navigate("/assignassets");
            // setUPdata(data2);
        }

    }

    return (
    <div>
    <Navbaar />
    <SideBar>
      <div className="container">
        <NavLink to="/assignassets">Back</NavLink>
        <form className="mt-4">
          <div className="row">
            <div className="mb-3 col-lg-3 col-md-6 col-12">
              <label htmlFor="remarks" className="form-label">
                Remarks
              </label>
              <input
                type="text"
                name="remarks"
                value={inpval.remarks}
                onChange={setdata}
                className="form-control"
                id="remarks"
              />
            </div>
            <div className="mb-3 col-lg-6 col-md-6 col-12">
                <label htmlFor="exampleInputPassword1" className="form-label">Return Date* </label><br></br>
                <DatePicker
                    selected={inpval.returndate} // Set the selected date value
                    onChange={handleDateChange} // Handle date selection
                    name="returndate"
                    className="form-select form-control"
                    id="exampleInputPassword1"
                    placeholderText="Select a date" // Placeholder text when no date is selected
                />
            </div>
            
          </div><br></br>

          <button type="submit" onClick={updateuser} class="btn btn-primary">Submit</button>
      
        </form>
      </div>
    </SideBar>
    </div>
    )
}
