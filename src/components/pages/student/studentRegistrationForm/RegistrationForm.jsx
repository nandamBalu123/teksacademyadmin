import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
// import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import "./RegistrationForm.css";
// import { blue } from "@mui/material/colors";

export default function RegistrationForm() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className="main-container">
      <div className="main-sub-container">
        <Typography fontSize={35}>Registration form</Typography>

        <Stepper activeStep={activeStep} orientation="vertical">
          {/* -----step 1--- */}
          <Step>
            <StepLabel>
              <Typography fontSize={25}>Basic Details</Typography>
            </StepLabel>
            <StepContent>
              <form>
                <div className="row ">
                  <label className="col-12 col-md-2">Name  <span className="text-danger">*</span>&nbsp; :</label>
                  <input
                    type="text"
                    className="col-9 col-md-5"
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                  />
                </div><br/>
                <div className="row ">
                  <label className="col-12 col-md-2">Email <span className="text-danger"> *</span>&nbsp; :</label>
                  <input
                    type="text"
                    className="col-9 col-md-5"
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                  />
                </div><br/>
                <div className="row ">
                  <label className="col-12 col-md-2">Mobile Number<span className="text-danger"> *</span>&nbsp;:</label>
                  <input
                    type="text"
                    className="col-9 col-md-5"
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                  />
                </div><br/>
              </form>

              <Box sx={{ mb: 2, mt: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {/* {index === steps.length - 1 ? "Finish" : "Continue"} */}
                    Continue
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
          {/* -----step 2--- */}
          <Step>
            <StepLabel>
              <Typography fontSize={25}>Student Details</Typography>
            </StepLabel>
            <StepContent>
              <form>
                <div className="row ">
                  <label className="col-12 col-md-2">Parent's Name <span className="text-danger"> *</span>&nbsp;:</label>
                  <input
                    type="text"
                    className="col-9 col-md-5"
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                  />
                </div><br/>
                <div className="row ">
                  <label className="col-12 col-md-2">Birth Date <span className="text-danger"> *</span>&nbsp;:</label>
                  <input
                    type="date"
                    className="col-9 col-md-5"
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                  />
                </div><br/>
                <div className="row ">
                  <label className="col-12 col-md-2">Gender <span className="text-danger"> *</span>&nbsp;:</label>&nbsp;&nbsp;&nbsp;&nbsp;

                  <select
                    className="col-9 col-md-5"
                    id=""
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                  >
                    <option value="">--select--</option>
                    <option value="btech">Female </option>
                    <option value="degree">Male</option>
                    <option value="mca"> Others</option>
                  </select>
                </div><br/>
                <div className="row ">
                  <label className="col-12 col-md-2">Marital Status <span className="text-danger"> *</span>&nbsp; :</label>&nbsp;&nbsp;&nbsp;&nbsp;

                  <select
                    className="col-9 col-md-5"
                    id=""
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                  >
                    <option value="">--select--</option>
                    <option value="btech">Single</option>
                    <option value="degree">Marriage</option>
                  </select>
                </div><br/>
                <div className="row ">
                  <label className="col-12 col-md-2">
                    College / School / Company <span className="text-danger"> *</span>&nbsp; :
                  </label>
                  <input
                    type="text"
                    className="col-9 col-md-5"
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                  />
                </div><br/>
              </form>
              <Box sx={{ mb: 2, mt: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {/* {index === steps.length - 1 ? "Finish" : "Continue"} */}
                    Continue
                  </Button>
                  <Button
                    variant="contained"
                    // disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
          {/* -----step 3--- */}

          <Step>
            <StepLabel>
              <Typography fontSize={25}>Student Contact Details</Typography>
            </StepLabel>
            <StepContent>
              <form>
              <div className="row ">
                  <label className="col-12 col-md-2">Country <span className="text-danger"> *</span>&nbsp;:</label>&nbsp;&nbsp;&nbsp;&nbsp;

                  <select
                    className="col-9 col-md-5"
                    id=""
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                  >
                    <option value="">--select--</option>
                    <option value="btech">India </option>
                    
                  </select>
                </div><br/>
                <div className="row ">
                  <label className="col-12 col-md-2">State<span className="text-danger"> *</span>&nbsp;:</label>&nbsp;&nbsp;&nbsp;&nbsp;

                  <select
                    className="col-9 col-md-5"
                    id=""
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                  >
                    <option value="">--select--</option>
                    <option value="btech">Andhra </option>
                    
                  </select>
                </div><br/>
                <div className="row ">
                  <label className="col-12 col-md-2">Area<span className="text-danger"> *</span>&nbsp;:</label>&nbsp;&nbsp;&nbsp;&nbsp;

                  <select
                    className="col-9 col-md-5"
                    id=""
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                  >
                    <option value="">--select--</option>
                    <option value="btech">Madhapur</option>
                    
                  </select>
                </div><br/>
              
                
                <div className="row ">
                  <label className="col-12 col-md-2">Native Place  <span className="text-danger"> *</span>&nbsp;:</label>
                  <input
                    type="text"
                    className="col-9 col-md-5"
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                  />
                </div><br/>
                <div className="row ">
                  <label className="col-12 col-md-2">Zip Code <span className="text-danger"> *</span>&nbsp; :</label>
                  <input
                    type="text"
                    className="col-9 col-md-5"
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                  />
                </div><br/>
                <div className="row ">
                  <label className="col-12 col-md-2"> WhatsApp Number <span className="text-danger"> *</span>&nbsp;:</label>
                  <input
                    type="text"
                    className="col-9 col-md-5"
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                  />
                </div><br/>
              </form>
              <Box sx={{ mb: 2, mt: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {/* {index === steps.length - 1 ? "Finish" : "Continue"} */}
                    Continue
                  </Button>
                  <Button
                    variant="contained"
                    // disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
          {/* -----step 4--- */}
          <Step>
            <StepLabel>
              <Typography fontSize={25}>Education Details</Typography>
            </StepLabel>

            <StepContent>
              <form>
                <div className="row ">
                  <label className="col-12 col-md-2">Education Type <span className="text-danger"> *</span>&nbsp;:</label>&nbsp;&nbsp;&nbsp;&nbsp;

                  <select
                    className="col-9 col-md-5"
                    id="educationtype"
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                  >
                    <option value="">--select--</option>
                    <option value="btech">B.Tech </option>
                    <option value="degree">Degree</option>
                    <option value="mca"> MCA</option>
                    <option value="ssc"> SSC</option>
                    <option value="other">others</option>
                  </select>
                </div><br/>
                <div className="row ">
                  <label className="col-12 col-md-2">Marks<span className="text-danger"> *</span>&nbsp;:</label>
                  <input
                    type="text"
                    className="col-9 col-md-5"
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                  />
                </div><br/>
                <div className="row ">
                  <label className="col-12 col-md-2">Academic Year<span className="text-danger"> *</span>&nbsp;:</label>&nbsp;&nbsp;&nbsp;&nbsp;

                  <select
                    className="col-9 col-md-5"
                    id=""
                    
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                  >
                    <option value="">--select--</option>
                    <option value="btech">2023</option>
                    
                  </select>
                </div><br/>
              </form>
              <Box sx={{ mb: 2, mt: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {/* {index === steps.length - 1 ? "Finish" : "Continue"} */}
                    Continue
                  </Button>
                  <Button
                    variant="contained"
                    // disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
          {/* Step 5 */}
          <Step>
            <StepLabel>
            <Typography fontSize={25}>Photo</Typography>
            </StepLabel>

            <StepContent>
              <form>
                <div className="row ">
                  {/* <label className="col-12 col-md-2">Image:</label> */}
                  {/* <input
                    type="image"
                    // className="col-9 col-md-5"
                    // style={{
                    //   height: "35px",
                    //   border: "1.5px solid black",
                    //   borderRadius: "5px",
                    // }}
                  /> */}

                  <input
                    accept=".jpg, .jpeg, .png"
                    type="file"
                    src="your-image-url.jpg"
                    alt="Submit"
                    class="image-input"
                  />
                  {/* <input type="file" accept=".jpg, .jpeg, .png" /> */}

                  <input
                    type="file"
                    id="imageInput"
                    accept=".jpg, .jpeg, .png"
                    style={{ display: "none" }}
                  />
                </div>
              </form>
              <Box sx={{ mb: 2, mt: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {/* {index === steps.length - 1 ? "Finish" : "Continue"} */}
                    Continue
                  </Button>
                  <Button
                    variant="contained"
                    // disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
            {/* -----step 6--- */}
          <Step>

            <StepLabel><Typography fontSize={25}>Enquiry Details:</Typography></StepLabel>
           <StepContent>
            <form> 
            <div className="row ">
                  <label className="col-12 col-md-2">Enquiry Date<span className="text-danger"> *</span>&nbsp;:</label>
                  <input
                    type="date"
                    className="col-9 col-md-5"
                    required
                    style={{
                      
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                  />
                </div><br/>
                <div className="row ">
                  <label className="col-12 col-md-2">
                    Enquiry  Taken   By<span className="text-danger"> *</span>&nbsp;:</label>&nbsp;&nbsp;&nbsp;&nbsp;

                  <select
                    className="col-9 col-md-5"
                    id=""
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                  >
                    <option value="">--select--</option>
                    <option value="btech">Bhavitha</option>
                    
                  </select>
                </div><br/>
              
                
                <div className="row ">
                  <label className="col-12 col-md-2"> 
                  Course   Package<span className="text-danger"> *</span>&nbsp;:</label>&nbsp;&nbsp;&nbsp;&nbsp;

                  <select
                    className="col-9 col-md-5"
                    id=""
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                  >
                    <option value="">--select--</option>
                    <option value="btech">Business Analytics</option>
                    
                  </select>
                </div><br/>
                <div className="row ">
                  <label className="col-12 col-md-2">Courses<span className="text-danger"> *</span>&nbsp;:</label>&nbsp;&nbsp;&nbsp;&nbsp;

                  <select
                    className="col-9 col-md-5"
                    id=""
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                  >
                    <option value="">--select--</option>
                    <option value="btech">Full Stack</option>
                    
                  </select>
                </div><br/>
                <div className="row ">
                  <label className="col-12 col-md-2">Lead Source<span className="text-danger"> *</span>&nbsp;:</label>&nbsp;&nbsp;&nbsp;&nbsp;

                  <select
                    className="col-9 col-md-5"
                    id=""
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                  >
                    <option value="">--select--</option>
                    <option value="btech">Walkin</option>
                    
                  </select>
                </div><br/>
              
                
                
              </form> 
              <Box sx={{ mb: 2, mt: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                    >
                {/* {index === steps.length - 1 ? "Finish" : "Continue"} */}
                Continue
                </Button>
                <Button
                  variant="contained"
                  // disabled={index === 0}
                  onClick={handleBack}
                  sx={{ mt: 1, mr: 1 }}
                >
                  Back
                </Button>
              </div>
            </Box>
                  </StepContent>
            
          </Step>
  {/* -----step 7--- */}
          <Step>
            <StepLabel> <Typography fontSize={25}>Admission Details</Typography></StepLabel>

            <StepContent> 
            <form> 
            <div className="row ">
                  <label className="col-12 col-md-2">Branch<span className="text-danger"> *</span>&nbsp;:</label>&nbsp;&nbsp;&nbsp;&nbsp;

                  <select
                    className="col-9 col-md-5"
                    id=""
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                  >
                    <option value="">--select--</option>
                    <option value="btech">Hitech-city</option>
                    
                  </select>
                </div><br/>
                <div className="row ">
                  <label className="col-12 col-md-2">Mode of Traning<span className="text-danger"> *</span>&nbsp;:</label>&nbsp;&nbsp;&nbsp;&nbsp;

                  <select
                    className="col-9 col-md-5"
                    id=""
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                  >
                    <option value="">--select--</option>
                    <option value="btech">Online</option>
                    
                  </select>
                </div><br/>
                <div className="row ">
                  <label className="col-12 col-md-2">Admission Status<span className="text-danger"> *</span>&nbsp;:</label>&nbsp;&nbsp;&nbsp;&nbsp;

                  <select
                    className="col-9 col-md-5"
                    id=""
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                  >
                    <option value="">--select--</option>
                    <option value="btech">Active</option>
                    
                  </select>
                </div><br/>
                <div className="row ">
                  <label className="col-12 col-md-2">Registration No <span className="text-danger"> *</span>&nbsp;:</label>
                  <input
                    type="text"
                    className="col-9 col-md-5"
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                  />
                </div><br/>
                <div className="row ">
                  <label className="col-12 col-md-2">Admission Date <span className="text-danger"> *</span>&nbsp;:</label>
                  <input
                    type="date"
                    className="col-9 col-md-5"
                    required

                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                  />
                </div><br/>
                <div className="row ">
                  <label className="col-12 col-md-2">Validity Start Date <span className="text-danger"> *</span>&nbsp;:</label>
                  <input
                    type="date"
                    className="col-9 col-md-5"
                    required
              
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                  />
                </div><br/>
                <div className="row ">
                  <label className="col-12 col-md-2">Validity End Date <span className="text-danger"> *</span>&nbsp;:</label>
                  <input
                    type="date"
                    className="col-9 col-md-5"
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                  />
                </div><br/>
                
              </form> 
              <Box sx={{ mb: 2, mt: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                    >
                {/* {index === steps.length - 1 ? "Finish" : "Continue"} */}
                Continue
                </Button>
                <Button
                  variant="contained"
                  // disabled={index === 0}
                  onClick={handleBack}
                  sx={{ mt: 1, mr: 1 }}
                >
                  Back
                </Button>
              </div>
            </Box>
            </StepContent>
          </Step>
            {/* -----step 8--- */}
          <Step>
            <StepLabel> <Typography fontSize={25}>Fee Details</Typography> </StepLabel>

            <StepContent> 
           <form>
           <div className="row ">
                  <label className="col-12 col-md-2">Fee Type <span className="text-danger"> *</span>&nbsp;:</label>&nbsp;&nbsp;&nbsp;&nbsp;

                  <select
                    className="col-9 col-md-5"
                    id=""
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                  >
                    <option value="">--select--</option>
                    <option value="btech">Course fee </option>
                    <option value="degree">Admission Fee</option>
                    <option value="mca"> QR CODE</option>
                    
                  </select>
                </div><br/>
           
                <div className="row ">
                  <label className="col-12 col-md-2">Amount <span className="text-danger"> *</span>&nbsp;:</label>
                  <input
                    type="text"
                    className="col-9 col-md-5"
                    required
            
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                  />
                </div><br/>
                <div className="row ">
                  <label className="col-12 col-md-2">Discount <span className="text-danger"> *</span>&nbsp;:</label>
                  <input
                    type="text"
                    className="col-9 col-md-5"
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                  />
                </div><br/>
                <div className="row ">
                  <label className="col-12 col-md-2">Tax <span className="text-danger"> *</span>&nbsp;:</label>&nbsp;&nbsp;&nbsp;&nbsp;

                  <select
                    className="col-9 col-md-5"
                    id=""
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                  >
                    <option value="">--select--</option>
                    <option value="btech">Exclusive Tax </option>
                    <option value="degree">Inclusive Tax</option>
                   
                    
                  </select>
                </div><br/>
                <div className="row ">
                  <label className="col-12 col-md-2">Tax(in$) <span className="text-danger"> *</span>&nbsp;:</label>
                  <input
                    type="text"
                    className="col-9 col-md-5"
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                  />
                </div><br/>
                <div className="row ">
                  <label className="col-12 col-md-2">Total <span className="text-danger"> *</span>&nbsp;:</label>
                  <input
                    type="text"
                    className="col-9 col-md-5"
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                  />
                </div><br/></form>
                <Box sx={{ mb: 2, mt: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                    >
                {/* {index === steps.length - 1 ? "Finish" : "Continue"} */}
                Continue
                </Button>
                <Button
                  variant="contained"
                  // disabled={index === 0}
                  onClick={handleBack}
                  sx={{ mt: 1, mr: 1 }}
                >
                  Back
                </Button>
              </div>
            </Box>
            </StepContent>
          </Step>
           {/* -----step 9--- */}
           <Step>
            <StepLabel> <Typography fontSize={25}>Billing</Typography> </StepLabel>

            <StepContent> 
            <form>
                <div className="row ">
                  <label className="col-12 col-md-2">Gross Total <span className="text-danger"> *</span>&nbsp;:</label>
                  <input
                    type="text"
                    className="col-9 col-md-5"
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                  />
                </div><br/>
                <div className="row ">
                  <label className="col-12 col-md-2">
                   Discount     Before Tax <span className="text-danger"> *</span>&nbsp; :
                  </label>
                  <input
                    type="text"
                    className="col-9 col-md-5"
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                  />
                </div><br/>
                <div className="row ">
                  <label className="col-12 col-md-2">Net Total <span className="text-danger"> *</span>&nbsp;:</label>
                  <input
                    type="text"
                    className="col-9 col-md-5"
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                  />
                </div><br/>
                <div className="row ">
                  <label className="col-12 col-md-2">Tax(+) <span className="text-danger"> *</span>&nbsp;:</label>
                  <input
                    type="text"
                    className="col-9 col-md-5"
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                  />
                </div><br/>
                <div className="row ">
                  <label className="col-12 col-md-2">Grand Total<span className="text-danger"> *</span>&nbsp;:</label>
                  <input
                    type="text"
                    className="col-9 col-md-5"
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                  />
                </div><br/>
                <div className="row ">
                  <label className="col-12 col-md-2"> Admission Remarks <span className="text-danger"> *</span>&nbsp;:</label>
                  <input
                    type="text"
                    className="col-9 col-md-5"
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                  />
                </div><br/>
                <div className="row ">
                  <label className="col-12 col-md-2"> Assetss <span className="text-danger"> *</span>&nbsp;:</label>
                  <input
                    type="text"
                    className="col-9 col-md-5"
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                  />
                </div><br/>
              </form>
              <Box sx={{ mb: 2, mt: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={""}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {/* {index === steps.length - 1 ? "Finish" : "Continue"} */}
                    Submit
                  </Button>
                  <Button
                    variant="contained"
                    // disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            
            </StepContent>
          </Step>
        </Stepper>
        {/* {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Reset
            </Button>
          </Paper>
        )} */}
      </div>
    </div>
  );
}

// import { Label } from "@mui/icons-material";
// import React from "react";

// const RegistrationForm = () => {
//   return (
//     <div>
//       <form action="#">
//         <div>
//           <h2>Student Details</h2>
//           <label>Name : </label>
//           <input />
//           <label>Email Id : </label>
//           <input />
//           <label>Mobile Number</label>
//           <input />
//           <label>Parents Name</label>
//           <input />
//           <label>Birth Date</label>
//           <input type="date" />
//           <label>Gender</label>
//           <select id="gender" name="gender">
//             <option value="">--select--</option>

//             <option value="male">Male</option>
//             <option value="female">Female</option>
//             <option value="others">Others</option>
//           </select>
//           <label>Marital status</label>
//           <select id="maritalStatus" name="maritalStatus">
//             <option value="">--select--</option>
//             <option value="single">Single</option>
//             <option value="married">Married</option>
//             <option value="divorced">Divorced</option>
//           </select>
//           <label>College / Company</label>
//           <input />
//         </div>

//       </form>
//     </div>
//   );
// };

// export default RegistrationForm;
