import React from 'react'
import './CustomStudentForm.css';

const CustomStudentForm = () => {
    return (
        <div className='container mt-3'>
            <div className='customstudentform mt-3'>
                <h5 className=" mt-3 text-center mb-3"> Organization</h5>
                <ul className="nav nav-tabs mt-3" id="myTab" role="tablist">
                    <li class="nav-item tab-animation" role="presentation">
                        <button class="nav-link active" id="overview-tab" data-bs-toggle="tab" data-bs-target="#overview" type="button" role="tab" aria-controls="overview" aria-selected="true">Overview</button>
                    </li>
                    <li class="nav-item tab-animation" role="presentation">
                        <button class="nav-link" id="basicdetails-tab" data-bs-toggle="tab" data-bs-target="#basicdetails" type="button" role="tab" aria-controls="basicdetails" aria-selected="true">Basic Details</button>
                    </li>
                    <li class="nav-item tab-animation" role="presentation">
                        <button class="nav-link" id="studentdetails-tab" data-bs-toggle="tab" data-bs-target="#studentdetails" type="button" role="tab" aria-controls="studentdetails" aria-selected="false">Student Details</button>
                    </li>
                    <li class="nav-item tab-animation" role="presentation">
                        <button class="nav-link" id="studentcontactdetails-tab" data-bs-toggle="tab" data-bs-target="#studentcontactdetails" type="button" role="tab" aria-controls="studentcontactdetails" aria-selected="false">Student Contact Details</button>
                    </li>
                    <li class="nav-item tab-animation" role="presentation">
                        <button class="nav-link" id="educationdetails-tab" data-bs-toggle="tab" data-bs-target="#educationdetails" type="button" role="tab" aria-controls="educationdetails" aria-selected="false">Education Details</button>
                    </li>
                    <li class="nav-item tab-animation" role="presentation">
                        <button class="nav-link" id="photo-tab" data-bs-toggle="tab" data-bs-target="#photo" type="button" role="tab" aria-controls="photo" aria-selected="false">photo</button>
                    </li>
                    <li class="nav-item tab-animation" role="presentation">
                        <button class="nav-link" id="enquirydetails-tab" data-bs-toggle="tab" data-bs-target="#enquirydetails" type="button" role="tab" aria-controls="enquirydetails" aria-selected="false">Enquiry Details</button>
                    </li>
                    <li class="nav-item tab-animation" role="presentation">
                        <button class="nav-link" id="admissiondetails-tab" data-bs-toggle="tab" data-bs-target="#admissiondetails" type="button" role="tab" aria-controls="admissiondetails" aria-selected="false">Admission Details</button>
                    </li>
                    <li class="nav-item tab-animation" role="presentation">
                        <button class="nav-link" id="feedetails-tab" data-bs-toggle="tab" data-bs-target="#feedetails" type="button" role="tab" aria-controls="feedetails" aria-selected="false">Fee Details </button>
                    </li>
                    <li class="nav-item tab-animation" role="presentation">
                        <button class="nav-link" id="billing-tab" data-bs-toggle="tab" data-bs-target="#billing" type="button" role="tab" aria-controls="billing" aria-selected="false">Billing</button>
                    </li>
                    <li class="nav-item tab-animation" role="presentation">
                        <button class="nav-link" id="others-tab" data-bs-toggle="tab" data-bs-target="#others" type="button" role="tab" aria-controls="others" aria-selected="false">Others</button>                </li>
                </ul>
                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="overview" role="tabpanel" aria-labelledby="overview-tab">Over View</div>
                    <div class="tab-pane fade " id="basicdetails" role="tabpanel" aria-labelledby="basicdetails-tab">Basic Details</div>
                    <div class="tab-pane fade" id="studentdetails" role="tabpanel" aria-labelledby="studentdetails-tab">Student Details</div>
                    <div class="tab-pane fade" id="studentcontactdetails" role="tabpanel" aria-labelledby="studentcontactdetails-tab">Student Contact Details</div>
                    <div class="tab-pane fade" id="educationdetails" role="tabpanel" aria-labelledby="educationdetails-tab">Education Details</div>
                    <div class="tab-pane fade" id="photo" role="tabpanel" aria-labelledby="photo-tab">Photo</div>
                    <div class="tab-pane fade" id="enquirydetails" role="tabpanel" aria-labelledby="enquirydetails-tab">enquirydetails</div>
                    <div class="tab-pane fade" id="admissiondetails" role="tabpanel" aria-labelledby="admissiondetails-tab">admissiondetails</div>
                    <div class="tab-pane fade" id="feedetails" role="tabpanel" aria-labelledby="feedetails-tab">Fee Details</div>
                    <div class="tab-pane fade" id="billing" role="tabpanel" aria-labelledby="billing-tab">Billing</div>
                    <div class="tab-pane fade" id="others" role="tabpanel" aria-labelledby="others-tab">others</div>

                </div>
            </div>
        </div>
    )
}

export default CustomStudentForm