import React, { useEffect, useState } from 'react';
import './RefundForm.css';
import TextField from "@mui/material/TextField";
import { useStudentsContext } from "../../../../hooks/useStudentsContext";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CommentsDisabledRounded } from '@mui/icons-material';

const RefundForm = () => {
    const { students, dispatch } = useStudentsContext();


    const [passwordError, setPasswordError] = useState('');
    const [formData, setFormData] = useState(
        {
            registrationnumber: "",
            name: "",
            mobilenumber: "",
            email: "",
            courses: "",
            branch: "",
            batchtimings: "",
            enquirytakenby: "",
            trainername: "",
            admissiondate: "",
            finaltotal: "",
            totalpaidamount: "",
            dueamount: "",
            comment: ""
        }
    );
    useEffect(() => {
        if (students && formData.registrationnumber) {
            const filteredResults = students.filter((item) =>
                item.registrationnumber.toLowerCase() === formData.registrationnumber.toLowerCase()
            );
            console.log("filteredResults", filteredResults)

            if (filteredResults && filteredResults.length > 0) {
                let filterstudentwithregistrationid = filteredResults[0]
                setFormData((prev) => ({
                    ...prev,
                    name: filterstudentwithregistrationid.name,
                    mobilenumber: filterstudentwithregistrationid.mobilenumber,
                    email: filterstudentwithregistrationid.email,
                    courses: filterstudentwithregistrationid.courses,
                    branch: filterstudentwithregistrationid.branch,
                    enquirytakenby: filterstudentwithregistrationid.enquirytakenby,
                    admissiondate: filterstudentwithregistrationid.admissiondate,
                    finaltotal: filterstudentwithregistrationid.finaltotal,
                    totalpaidamount: filterstudentwithregistrationid.totalpaidamount,
                    dueamount: filterstudentwithregistrationid.dueamount,
                    comment: filterstudentwithregistrationid.comment
                }));
            }
            if (filteredResults && filteredResults.length < 1) {
                let filterstudentwithregistrationid = filteredResults[0]
                setFormData((prev) => (
                    {
                        ...prev,
                        name: "",
                        mobilenumber: "",
                        email: "",
                        courses: "",
                        branch: "",
                        batchtimings: "",
                        enquirytakenby: "",
                        trainername: "",
                        admissiondate: "",
                        finaltotal: "",
                        totalpaidamount: "",
                        dueamount: "",
                        comment: ""
                    }
                ));
            }

        }
    }, [formData.registrationnumber]);




    const handleFormData = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.registrationnumber) {

            toast.error('Please Enter Registration Number', {
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }
        if (!formData.name) {

            toast.error("Please Enter Student Name", {
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }
        if (!formData.mobilenumber) {
            toast.error("Please Enter Mobile Number", {
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        } else {
            if (formData.mobilenumber.length != 10) {
                toast.error("Mobile Number Should be 10 Digits", {
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                return;
            }
        }
        if (!formData.email) {
            toast.error("Please Enter Email ID", {
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",

            });
            return;
        }
        if (!formData.courses) {
            toast.error("Please Enter Course Name", {
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }
        if (!formData.branch) {
            toast.error("Please Enter Branch Name", {
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }

        if (!formData.enquirytakenby) {
            toast.error("Please Enter Counsellor Name", {
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }

        if (!formData.admissiondate) {
            toast.error("Please Enter Admission Date", {
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }
        if (!formData.finaltotal) {
            toast.error("Please Enter Total Amount", {
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }
        if (!formData.totalpaidamount) {
            toast.error("Please Enter  Paid Amount", {
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }
        if (!formData.dueamount) {
            toast.error("Please Enter Due Amount", {
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }
        if (!formData.batchtimings) {
            toast.error("Please Enter Batch Timings ", {
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }
        if (!formData.trainername) {
            toast.error("Please Enter Trainer Name", {
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }
        if (!formData.comment) {
            toast.error("Please Enter  Reason for Refund", {
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }
        console.log(formData);
    }


    return (
        <div className='container mt-3'>

            <div className='refundform mt-3'>
                <h5 className="mt-4  text-center">Refund Form</h5>
                <div className="sub-refunfform-container text-center ">
                    <form className="needs-validation " noValidate>
                        <div className="row">
                            <div className=" col-12 col-md-6 col-lg-6 col-xl-6">
                                <TextField
                                    label={<span className="label-family">Registration ID</span>}
                                    name="registrationnumber"
                                    type="text"
                                    variant="standard"
                                    className="mar w-75"
                                    onChange={handleFormData}
                                    value={formData.registrationnumber}
                                    required
                                    id="registrationnumber"
                                />


                            </div>
                            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                                <TextField
                                    label={<span className="label-family">Student Name</span>}
                                    name="name"
                                    type="text"
                                    variant="standard"
                                    className="mar w-75"
                                    onChange={handleFormData}
                                    value={formData.name}
                                    id="name"
                                    required
                                />
                            </div>
                        </div>
                        <div className="row ">
                            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                                <TextField
                                    label={<span className="label-family">Phone Number</span>}
                                    className=" mar w-75"
                                    variant="standard"
                                    name="mobilenumber"
                                    type="number"
                                    id="mobilenumber"
                                    onChange={handleFormData}
                                    value={formData.mobilenumber}
                                    required
                                />
                            </div>
                            <div className="col-12 col-md-6 col-lg-6 col-xl-6">

                                <TextField
                                    label={<span className="label-family">Email ID</span>}
                                    className=" mar w-75"
                                    variant="standard"
                                    name="email"
                                    type="email"
                                    id="email"
                                    onChange={handleFormData}
                                    value={formData.email}
                                    required
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                                <TextField
                                    label={<span className="label-family">Enrolled Course</span>}
                                    className=" mar w-75"
                                    variant="standard"
                                    name="courses"
                                    type="text"
                                    id="courses"
                                    onChange={handleFormData}
                                    value={formData.courses}
                                    required
                                />
                            </div>
                            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                                <TextField
                                    label={<span className="label-family">Branch</span>}
                                    className=" mar w-75"
                                    variant="standard"
                                    name="branch"
                                    type="text"
                                    id="branch"
                                    onChange={handleFormData}
                                    value={formData.branch}
                                    required
                                />
                            </div>
                        </div>
                        <div className="row ">

                            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                                <TextField
                                    label={<span className="label-family">Counsellor Name</span>}
                                    className=" mar w-75"
                                    variant="standard"
                                    name="enquirytakenby"
                                    type="text"
                                    id="enquirytakenby"
                                    onChange={handleFormData}
                                    value={formData.enquirytakenby}
                                    required
                                />

                            </div>
                            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                                <TextField
                                    label={<span className="label-family">Admission Date</span>}
                                    className=" mar w-75"
                                    variant="standard"
                                    name="admissiondate"
                                    type="date"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    id="admissiondate"
                                    onChange={handleFormData}
                                    value={formData.admissiondate}
                                    required
                                />

                            </div>

                        </div>
                        <div className="row ">


                        </div>

                        <div className="row ">
                            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                                <TextField
                                    label={<span className="label-family">Total Course Fee</span>}
                                    className=" mar w-75"
                                    variant="standard"
                                    name="finaltotal"
                                    type="number"
                                    id="finaltotal"
                                    onChange={handleFormData}
                                    value={formData.finaltotal}
                                    required
                                />
                            </div>
                            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                                <TextField
                                    label={<span className="label-family">Fee Paid</span>}
                                    className=" mar w-75"
                                    variant="standard"
                                    name="totalpaidamount"
                                    type="number"
                                    id="totalpaidamount"
                                    onChange={handleFormData}
                                    value={formData.totalpaidamount}
                                    required
                                />

                            </div>
                        </div>
                        <div className="row ">
                            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                                <TextField
                                    label={<span className="label-family">Due Amount</span>}
                                    className=" mar w-75"
                                    variant="standard"
                                    name="dueamount"
                                    type="number"
                                    id="dueamount"
                                    onChange={handleFormData}
                                    value={formData.dueamount}
                                    required
                                />
                            </div>
                            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                                <TextField
                                    label={<span className="label-family">Batch Timings</span>}
                                    className=" mar w-75"
                                    variant="standard"
                                    name="batchtimings"
                                    type="text"
                                    id="batchtimings"
                                    onChange={handleFormData}
                                    value={formData.batchtimings}
                                    required
                                />
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                                <TextField
                                    label={<span className="label-family">Trainer Name</span>}
                                    className=" mar w-75"
                                    variant="standard"
                                    name="trainername"
                                    type="timing"
                                    id="trainername"
                                    onChange={handleFormData}
                                    value={formData.trainername}
                                    required
                                />
                            </div>
                        </div>
                        <div className="row  textarea_input ">
                            <div className="col-12 col-md-5 col-lg-5 col-xl-5">
                                <textarea name="comment" form="usrform" placeholder='Reason for Refund *' onChange={handleFormData}
                                    value={formData.comment}
                                    style={{ backgroundColor: "#fcfcfc", paddingLeft: "10px", height: "80px" }}>
                                </textarea>
                            </div>

                            <div className='col-12 col-md-6 col-lg-6 col-xl-6 text-end '>
                                <button
                                    type="submit"
                                    onClick={handleSubmit}
                                    className=" btn btn-color mt-sm-5 "
                                    style={{ textTransform: "capitalize" }}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default RefundForm

