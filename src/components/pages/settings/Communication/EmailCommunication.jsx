import React from 'react'
import './EmailCommunication.css';
import { useNavigate } from 'react-router-dom';

const EmailCommunication = () => {
    const navigate =useNavigate();
    return (
        <div className='container mt-3'>
            <button onClick={() => navigate(-1)} className="btn btn-color btn-sm ">Go Back</button>
            <div className='emailcommunication mt-3'>
                <ul className="nav nav-tabs my-3" id="myTab" role="tablist">
                    <li class="nav-item tab-animation" role="presentation">
                        <button class="nav-link active" id="emailconfigure-tab" data-bs-toggle="tab" data-bs-target="#emailconfigure-tab-pane" type="button" role="tab" aria-controls="emailconfigure-tab-pane" aria-selected="true">Email Configure</button>
                    </li>
                    <li class="nav-item tab-animation" role="presentation">
                        <button class="nav-link" id="templates-tab" data-bs-toggle="tab" data-bs-target="#templates-tab-pane" type="button" role="tab" aria-controls="templates-tab-pane" aria-selected="false">Templates</button>
                    </li>


                </ul>
                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="emailconfigure-tab-pane" role="tabpanel" aria-labelledby="emailconfigure-tab" tabindex="0">Email Configure</div>
                    <div class="tab-pane fade" id="templates-tab-pane" role="tabpanel" aria-labelledby="templates-tab" tabindex="0">Templates</div>


                </div>
            </div>

        </div>
    )
}

export default EmailCommunication