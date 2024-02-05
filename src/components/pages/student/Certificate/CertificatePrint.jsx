import React from 'react'
import "./CertificatePrint.css"
import logo1 from "../Certificate/Logos/Hologram-Sticker-removebg-preview.png"
import sign from "../Certificate/Logos/MD_Signature.png"
import img1 from "../Certificate/Logos/NASSCOM.png"
import img2 from "../Certificate/Logos/NSDC.png"
import img3 from "../Certificate/Logos/ISO.png"
import img4 from "../Certificate/Logos/Skill_india.png"
import img5 from "../Certificate/Logos/MSME_logo.png"
import tekslogo from "../Certificate/Logos/Tesks_Logo.png"
import bgimg from "../Certificate/Logos/Teks_Shape_01.png"
export default function CertificatePrint() {
    return (
        <>
            <div className='outerborder'>


                <div className='section'>

                    <div className='background'>
                        <img src={bgimg} alt="" />
                    </div>
                    <div className='logo'>
                        <img src={tekslogo} alt="" />
                    </div>
                    <header>
                        <h1><span>C</span>ERTIFICATE</h1>
                        <p>This is  To Certify  that</p>
                    </header>

                    <div className='certificate-info' action="">
                        <div className='name'>
                            <p className='mr-mrs'>Mr./Mrs</p>
                            <div className='stuname'>
                                <h4 className='studname'>
                                    ENADI PREM SAI</h4>
                            </div>
                        </div>
                        <div className='info'>
                            <p class="para">Has Succesfully completed Real Time Training on
                            </p>
                            <h4 className='graphic'>GRAPHIC DESIGNING</h4>

                        </div>
                        <div className='period'>
                            <p className='period1'>During the period of </p>
                            <h4 className='from'>DEC 2017  </h4>

                            <p className='till'>to </p>
                            <h4 className='to'>  FEB 2018       </h4>
                        </div>
                        <div className='grade '>
                            <p className='grade-start' >with</p>
                            <h4 className='gradeA'> A+ </h4>
                            <p className='grade=end' >
                                Grade
                            </p>
                        </div>

                    </div>
                    <div className='id'>
                        <h5>ID:CC231048</h5>
                    </div>
                    <div className='sign-date'>
                        <div className='date-left'>
                            <p className="dt">01-10-2018</p>
                            <p style={{ color: "#2a619d" }}>Date</p>
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
                        <img src={img1} alt="" />
                        <img src={img2} alt="" />
                        <img src={img3} alt="" />
                        <img src={img4} alt="" />
                        <img src={img5} alt="" />
                    </div>

                </div>

            </div>
        </>
    )
}
