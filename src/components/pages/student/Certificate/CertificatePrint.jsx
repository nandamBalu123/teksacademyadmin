import React from 'react'
import "./CertificatePrint.css"
import logo1 from "../../../../images/img_files/Hologram-Sticker_png.png"
import sign from "../../../../images/img_files/Zaheer_Sir_Signature 2.png"
import img1 from "../../../../images/img_files/NASSCOM.png"
import img2 from "../../../../images/img_files/NSDC.png"
import img3 from "../../../../images/img_files/ISO.png"
import img4 from "../../../../images/img_files/Skill_india.png"
import img5 from "../../../../images/img_files/MSME_logo.png"
import tekslogo from "../../../../images/img_files/Tesks_Logo.png"
import bgimg from "../../../../images/img_files/Teks_Shape_01.png"  
import bgimg2 from "../../../../images/img_files/Student-Certificate-New_teks_pattern.png"
import bgimg3 from "../../../../images/img_files/Student-Certificate-New_teks_pattern2.png"

import { useState } from 'react';
import { useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom'
import { useStudentsContext } from "../../../../hooks/useStudentsContext";

import { useReactToPrint } from "react-to-print";



const CertificatePrint = React.forwardRef((props, ref) => {
    
    const currentDate = new Date();
     const formattedDate = currentDate.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });

    const [CertificatePrint, setCertificatePrint] = useState("");

    console.log("CertificatePrint", CertificatePrint)
    const { id } = useParams("");
    const { students, dispatch } = useStudentsContext();

    useEffect(() => {

        if (students && id) {

            const filteredStudentData = students.filter((item) => {

                const singleStudentData = id ? item.id === parseInt(id) : true;
                return singleStudentData;
            })
            if (filteredStudentData) {
                console.log(filteredStudentData[0])
            }
            setCertificatePrint(filteredStudentData[0])
        }
    }, [students, id, dispatch]);

    const handleDownload = () => {
        const printCertificate = document.getElementsByClassName("contain")
        console.log(printCertificate)
    }
   const formatDate = (dateString) => {
    const options = {month : 'short', year : 'numeric' };
    const formattedDate = new Date(dateString).toLocaleString('en-Us', options);
    return formattedDate.toUpperCase();
   };

    return (
        <div className="contain" ref={ref} >
            <div className='outerborder'  >

                {CertificatePrint && (
                    <div className='section'>

                        <div className='background'>
                            <img src={bgimg} alt="" />
                        </div>
                        <div className='background2'>
                            <img src={bgimg2} alt="" />

                        </div>
                        <div className='background3'>
                            <img src={bgimg3} alt="" />
                            
                        </div>
                        <div className='logo'>
                            <img src={tekslogo} alt="" />
                        </div>
                        <header>
                            <h1><span>C</span>ERTIFICATE</h1>
                            <p>This Is  To Certify  that</p>
                        </header>

                        <div className='certificate-info' action="">
                            <div className='name'>
                                <p >Mr./Mrs</p>
                                <div className='stuname'>
                                    <h4 className='studname' >
                                        {CertificatePrint.name.toUpperCase()}</h4>
                                </div>
                            </div>
                            <div className='info'>
                                <p class="para">has successfully completed Real Time Training on</p>

                                <h4 className='courses'>{CertificatePrint.courses.toUpperCase()}</h4>

                            </div>
                            <div className='period' >
                                <div className="d-block">
                                    <p >during the period of </p>
                                </div>
                                <h4 className='from'>
                                    {}
                                    
                                     { formatDate (CertificatePrint?.certificate_status[0]?.courseStartDate)}  </h4>

                                <p className='  d-block'>to </p>

                                <h4 className='to  d-block'> {formatDate (CertificatePrint?.certificate_status[0]?.courseEndDate)}   </h4>
                            </div>
                            <div className='grade '>
                                <p className='grade-start' >with</p>
                                <h4 className='gradeA'> A+ </h4>
                                <p className='grade-end' >
                                    Grade
                                </p>
                            </div>

                        </div>
                        <div className='id'>
                            <h5>ID:{CertificatePrint.registrationnumber }</h5>
                        </div>
                        <div className='sign-date'>
                            <div className='date-left'>
                                <p className="dt">{formattedDate}</p>
                                <p style={{ color: "#2a619d" }}>DATE</p>
                            </div>
                            <div className='hologram-sticker'>
                                <img src={logo1} alt="" />
                            </div>
                            <div className='sign-right'>
                                <img src={sign} alt="" />
                                <p style={{ color: "#2a619d" }}>SIGNATURE</p>
                            </div>
                        </div>
                        <div className='cname'>
                            <img src={img1} className=" img1" alt="" />
                            <img src={img2} className=" img2" alt="" />
                            <img src={img3} className=" img3" alt="" />
                            <img src={img4} className=" img4"alt="" />
                            <img src={img5}  className=" img5"alt=""  />
                        </div>

                    </div>
                )}
            </div>
        </div>
    )


});


function StudentCertificatePrint() {
    const componentRefff = React.useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRefff.current,
    });

    console.log(`Print ${componentRefff.current}`)
    const navigate = useNavigate();

    return (
        <div>
<button onClick={() => navigate(-1)} className="btn btn-color btn-sm ml-4">Go Back</button>
            <div className="mt-3  text-end me-5 mb-4 ">
                <button onClick={handlePrint} className="btn btn-outline-color ">Download pdf</button>
            </div>
            <CertificatePrint ref={componentRefff} />
        </div>
    );
}
export default StudentCertificatePrint;