import React from 'react'

const CustomStudentForm = () => {
    return (
        <div className='container'>
            <div className='customstudentform'>
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="basicdetails-tab" data-bs-toggle="tab" data-bs-target="#basicdetails" type="button" role="tab" aria-controls="basicdetails" aria-selected="true">Basic Details</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="studentdetails-tab" data-bs-toggle="tab" data-bs-target="#studentdetails" type="button" role="tab" aria-controls="studentdetails" aria-selected="false">Student Details</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="studentcontactdetails-tab" data-bs-toggle="tab" data-bs-target="#studentcontactdetails" type="button" role="tab" aria-controls="studentcontactdetails" aria-selected="false">Student Contact Details</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="educationdetails-tab" data-bs-toggle="tab" data-bs-target="#educationdetails" aria-selected="false">educationdetails</button>
                    </li>



                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="studentcontactdetails-tab" data-bs-toggle="tab" data-bs-target="#studentcontactdetails" type="button" role="tab" aria-controls="studentcontactdetails" aria-selected="false">Education Details</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="studentcontactdetails-tab" data-bs-toggle="tab" data-bs-target="#studentcontactdetails" type="button" role="tab" aria-controls="studentcontactdetails" aria-selected="false">Education Details</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="studentcontactdetails-tab" data-bs-toggle="tab" data-bs-target="#studentcontactdetails" type="button" role="tab" aria-controls="studentcontactdetails" aria-selected="false">Education Details</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="studentcontactdetails-tab" data-bs-toggle="tab" data-bs-target="#studentcontactdetails" type="button" role="tab" aria-controls="studentcontactdetails" aria-selected="false">Education Details</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="studentcontactdetails-tab" data-bs-toggle="tab" data-bs-target="#studentcontactdetails" type="button" role="tab" aria-controls="studentcontactdetails" aria-selected="false">Education Details</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="studentcontactdetails-tab" data-bs-toggle="tab" data-bs-target="#studentcontactdetails" type="button" role="tab" aria-controls="studentcontactdetails" aria-selected="false">Education Details</button>
                    </li>
                </ul>
                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="basicdetails" role="tabpanel" aria-labelledby="basicdetails-tab">

                        
                    </div>
                    <div class="tab-pane fade" id="studentdetails" role="tabpanel" aria-labelledby="studentdetails-tab">...</div>
                    <div class="tab-pane fade" id="studentcontactdetails" role="tabpanel" aria-labelledby="studentcontactdetails-tab">...</div>
                    <div class="tab-pane fade" id="educationdetails" role="tabpanel" aria-labelledby="educationdetails-tab">...</div>
                </div>
            </div>
        </div>
    )
}

export default CustomStudentForm