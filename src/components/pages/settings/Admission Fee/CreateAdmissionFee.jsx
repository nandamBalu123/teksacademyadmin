import React from 'react'
import './CreateAdmissionFee.css';
import TextField from "@mui/material/TextField";

const CreateAdmissionFee = () => {
    return (
        <div className='container mt-3'>
            <div className='createadmissionfee'>
                <h5 className="text-center mt-3">Create Admission Fee</h5>
                <div className="row text-center">
                    <div className="col-12 col-md-6 col-lg-6 ">
                        <TextField
                            label={<span className="label-family">Admission Fee</span>}
                            className=" mar w-75"
                            variant="standard"
                            name="coursename"
                            type="text"

                        /></div>

                </div>

                <div className="text-end">
                    <button
                        type="submit"
                        class="btn btn-color my-4 mx-5"

                    >
                        Submit
                    </button>
                </div>


            </div>

        </div>

    )
}

export default CreateAdmissionFee