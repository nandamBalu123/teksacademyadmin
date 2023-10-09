import React from "react";
import  { useState } from 'react';
import TextField from '@mui/material/TextField';
import './Addtofee.css';
const Addtofee =()=>{ 
    const [selectedOption, setSelectedOption] = useState('option1');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

    return(
        <> 
        <div className="addfee"> 
        <div className="adding"> <h4> Add Fee Details</h4> <hr/>
        <div className="d-flex justify-content-around pt-5">  
        <TextField id="outlined-basic" label="Name" variant="outlined"  className="textfield"/>
        <TextField id="outlined-basic" label="Email" variant="outlined" className="textfield" />
        <TextField id="outlined-basic" label="Contact" variant="outlined" className="textfield"  />
        <TextField id="outlined-basic" label="Course" variant="outlined" className="textfield"/>
        </div>
        <div className="d-flex justify-content-around pt-5">  
        <TextField
  id="outlined-basic"
  label="Course date"
  variant="outlined"
  className="textfield"
  type="date"
  InputLabelProps={{
    shrink: true, // This will make the label float when there is a value
  }}
  InputProps={{
    style: {
      // Hide the placeholder text
      textOverflow: 'clip',
      padding: '0', // Adjust padding as needed
      '&::-webkit-calendar-picker-indicator': {
        display: 'none', // Hide the calendar icon in Chrome
      },
    },
  }}
/>
        {/* <TextField id="outlined-basic"  label=" Course date" variant="outlined"  className="textfield" type="date"/> */}
        <TextField id="outlined-basic" label="Total Amount" variant="outlined" className="textfield" />
        <TextField id="outlined-basic" label="Paid AMount" variant="outlined" className="textfield"  />
        <TextField id="outlined-basic" label="Due Amount" variant="outlined" className="textfield"/>
        </div>
        <div className="d-flex justify-content-around pt-5">  
        <TextField id="outlined-basic" label="No. of Installments" variant="outlined"  className="textfield"/>
        <p>Due Date Type</p>
        <label>
        <input
          type="radio"
          name="fixed"
          value="fixed"
          checked={selectedOption === 'option1'}
          onChange={handleOptionChange}
        />
       Fixed
      </label>

      <label>
        <input
          type="radio"
          name="customized"
          value="customized"
          checked={selectedOption === 'option2'}
          onChange={handleOptionChange}
        />
        Customized
      </label>

      
        </div>
        </div> </div>
        </>
    )
}
export default Addtofee;