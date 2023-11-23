import React, { useState, useEffect, useContext } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { NavLink, Navigate } from "react-router-dom";
import { adddata, deldata } from "./context/ContextProvider";
import { updatedata } from "./context/ContextProvider";
import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import laptapasset from "../../../images/Laptap-asset.avif";
import tshirts from "../../../images/assets T-Shirts.avif";
import shirts from "../../../images/shirt-asset.jpg";
const label = { inputProps: { "aria-label": "Switch demo" } };
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.blue,

    color: theme.palette.common.white,
  },

  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },

  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
// import axios from 'axios'
// import SideBar from "../Sidebar/SideBar";

// import Navbaar from '../Navbar/Navbaar';

const Addassets = () => {
  // var apiUrl = 'https://demo.teksacademy.com:3000';
  // var apiUrl = "http://localhost:3003";

  // start

  const [getuserdata, setUserdata] = useState([]);
  console.log(getuserdata);

  const { udata, setUdata } = useContext(adddata);

  const { updata, setUPdata } = useContext(updatedata);

  const { dltdata, setDLTdata } = useContext(deldata);

  // const getdata = async () => {
  //     const response = await axios.get('http://localhost:3003/getusers');
  //     setUserdata(response.data);
  //     console.log('get data');
  //   };

  //   useEffect(() => {
  //     getdata();
  //   }, []);
  const getdata = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/getusers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error");
    } else {
      setUserdata(data);
      console.log("get data");
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const deleteuser = async (id) => {
    const res2 = await fetch(
      `${process.env.REACT_APP_API_URL}/deleteuser/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const deletedata = await res2.json();
    console.log(deletedata);

    if (res2.status === 422 || !deletedata) {
      console.log("error");
    } else {
      console.log("user deleted");
      // setDLTdata(deletedata)
      getdata();
    }
  };

  // new
  const getLaptopCount = () => {
    let laptopCount = 0;
    for (const element of getuserdata) {
      if (element["assettype"] === "laptop") {
        laptopCount += parseInt(element["anonymity"], 10) || 0;
      }
    }
    console.log("Laptop Count:", laptopCount); // Log the laptopCount value to check
    return laptopCount;
  };

  const getTshirtCount = () => {
    let tshirtCount = 0;
    for (const element of getuserdata) {
      if (element["assettype"] === "t-shirt") {
        tshirtCount += parseInt(element["anonymity"], 10) || 0;
      }
    }
    return tshirtCount;
  };

  const getShirtCount = () => {
    let shirtCount = 0;
    for (const element of getuserdata) {
      if (element["assettype"] === "shirt") {
        shirtCount += parseInt(element["anonymity"], 10) || 0;
      }
    }
    return shirtCount;
  };

  const getChargerCount = () => {
    let chargerCount = 0;
    for (const element of getuserdata) {
      if (element["assettype"] === "charger") {
        chargerCount += parseInt(element["anonymity"], 10) || 0;
      }
    }
    return chargerCount;
  };

  const getMouseCount = () => {
    let mouseCount = 0;
    for (const element of getuserdata) {
      if (element["assettype"] === "mouse") {
        mouseCount += parseInt(element["anonymity"], 10) || 0;
      }
    }
    return mouseCount;
  };

  const getStudentsBags = () => {
    let studentsBag = 0;
    for (const element of getuserdata) {
      if (element["assettype"] === "student bags") {
        studentsBag += parseInt(element["anonymity"], 10) || 0;
      }
    }
    return studentsBag;
  };

  //   const laptopCount = getLaptopCount();
  //   const tshirtCount = getTshirtCount();
  //   const shirtCount = getShirtCount();
  //   const chargerCount = getChargerCount();
  //   const mouseCount = getMouseCount();
  //   const studentsBagCount = getStudentsBags();

  return (
    <>
      {udata ? (
        <>
          <div
            class="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            <strong>{udata.name}</strong> added succesfully!
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        </>
      ) : (
        ""
      )}
      {updata ? (
        <>
          <div
            class="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            <strong>{updata.name}</strong> updated succesfully!
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        </>
      ) : (
        ""
      )}

      {dltdata ? (
        <>
          <div
            class="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            <strong>{dltdata.name}</strong> deleted succesfully!
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        </>
      ) : (
        ""
      )}

      <div className="container">
        <div className="row mt-4"> 
        <div className="col-12 col-md-10 col-lg-10 col-xl-10 ">
        <h4>Add Assets </h4></div>
         <div className="col-12 col-md-2 col-lg-2 col-xl-2"> 
         <NavLink to="/addassetsform" className="btn btn-primary">
                      Add Assets
                    </NavLink>
          </div>
         </div>
        <div className="assets-card row">
          <div className="col-12 col-md-2 col-lg-2 col-xl-2 ">
          

            <Card
              style={{ backgroundColor: "#f3a9b2" }}
              className="rounded rounded-3"
            >
              <p className="pt-3 text-center">
                
                Total Laptops: <strong>{getLaptopCount()}</strong>
              </p>
            </Card> </div>
            <div className="col-12 col-md-2 col-lg-2 col-xl-2 ">
           

            <Card
              style={{ backgroundColor: "#a6ebdc" }}
              className="rounded rounded-3"
            >
              <p className="pt-3 text-center">
              Total Tshirts: <strong>{getTshirtCount()}</strong>
              </p>
            </Card> </div> 
            <div className="col-12 col-md-2 col-lg-2 col-xl-2 ">
            

            <Card
              style={{ backgroundColor: "#b7e9da" }}
              className="rounded rounded-3"
            >
              <p className="pt-3 text-center">
              Total Shirt: <strong>{getShirtCount()}</strong>
              </p>
            </Card> </div>
            <div className="col-12 col-md-2 col-lg-2 col-xl-2 ">
           

            <Card
              style={{ backgroundColor: "#f3a9b2" }}
              className="rounded rounded-3"
            >
              <p className="pt-3 text-center">
              Total Charger: <strong>{getChargerCount()}</strong>
              </p>
            </Card> </div>
            <div className="col-12 col-md-2 col-lg-2 col-xl-2 ">
            

            <Card
              style={{ backgroundColor: "#a6ebdc" }}
              className="rounded rounded-3"
            >
              <p className="pt-3 text-center">
              Total Mouse: <strong>{getMouseCount()}</strong>
              </p>
            </Card> </div>
            <div className="col-12 col-md-2 col-lg-2 col-xl-2 ">
           

            <Card
              style={{ backgroundColor: "#d4eaea" }}
              className="rounded rounded-3"
            >
              <p className="pt-3 text-center">
              Total Bags: <strong>{getStudentsBags()}</strong>
              </p>
            </Card> </div>
            </div>

            {/* <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="100"
                  image={laptapasset}
                  alt="LaptapAsset"
                />
                <CardContent
                  className="p-2"
                  style={{
                    backgroundColor: "#d9e9e9",
                    fontSize: "15px",
                    textAlign: "center",
                  }}
                >
                  Total Laptps: <strong>{getLaptopCount()}</strong>
                </CardContent>
              </CardActionArea>
            </Card> */}
         
          {/* <div className="col-12 col-md-2 col-lg-2 col-xl-2 ">
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="100"
                  image={tshirts}
                  alt="LaptapAsset"
                />
                <CardContent
                  className="p-2"
                  style={{ backgroundColor: "#d9e9e9", fontSize: "15px" }}
                >
                  Total Tshirts:<strong>{getTshirtCount()}</strong>
                </CardContent>
              </CardActionArea>
            </Card>
          </div> */}
          {/* <div className="col-12 col-md-2 col-lg-2 col-xl-2 ">
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="100"
                  image={shirts}
                  alt="Shirts"
                />
                <CardContent
                  className="p-2"
                  style={{ backgroundColor: "#d9e9e9", fontSize: "15px" }}
                >
                  Total shirt: <strong>{getShirtCount()}</strong>
                </CardContent>
              </CardActionArea>
            </Card>
          </div> */}
          {/* <div className="col-12 col-md-2 col-lg-2 col-xl-2 ">
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="100"
                  image="https://img.freepik.com/premium-vector/laptop-with-charger_389832-889.jpg?w=740"
                  alt="Chargers"
                />
                <CardContent
                  className="p-2"
                  style={{ backgroundColor: "#d9e9e9", fontSize: "15px" }}
                >
                  Total charger: <strong>{getChargerCount()}</strong>
                </CardContent>
              </CardActionArea>
            </Card>
          </div> */}
       
        <div className="col-lg-12">
          <div className="row">
            <div className="col-lg-3">
              <div className=" mb-2">
                {/* <NavLink to="/addassetsform" className="btn btn-primary">
                      Add Assets
                    </NavLink> */}
                <br></br>
                {/* <span>Rows : <strong>{getuserdata.length}</strong></span><br></br>
                                    <span>Total quantity: <strong>{getLaptopCount() + getTshirtCount() + getShirtCount() + getChargerCount() + getMouseCount() + getStudentsBags()}</strong></span><br></br> */}
              </div>
            </div>
            {/* <div className="col-lg-3">
                  <div className="mt-2 mb-2">
                    <span>
                      Total laptops: <strong>{getLaptopCount()}</strong>
                    </span>
                    <br></br>
                    <span>
                      Total t-shirt: <strong>{getTshirtCount()}</strong>
                    </span>
                    <br></br>
                  </div>
                </div>
            <div className="col-lg-3">
                  <div className="mt-2 mb-2">
                    <span>
                      Total shirt: <strong>{getShirtCount()}</strong>
                    </span>
                    <br></br>
                    <span>
                      Total charger: <strong>{getChargerCount()}</strong>
                    </span>
                    <br></br>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="mt-2 mb-2">
                    <span>
                      Total mouse: <strong>{getMouseCount()}</strong>
                    </span>
                    <br></br>
                    <span>
                      Total bags: <strong>{getStudentsBags()}</strong>
                    </span>
                    <br></br>
                  </div>
                </div> */}
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

          {/* <NavLink to="/addassetsform" className="btn btn-primary">Add Record</NavLink><br></br> */}
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table" borderAxis="both">
                <TableHead>
                  <TableRow>
                    <StyledTableCell className="table-cell-heading ">
                      ID
                    </StyledTableCell>
                    <StyledTableCell className="table-cell-heading">
                      Vender Name
                    </StyledTableCell>
                    <StyledTableCell className="table-cell-heading">
                      
                      Asset Type
                    </StyledTableCell>
                    <StyledTableCell className="table-cell-heading">
                      
                      Brand Name
                    </StyledTableCell>
                    <StyledTableCell className="table-cell-heading">
                      Asset Code
                    </StyledTableCell>
                    <StyledTableCell className="table-cell-heading">
                      
                      Quantity
                    </StyledTableCell>
                    <StyledTableCell className="table-cell-heading">
                      Status
                    </StyledTableCell>
                    <StyledTableCell className="table-cell-heading">
                      Actions
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getuserdata.map((element, id) => (
                    <React.Fragment key={id}>
                      <StyledTableRow>
                        <StyledTableCell className="Table-cell text-center">
                          {id + 1}
                        </StyledTableCell>
                        {/* <td>{element.name}</td> */}
                        <StyledTableCell className="Table-cell">
                          {element.vendername}
                        </StyledTableCell>
                        {/* <td>{element.designation}</td> */}
                        {/* <td>{element.branch}</td> */}
                        <StyledTableCell className="Table-cell">
                          {element.assettype}
                        </StyledTableCell>
                        <StyledTableCell className="Table-cell">
                          {element.brandname}
                        </StyledTableCell>
                        {/* <td>{element.remarks}</td> */}
                        {/* <td>{element.issueddate}</td> */}
                        <StyledTableCell className="Table-cell">
                          {element.assetcode}
                        </StyledTableCell>
                        <StyledTableCell className="Table-cell">
                          {element.anonymity}
                        </StyledTableCell>
                        <StyledTableCell className="Table-cell">
                          {element.returndate}
                        </StyledTableCell>
                        <StyledTableCell className="Table-cell">
                          <NavLink to={`view/${element.id}`}>
                            <RemoveRedEyeIcon />
                          </NavLink>
                          <NavLink to={`edit/${element.id}`}>
                            <CreateIcon />
                          </NavLink>
                          <DeleteOutlineIcon
                            onClick={() => deleteuser(element.id)}
                            className="text-danger"
                          />
                        </StyledTableCell>
                      </StyledTableRow>
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </div>
      </div>
    </>
  );
};

export default Addassets;
