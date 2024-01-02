import React from 'react'
import './CustomUserForm.css';

const CustomUserForm = () => {
  return (
    <div className='container mt-3'>
      <div className='customuserform mt-3'>
        <h5 className=" mt-3 text-center mb-3"> Organization</h5>
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <li class="nav-item" role="presentation">
            <button class="nav-link active" id="overview-tab" data-bs-toggle="tab" data-bs-target="#overview" type="button" role="tab" aria-controls="overview" aria-selected="true">Overview</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="customuserform-tab" data-bs-toggle="tab" data-bs-target="#customuserform" type="button" role="tab" aria-controls="customuserform" aria-selected="false">Custom User Form</button>
          </li>

        </ul>
        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" id="overview" role="tabpanel" aria-labelledby="overview-tab">Over View</div>
          <div class="tab-pane fade" id="customuserform" role="tabpanel" aria-labelledby="customuserform-tab">Custom User Form</div>

        </div>
      </div>

    </div>
  )
}

export default CustomUserForm