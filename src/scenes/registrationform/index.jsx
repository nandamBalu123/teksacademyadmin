import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import "./index.css";
import { blue } from "@mui/material/colors";

export default function VerticalLinearStepper() {
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
                  <label className="col-12 col-md-2">Name:</label>
                  <input
                    type="text"
                    className="col-9 col-md-5"
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                  />
                </div>
                <div className="row ">
                  <label className="col-12 col-md-2">Email:</label>
                  <input
                    type="text"
                    className="col-9 col-md-5"
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                  />
                </div>
                <div className="row ">
                  <label className="col-12 col-md-2">Mobile Number:</label>
                  <input
                    type="text"
                    className="col-9 col-md-5"
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
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
                  <label className="col-12 col-md-2">Parent's Name:</label>
                  <input
                    type="text"
                    className="col-9 col-md-5"
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                  />
                </div>
                <div className="row ">
                  <label className="col-12 col-md-2">Birth Date:</label>
                  <input
                    type="text"
                    className="col-9 col-md-5"
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                  />
                </div>
                <div className="row ">
                  <label className="col-12 col-md-2">Gender:</label>
                  <input
                    type="text"
                    className="col-9 col-md-5"
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                  />
                </div>
                <div className="row ">
                  <label className="col-12 col-md-2">Marital Status:</label>
                  <input
                    type="text"
                    className="col-9 col-md-5"
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                  />
                </div>
                <div className="row ">
                  <label className="col-12 col-md-2">
                    College / School / Company* :
                  </label>
                  <input
                    type="text"
                    className="col-9 col-md-5"
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
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
          {/* -----step 3--- */}

          <Step>
            <StepLabel>
              <Typography fontSize={25}>Student Contact Details</Typography>
            </StepLabel>
            <StepContent>
              <form>
                <div className="row ">
                  <label className="col-12 col-md-2">Country:</label>
                  <input
                    type="text"
                    className="col-9 col-md-5"
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                  />
                </div>
                <div className="row ">
                  <label className="col-12 col-md-2">State:</label>
                  <input
                    type="text"
                    className="col-9 col-md-5"
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                  />
                </div>
                <div className="row ">
                  <label className="col-12 col-md-2">Area:</label>
                  <input
                    type="text"
                    className="col-9 col-md-5"
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                  />
                </div>
                <div className="row ">
                  <label className="col-12 col-md-2">Native Place :</label>
                  <input
                    type="text"
                    className="col-9 col-md-5"
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                  />
                </div>
                <div className="row ">
                  <label className="col-12 col-md-2">Zip Code* :</label>
                  <input
                    type="text"
                    className="col-9 col-md-5"
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                  />
                </div>
                <div className="row ">
                  <label className="col-12 col-md-2"> WhatsApp Number* :</label>
                  <input
                    type="text"
                    className="col-9 col-md-5"
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
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
          {/* -----step 4--- */}
          <Step>
            <StepLabel>
              <Typography fontSize={25}>Education Details</Typography>
            </StepLabel>

            <StepContent>
              <form>
                <div className="row ">
                  <label className="col-12 col-md-2">Country:</label>
                  <input
                    type="text"
                    className="col-9 col-md-5"
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
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
          <Step>
            <StepLabel>Basic Details</StepLabel>

            <StepContent></StepContent>
          </Step>
          <Step>
            <StepLabel>Basic Details</StepLabel>

            <StepContent></StepContent>
          </Step>
          <Step>
            <StepLabel>Basic Details</StepLabel>

            <StepContent></StepContent>
          </Step>
          <Step>
            <StepLabel>Basic Details</StepLabel>

            <StepContent></StepContent>
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
