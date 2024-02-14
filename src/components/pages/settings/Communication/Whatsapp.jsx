import React from 'react'
import './Whatsapp.css';
import { useNavigate } from 'react-router-dom';

const Whatsapp = () => {
    const navigate = useNavigate();
    return (
        <div className='container mt-3'>
            <button onClick={() => navigate(-1)} className="btn btn-color btn-sm ">Go Back</button>
            <div className='whatsapp mt-3'>
                <ul className="nav nav-tabs my-3" id="myTab" role="tablist">
                    <li class="nav-item tab-animation" role="presentation">
                        <button class="nav-link active" id="whatsappconfigure-tab" data-bs-toggle="tab" data-bs-target="#whatsappconfigure-tab-pane" type="button" role="tab" aria-controls="whatsappconfigure-tab-pane" aria-selected="true">Whatsapp Configure</button>
                    </li>
                    <li class="nav-item tab-animation" role="presentation">
                        <button class="nav-link" id="templates-tab" data-bs-toggle="tab" data-bs-target="#templates-tab-pane" type="button" role="tab" aria-controls="templates-tab-pane" aria-selected="false">Templates</button>
                    </li>


                </ul>
                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="whatsappconfigure-tab-pane" role="tabpanel" aria-labelledby="whatsappconfigure-tab" tabindex="0">Whatsapp Configure</div>
                    <div class="tab-pane fade" id="templates-tab-pane" role="tabpanel" aria-labelledby="templates-tab" tabindex="0">Templates</div>


                </div>
            </div>

        </div>
    )
}

export default Whatsapp