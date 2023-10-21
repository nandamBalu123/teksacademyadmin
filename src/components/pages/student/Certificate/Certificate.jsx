import React from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CloseIcon from '@mui/icons-material/Close';
import './Certificate.css';

const Certificate = () => {
    // for edit the date
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  return (
    <div  className='container '>
       <div className='certificate mt-2'> 
       <h3 className='mx-3 my-3'> Certificate </h3>
       <div className="row mb-3 px-4 pt-3">

  <div className="col-12 col-md-6 col-lg-10 col-xl-10">
 
    <input
      type="text"
      className="input-field ps-2"
      placeholder="Search Here...."
      autoComplete="off"
      style={{
        height: "45px",
        width: "100%",
        outline: "none",
        borderTop: "none",
        borderBottom: "1.5px solid black",
        background: "none",
        border: "hidden",
        borderRadius: "5px",
      }}
      name="search"
    
    />
   <hr className="w-75" />
   </div>
   
    <div className="col-12 col-md-6 col-lg-2 col-xl-2 "> 
    <Button
      id="demo-positioned-button"
      aria-controls={open ? "demo-positioned-menu" : undefined}
      aria-haspopup="true"
      aria-expanded={open ? "true" : undefined}
      onClick={handleClick}
    >
      <button
        className="btn btn-primary mr-20 ms-2 mb-2"
        style={{ textTransform: "capitalize" }}
      >
        {" "}
        Filter{" "}
      </button>
    </Button>
  
  

  {/* For Filter */}
  {/* <Button
    id="demo-positioned-button"
    aria-controls={open ? "demo-positioned-menu" : undefined}
    aria-haspopup="true"
    aria-expanded={open ? "true" : undefined}
    onClick={handleClick}
  >
    <h6 className="filters" style={{ textTransform: "capitalize" }}>
      {" "}
      Filter{" "}
    </h6>
  </Button> */}

  <Menu
    className="mt-5"
    id="demo-positioned-menu"
    aria-labelledby="demo-positioned-button"
    anchorEl={anchorEl}
    open={open}
    onClose={handleClose}
    anchorOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
  >
    <div className="d-flex justify-content-between"> 
       <MenuItem> Filter</MenuItem>
        <MenuItem> <CloseIcon/> </MenuItem>
       </div>
    <hr />
    <MenuItem>
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
        }}>
       </select>
    </MenuItem>
    <MenuItem>
      <label className="mt-3 me-3"> Branch: </label>
      <select
        className="mt-3"
        id=""
        required
        style={{
          height: "45px",
          paddingLeft: "10px",
          paddingRight: "145px",
          border: "1.5px solid black",
          borderRadius: "5px",
        }}
        name="branch"
       
      >
        <option value="">--select--</option>

        <option value="hitechcity">Hi-tech City</option>
        <option value="dilsukhnagar">dilshukanagar</option>
        <option value="ameerpet">ameerpet</option>
        <option value="gachibowli">gachibowli</option>
      </select>
    </MenuItem>
    <MenuItem className="d-flex justify-content-between"> 
        <button className="save"> Save</button>
        <button className="clear" > Clear</button>
        </MenuItem>
  </Menu>
  </div>
</div>
<div className='w-100'> 
<table> 
  <tr> 
  <th> S.No </th>
<th> Name</th>
<th> Course</th>
<th> Registration ID</th>
<th> Course StartDate</th>
<th> Course EndDate</th>
  </tr>
  <tr> 
    <td data-cell="S.No" >1 </td>
    <td data-cell="name"> Bhavitha </td>
    <td data-cell="course"> React JS</td>
    <td data-cell="registration">3214  </td>
    <td data-cell="startdate">20-11-2023 </td>
    <td data-cell="enddate"> 30-11-2023</td>
  </tr>
  <tr> 
    <td data-cell="S.No" >1 </td>
    <td data-cell="name"> Bhavitha </td>
    <td data-cell="course"> React JS</td>
    <td data-cell="registration">3214  </td>
    <td data-cell="startdate">20-11-2023 </td>
    <td data-cell="enddate"> 30-11-2023</td>
  </tr>
  <tr> 
    <td data-cell="S.No" >1 </td>
    <td data-cell="name"> Bhavitha </td>
    <td data-cell="course"> React JS</td>
    <td data-cell="registration">3214  </td>
    <td data-cell="startdate">20-11-2023 </td>
    <td data-cell="enddate"> 30-11-2023</td>
  </tr>
 
  

</table>
</div>

       <Paper sx={{ width: '100%', overflow: 'hidden' }} className='my-4'>
      <TableContainer sx={{ maxHeight: 440 }} >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow  >
           <TableCell className='bg-primary text-light fs-6 border border 1'> S. No</TableCell>
           <TableCell className='bg-primary text-light fs-6 border border 1'> Name</TableCell>
           <TableCell className='bg-primary text-light fs-6 border border 1'> Course</TableCell>
           <TableCell className='bg-primary text-light fs-6 border border 1'> Registration ID</TableCell>
           <TableCell className='bg-primary text-light fs-6 border border 1'> Course StartDate</TableCell>
           <TableCell className='bg-primary text-light fs-6 border border 1'>Course EndDate</TableCell>
         
           <TableCell className='bg-primary text-light fs-6'> Certificate Issue</TableCell>
         
            </TableRow>
          </TableHead>
          <TableBody>
            
                  <TableRow >
                  <TableCell className='border border 1 '> 1</TableCell>
                  <TableCell className='border border 1'> bhavitha</TableCell>
                  <TableCell className='border border 1 '> React Developer</TableCell>
                  <TableCell className='border border 1 '> 12345</TableCell>
                  <TableCell className='border border 1 '> 21-10-2023</TableCell>
                  <TableCell className='border border 1 '>22-10-2023
                 
                  {/* <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
      <ModeEditIcon/>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem > <input 
        type='date'
        name='enddate'
        className='form-control'/></MenuItem>
        <MenuItem> <button className='btn btn-primary end'> Change</button></MenuItem>
        
      </Menu> */}
      
      </TableCell>
                  <TableCell className='border border 1  text-center fs-6'> <button className='btn btn-primary center'> Apply</button></TableCell>
                  
                  </TableRow>
            
          </TableBody>
        </Table>
      </TableContainer>
      
    </Paper> 
       </div>
      
    </div>
  )
}

export default Certificate
