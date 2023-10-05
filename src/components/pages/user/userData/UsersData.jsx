
import React, { useEffect, useState } from "react";
import { useUsersContext } from "../../../../hooks/useUsersContext";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import './UsersData.css';

import { Button,Dialog, DialogTitle, DialogContent , DialogContentText, DialogActions  } from "@mui/material";
const UsersData = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const { users, dispatch } = useUsersContext();
  const { user } = useAuthContext();
  

  const deleteuser = async (id) => {
    const res2 = await fetch(`http://localhost:3030/deleteasset/${id}`, {
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
      // getdata();
    }
  };
  // const handleDelete = async () => {
  //   if (!user) {
  //     return;
  //   }
  //   const response = await fetch("http://localhost:3030/userdata/delete" + user._id, {
  //     method: "DELETE",
  //     headers: {
  //       Authorization: `Bearer ${user.token}`,
  //     },
  //   });
  //   const json = await response.json();

  //   if (response.ok) {
  //     dispatch({ type: "DELETE_USER", payload: json });
  //   }
  // };
  //   useEffect(() => {
  //     const fetchUsers = async () => {
  //       const response = await fetch("/userdata/users", {
  //         headers: { Authorization: `Bearer ${user.token}` },
  //       });
  //       const json = await response.json();

  const [userData, setUserData] = useState([]);
  const [error, setError] = useState(null);
  // const [open, setOpen]= useState(false);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("http://localhost:3030/userdata");
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //     console.log(userData)
  //       }
  //       const data = await response.json();
  //       setUserData(data.Result);
  //     } catch (err) {
  //       setError(err);
  //     }
  //   };

  //   fetchData();
  // }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const handleedit = () => {
    navigate("/edit");
  };
  const handleview = () => {
    navigate("/userview");
  };
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    // style={{ margin: "30px 0px 0px 20px" }}
    <div className="container-fluid">
      <h2 className="ms-3">Users List</h2>
      <div className="mb-2"> 
      <input
            type="text"
            placeholder='Search Here......'
            style={{
              height: "55px",
              width: "90%",
              padding: "10px",
              margin:"3px",
              border: "1.5px solid black",
              borderRadius: "5px",
            }}
            
          />  
          
          
             {/* For Filter */}
             <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        
      >
        <h6 className="filters" style={{textTransform: "capitalize"}}> Filter </h6>
   
      </Button>

      <Menu
      className="mt-5"
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem> <h6 > Filter</h6></MenuItem><hr/>
        <MenuItem > 
        <label className="mt-3 me-3">Profile:</label>
        <select
        className="mt-3"
                    id=""
                    
                    required
                    style={{
                      height: "45px",
                      
                      paddingRight: "145px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                   
                  >
                    <option value="">Manager</option>
                   
                  </select>
        
        </MenuItem>
        <MenuItem > 
        <label className="mt-3 me-3"> Branch: </label> 
        <select
        className="mt-3"
                    id=""
                  
                    required
                    style={{
                      height: "45px",
                      paddingLeft: "10px",
                      paddingRight: "115px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                   
                  >
                    <option value="">Hi-tech City</option>
                   
                  </select>
        </MenuItem>
    
      </Menu>

          {/* <button className="Filter" onAuxClick={()=>setOpen(true)}> </button> */}
          {/* <button  className="Filter"  onClick={()=> setOpen(true)}> Fillter</button>
          <Dialog  
         
          open={open}
          onClose={()=>setOpen(false)}
          aria-labelledby="dialog-title"
           aria-describedby="dialogue-description" > 
            <DialogTitle> Filter Users</DialogTitle>
            <DialogContent> 
              <DialogContentText id='dialog description'>
                 
              
              <label htmlFor="">Enter Date</label>
              <input type='date' className='col-12 felids ' 
              id=""
              required
            style={{
              height: "45px",
              
              padding: "15px",
              border: "1.5px solid black",
              borderRadius: "5px",
            }}
          />
          <label htmlFor="" >Filter Branch</label>
          <select
            className="col-12  felids"
            id=""
          
            required
            style={{
              height: "45px",
              
               border: "1.5px solid black",
              borderRadius: "5px",
            }}
          >
            <option value="">--select--</option>
            <option value="Hitech"> Hitech</option>
          </select>
          <label htmlFor="">Lead Source</label>
          <select
            className="col-12 felids "
            id=""
            placeholder='Lead Source'
            required
            style={{
              height: "45px",
             
              border: "1.5px solid black",
              borderRadius: "5px",
            }}
          >
            <option value="">--select--</option>
            <option value="Walkin"> Walkin</option>
          </select>
          <label htmlFor="">Mode of Traning</label>
          <select
            className="col-12 felids"
            id=""
            placeholder='Mode of Traning'
            required
            style={{
              height: "45px",
              
              border: "1.5px solid black",
              borderRadius: "5px",
            }}
          >
            <option value="">--select--</option>
            <option value="online"> Online</option>
            <option value="offline"> Offline</option>
          </select>
            
              
               </DialogContentText>
            </DialogContent>
            <DialogActions> 
              <Button onClick={()=>setOpen(false)}>Cancel</Button>
              <Button autoFocus onClick={()=> setOpen}>Submit</Button>
            </DialogActions>
          </Dialog> */}
          
      </div>
      <div> 
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1000 }} aria-label="customized table" >
          <TableHead  >
            <TableRow >
           <StyledTableCell className=' bg-primary fs-6'>Name</StyledTableCell>
              <StyledTableCell className=' bg-primary fs-6'  align="center">Email</StyledTableCell>
              <StyledTableCell className='  bg-primary fs-6' align="center">Phone No</StyledTableCell>
              <StyledTableCell className='bg-primary fs-6 '  align="center">Designation</StyledTableCell>
              <StyledTableCell className='bg-primary fs-6 '  align="center">Department</StyledTableCell>
              <StyledTableCell className='bg-primary fs-6' align="center">Report To</StyledTableCell>
              <StyledTableCell className='bg-primary fs-6 ' align="center">Profile</StyledTableCell>
              <StyledTableCell className='bg-primary fs-6 ' align="center">Branch</StyledTableCell>
              <StyledTableCell className='bg-primary fs-6' align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
      <TableBody>
          
            
              {/* <StyledTableRow> 
              <StyledTableCell align="center">Bhavitha</StyledTableCell>
              <StyledTableCell align="center">bhavitha@gmail.com</StyledTableCell>
              <StyledTableCell align="center"> 0123412344</StyledTableCell>
              <StyledTableCell align="center">Developer</StyledTableCell>
              <StyledTableCell align="center">IT</StyledTableCell>
              <StyledTableCell align="center">Krishna</StyledTableCell>
              <StyledTableCell align="center">profile</StyledTableCell>
              <StyledTableCell align="center"> Hi-tech city</StyledTableCell>
              <StyledTableCell align="center">
                 <RemoveRedEyeIcon/>
                <ModeEditIcon/>
                <DeleteIcon/>
                 </StyledTableCell>
              </StyledTableRow>  */}
               {userData && userData.map((user)=>(  
                <StyledTableRow> 
                <StyledTableCell align="center">{user.fullname}</StyledTableCell>
                <StyledTableCell align="center">{user.email}</StyledTableCell>
                <StyledTableCell align="center"> {user.phonenumber}</StyledTableCell>
                <StyledTableCell align="center">{user.designation}</StyledTableCell>
                <StyledTableCell align="center">{user.department}</StyledTableCell>
                <StyledTableCell align="center">{user.reportto}</StyledTableCell>
                <StyledTableCell align="center">{user.profile}</StyledTableCell>
                <StyledTableCell align="center"> {user.branch}</StyledTableCell>
                <StyledTableCell align="center"> 
                <RemoveRedEyeIcon onClick={handleview}/>
                <ModeEditIcon onClick={handleedit}/>
                <DeleteIcon onClick={() => deleteuser(user.id)}/> </StyledTableCell>
                </StyledTableRow>
            ))}
                   </TableBody>
        </Table>
      </TableContainer>
      </div>
          
      {/* <table className="table">
       
        <tbody>
    
          {userData &&
            userData.map((user) => (
              <tr>
                
                <td>{user.fullname}</td>
                <td>{user.email}</td>
                <td>{user.phonenumber}</td>
                <td>{user.designation}</td>
                <td>{user.department}</td>
                <td>{user.reportto}</td>
                <td>{user.profile}</td>
                <td>{user.branch}</td>
                <td>
                <button onClick={handleview}>View</button>
              <button onClick={handleedit}>Edit</button>

              <button onClick={() => deleteuser(user.id)}>Delete</button>
              </td>
              </tr>
            ))}
        </tbody>
      </table> */}
      {/* {userData &&
      userData.map((user) => (
        <tr>
        <td>{user.fullname}</td>
          <td>{user.email}</td>
          <td>{user.phonenumber}</td>
          <td>{user.designation}</td>
          <td>{user.department}</td>
          <td>{user.reportto}</td>
          <td>{user.profile}</td>
          <td>{user.branch}</td>
          <td>
          <button onClick={handleview}>View</button>
        <button onClick={handleedit}>Edit</button>

        <button onClick={() => deleteuser(user.id)}>Delete</button>
        </td>
        </tr>
      ))} */}
 
    </div>
  );
};

export default UsersData;
