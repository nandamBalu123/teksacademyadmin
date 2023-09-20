import React, { useState, useEffect, useContext } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { NavLink, Navigate } from "react-router-dom";
import { adddata, deldata } from "./context/ContextProvider";
import { updatedata } from "./context/ContextProvider";
// import { FaArrowUp } from "react-icons/fa";
import Inventoryhome from "./Inventoryhome";
// import axios from 'axios'
// import SideBar from '../Sidebar/SideBar';

// import Navbaar from '../Navbar/Navbaar';
const Assignassets = () => {
  var apiUrl = "https://demo.teksacademy.com:3000";
  // var apiUrl = 'http://localhost:3003/';

  const [getassigndata, setUserdata] = useState([]);
  console.log(getassigndata);

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
    const res = await fetch(`${apiUrl}/getassets`, {
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
    const res2 = await fetch(`${apiUrl}/deleteasset/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
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
  };
  // ceo
  const getLaptopCount = () => {
    let laptopCount = 0;
    for (const element of getassigndata) {
      if (element["assettype"] === "laptop") {
        laptopCount += parseInt(element["anonymity"], 10) || 0;
      }
    }
    console.log("Laptop Count:", laptopCount); // Log the laptopCount value to check
    return laptopCount;
  };

  const getTshirtCount = () => {
    let tshirtCount = 0;
    for (const element of getassigndata) {
      if (element["assettype"] === "t-shirt") {
        tshirtCount += parseInt(element["anonymity"], 10) || 0;
      }
    }
    return tshirtCount;
  };

  const getShirtCount = () => {
    let shirtCount = 0;
    for (const element of getassigndata) {
      if (element["assettype"] === "shirt") {
        shirtCount += parseInt(element["anonymity"], 10) || 0;
      }
    }
    return shirtCount;
  };

  const getChargerCount = () => {
    let chargerCount = 0;
    for (const element of getassigndata) {
      if (element["assettype"] === "charger") {
        chargerCount += parseInt(element["anonymity"], 10) || 0;
      }
    }
    return chargerCount;
  };

  const getMouseCount = () => {
    let mouseCount = 0;
    for (const element of getassigndata) {
      if (element["assettype"] === "mouse") {
        mouseCount += parseInt(element["anonymity"], 10) || 0;
      }
    }
    return mouseCount;
  };

  const getStudentsBags = () => {
    let studentsBag = 0;
    for (const element of getassigndata) {
      if (element["assettype"] === "student bags") {
        studentsBag += parseInt(element["anonymity"], 10) || 0;
      }
    }
    return studentsBag;
  };

  //   hitech city

  const hcgetLaptopCount = () => {
    let laptopCount = 0;

    for (const element of getassigndata) {
      if (element["branch"] === "hi-tech city") {
        if (element["assettype"] === "laptop") {
          laptopCount += parseInt(element["anonymity"], 10) || 0;
        }
      }
    }
    console.log("Laptop Count:", laptopCount); // Log the laptopCount value to check
    return laptopCount;
  };

  const hcgetTshirtCount = () => {
    let tshirtCount = 0;
    for (const element of getassigndata) {
      if (element["branch"] === "hi-tech city") {
        if (element["assettype"] === "t-shirt") {
          tshirtCount += parseInt(element["anonymity"], 10) || 0;
        }
      }
    }
    return tshirtCount;
  };

  const hcgetShirtCount = () => {
    let shirtCount = 0;
    for (const element of getassigndata) {
      if (element["branch"] === "hi-tech city") {
        if (element["assettype"] === "shirt") {
          shirtCount += parseInt(element["anonymity"], 10) || 0;
        }
      }
    }
    return shirtCount;
  };

  const hcgetChargerCount = () => {
    let chargerCount = 0;
    for (const element of getassigndata) {
      if (element["branch"] === "hi-tech city") {
        if (element["assettype"] === "charger") {
          chargerCount += parseInt(element["anonymity"], 10) || 0;
        }
      }
    }
    return chargerCount;
  };

  const hcgetMouseCount = () => {
    let mouseCount = 0;
    for (const element of getassigndata) {
      if (element["branch"] === "hi-tech city") {
        if (element["assettype"] === "mouse") {
          mouseCount += parseInt(element["anonymity"], 10) || 0;
        }
      }
    }
    return mouseCount;
  };

  const hcgetStudentsBags = () => {
    let studentsBag = 0;
    for (const element of getassigndata) {
      if (element["branch"] === "hi-tech city") {
        if (element["assettype"] === "student bags") {
          studentsBag += parseInt(element["anonymity"], 10) || 0;
        }
      }
    }
    return studentsBag;
  };

  //   hitech city end

  // ammerpet

  const apgetLaptopCount = () => {
    let laptopCount = 0;

    for (const element of getassigndata) {
      if (element["branch"] === "Ameerpet") {
        if (element["assettype"] === "laptop") {
          laptopCount += parseInt(element["anonymity"], 10) || 0;
        }
      }
    }
    console.log("Laptop Count:", laptopCount); // Log the laptopCount value to check
    return laptopCount;
  };

  const apgetTshirtCount = () => {
    let tshirtCount = 0;
    for (const element of getassigndata) {
      if (element["branch"] === "Ameerpet") {
        if (element["assettype"] === "t-shirt") {
          tshirtCount += parseInt(element["anonymity"], 10) || 0;
        }
      }
    }
    return tshirtCount;
  };

  const apgetShirtCount = () => {
    let shirtCount = 0;
    for (const element of getassigndata) {
      if (element["branch"] === "Ameerpet") {
        if (element["assettype"] === "shirt") {
          shirtCount += parseInt(element["anonymity"], 10) || 0;
        }
      }
    }
    return shirtCount;
  };

  const apgetChargerCount = () => {
    let chargerCount = 0;
    for (const element of getassigndata) {
      if (element["branch"] === "Ameerpet") {
        if (element["assettype"] === "charger") {
          chargerCount += parseInt(element["anonymity"], 10) || 0;
        }
      }
    }
    return chargerCount;
  };

  const apgetMouseCount = () => {
    let mouseCount = 0;
    for (const element of getassigndata) {
      if (element["branch"] === "Ameerpet") {
        if (element["assettype"] === "mouse") {
          mouseCount += parseInt(element["anonymity"], 10) || 0;
        }
      }
    }
    return mouseCount;
  };

  const apgetStudentsBags = () => {
    let studentsBag = 0;
    for (const element of getassigndata) {
      if (element["branch"] === "Ameerpet") {
        if (element["assettype"] === "student bags") {
          studentsBag += parseInt(element["anonymity"], 10) || 0;
        }
      }
    }
    return studentsBag;
  };
  // ameerpet end

  // dilsupnager

  const dngetLaptopCount = () => {
    let laptopCount = 0;

    for (const element of getassigndata) {
      if (element["branch"] === "dilsupnagar") {
        if (element["assettype"] === "laptop") {
          laptopCount += parseInt(element["anonymity"], 10) || 0;
        }
      }
    }
    console.log("Laptop Count:", laptopCount); // Log the laptopCount value to check
    return laptopCount;
  };

  const dngetTshirtCount = () => {
    let tshirtCount = 0;
    for (const element of getassigndata) {
      if (element["branch"] === "dilsupnagar") {
        if (element["assettype"] === "t-shirt") {
          tshirtCount += parseInt(element["anonymity"], 10) || 0;
        }
      }
    }
    return tshirtCount;
  };

  const dngetShirtCount = () => {
    let shirtCount = 0;
    for (const element of getassigndata) {
      if (element["branch"] === "dilsupnagar") {
        if (element["assettype"] === "shirt") {
          shirtCount += parseInt(element["anonymity"], 10) || 0;
        }
      }
    }
    return shirtCount;
  };

  const dngetChargerCount = () => {
    let chargerCount = 0;
    for (const element of getassigndata) {
      if (element["branch"] === "dilsupnagar") {
        if (element["assettype"] === "charger") {
          chargerCount += parseInt(element["anonymity"], 10) || 0;
        }
      }
    }
    return chargerCount;
  };

  const dngetMouseCount = () => {
    let mouseCount = 0;
    for (const element of getassigndata) {
      if (element["branch"] === "dilsupnagar") {
        if (element["assettype"] === "mouse") {
          mouseCount += parseInt(element["anonymity"], 10) || 0;
        }
      }
    }
    return mouseCount;
  };

  const dngetStudentsBags = () => {
    let studentsBag = 0;
    for (const element of getassigndata) {
      if (element["branch"] === "dilsupnagar") {
        if (element["assettype"] === "student bags") {
          studentsBag += parseInt(element["anonymity"], 10) || 0;
        }
      }
    }
    return studentsBag;
  };
  //   dilsupnagar end
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

      <div>
        <div className="mt-5">
          <div className="container">
            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-3">
                  <div className="">
                    <NavLink to="/register" className="btn btn-primary">
                      Assign data
                    </NavLink>
                    <br></br>
                    {/* <span>Rows : {getassigndata.length}</span><br></br> */}
                    <span>
                      Total laptops: <strong>{getLaptopCount()}</strong>
                    </span>
                    <br></br>
                    <span>
                      Total t-shirt: <strong>{getTshirtCount()}</strong>
                    </span>
                    <br></br>
                    <span>
                      Total shirt: <strong>{getShirtCount()}</strong>
                    </span>
                    <br></br>
                    <span>
                      Total charger: <strong>{getChargerCount()}</strong>
                    </span>
                    <br></br>
                    <span>
                      Total mouse: <strong>{getMouseCount()}</strong>
                    </span>
                    <br></br>
                    <span>
                      Total bags: <strong>{getStudentsBags()}</strong>
                    </span>
                    <br></br>

                    {/* <span>Total quantity: {getLaptopCount() + getTshirtCount() + getShirtCount() + getChargerCount() + getMouseCount() + getStudentsBags()}</span><br></br> */}
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="mt-2 mb-2">
                    <h4>Hitech City</h4>
                    {/* <span>Rows : {getassigndata.length}</span><br></br> */}
                    <span>
                      Total laptops: <strong>{hcgetLaptopCount()}</strong>
                    </span>
                    <br></br>
                    <span>
                      Total t-shirt: <strong>{hcgetTshirtCount()}</strong>
                    </span>
                    <br></br>
                    <span>
                      Total shirt: <strong>{hcgetShirtCount()}</strong>
                    </span>
                    <br></br>
                    <span>
                      Total charger: <strong>{hcgetChargerCount()}</strong>
                    </span>
                    <br></br>
                    <span>
                      Total mouse: <strong>{hcgetMouseCount()}</strong>
                    </span>
                    <br></br>
                    <span>
                      Total bags: <strong>{hcgetStudentsBags()}</strong>
                    </span>
                    <br></br>

                    {/* <span>Total quantity: {getLaptopCount() + getTshirtCount() + getShirtCount() + getChargerCount() + getMouseCount() + getStudentsBags()}</span><br></br> */}
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="mt-2 mb-2">
                    <h4>Ameerpet</h4>
                    {/* <span>Rows : {getassigndata.length}</span><br></br> */}
                    <span>
                      Total laptops: <strong>{apgetLaptopCount()}</strong>
                    </span>
                    <br></br>
                    <span>
                      Total t-shirt: <strong>{apgetTshirtCount()}</strong>
                    </span>
                    <br></br>
                    <span>
                      Total shirt: <strong>{apgetShirtCount()}</strong>
                    </span>
                    <br></br>
                    <span>
                      Total charger: <strong>{apgetChargerCount()}</strong>
                    </span>
                    <br></br>
                    <span>
                      Total mouse: <strong>{apgetMouseCount()}</strong>
                    </span>
                    <br></br>
                    <span>
                      Total bags: <strong>{apgetStudentsBags()}</strong>
                    </span>
                    <br></br>

                    {/* <span>Total quantity: {getLaptopCount() + getTshirtCount() + getShirtCount() + getChargerCount() + getMouseCount() + getStudentsBags()}</span><br></br> */}
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="mt-2 mb-2">
                    <h4>Dilsukhnagar</h4>
                    {/* <span>Rows : {getassigndata.length}</span><br></br> */}
                    <span>
                      Total laptops: <strong>{dngetLaptopCount()}</strong>
                    </span>
                    <br></br>
                    <span>
                      Total t-shirt: <strong>{dngetTshirtCount()}</strong>
                    </span>
                    <br></br>
                    <span>
                      Total shirt: <strong>{dngetShirtCount()}</strong>
                    </span>
                    <br></br>
                    <span>
                      Total charger: <strong>{dngetChargerCount()}</strong>
                    </span>
                    <br></br>
                    <span>
                      Total mouse: <strong>{dngetMouseCount()}</strong>
                    </span>
                    <br></br>
                    <span>
                      Total bags: <strong>{dngetStudentsBags()}</strong>
                    </span>
                    <br></br>

                    {/* <span>Total quantity: {getLaptopCount() + getTshirtCount() + getShirtCount() + getChargerCount() + getMouseCount() + getStudentsBags()}</span><br></br> */}
                  </div>
                </div>
              </div>
              {/* <div className="add_btn mt-2 mb-2">
                            <NavLink to="/register" className="btn btn-primary">Assign data</NavLink><br></br>
                            <span>Rows : {getassigndata.length}</span><br></br>
                            <span>Total laptops: {getLaptopCount()}</span><br></br>
                            <span>Total t-shirt: {getTshirtCount()}</span><br></br>
                            <span>Total shirt: {getShirtCount()}</span><br></br>
                            <span>Total charger: {getChargerCount()}</span><br></br>
                            <span>Total mouse: {getMouseCount()}</span><br></br>
                            <span>Total bags: {getStudentsBags()}</span><br></br>
                            <hr></hr>
                            <span>Total quantity: {getLaptopCount() + getTshirtCount() + getShirtCount() + getChargerCount() + getMouseCount() + getStudentsBags()}</span><br></br>
                            
                        </div> */}

              <table class="table col-12">
                <thead>
                  <tr className="table-dark">
                    <th scope="col">id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Vender Name</th>
                    {/* <th scope="col">Designation</th> */}
                    <th scope="col">Branch</th>
                    <th scope="col">Asset Type</th>
                    <th scope="col">Brand Name</th>
                    {/* <th scope="col">Remarks</th> */}
                    <th scope="col">Asset Code</th>
                    <th scope="col">Issued Date</th>
                    <th scope="col">Quantity</th>

                    <th scope="col"></th>
                  </tr>
                </thead>

                <tbody>
                  {getassigndata.map((element, id) => (
                    <React.Fragment key={id}>
                      <tr>
                        <th scope="row">{id + 1}</th>
                        <td>{element.name}</td>
                        <td>{element.vendername}</td>
                        {/* <td>{element.designation}</td> */}
                        <td>{element.branch}</td>
                        <td>{element.assettype}</td>
                        <td>{element.brandname}</td>
                        {/* <td>{element.remarks}</td> */}
                        <td>{element.assetcode}</td>
                        <td>{element.issueddate}</td>
                        <td>{element.anonymity}</td>

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
                          <NavLink to={`returnassets/${element.id}`}>
                            <button className="btn btn-primary">
                              {/* <FaArrowUp /> */}
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
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Assignassets;
