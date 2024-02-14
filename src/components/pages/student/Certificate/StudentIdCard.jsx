import React from 'react'
import "./StudentIdCard.css"
import stdphoto from "../../../../images/img_files/stdphoto.png"
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useStudentsContext } from '../../../../hooks/useStudentsContext'

import tekslogo from "../../../../images/img_files/Tesks_Logo.png"
import { useReactToPrint } from "react-to-print";






const StudentIdCard = React.forwardRef((props, ref) => {
  const [StudentIdCard, setStudentIdCard] = useState("");
  const { id } = useParams("");
  const { students, dispatch } = useStudentsContext();
  
  useEffect(()=>{
    if (students && id)
{
  const filteredResults = students.filter((item) => {
    const singlestudentCondition = id? item.id === parseInt(id) : true;
    
    return singlestudentCondition;
  });
  if (filteredResults) {
    console.log("filteredResults[0]", filteredResults[0]);
  }
    setStudentIdCard(filteredResults[0]);
  
}  },[students, id, dispatch]) ;

  return (
    <div className='studentidcard' ref={ref}>

      <div className="main-con">
        <div className='certificate-con'>
          <div className="stuid">
            <span>STUDENT ID</span></div>
          <div className='stuimg'>
            {!StudentIdCard.studentImg && <img src={stdphoto} alt="photo" />}
            {StudentIdCard.studentImg && (
              <img
                className=" w-75"
                src={`https://teksacademyimages.s3.amazonaws.com/${StudentIdCard.studentImg}`}
                alt="photo"
              />
            )}</div>
          <div className='stuinfo'>
            <div className='name'>
              <span> {StudentIdCard.name}</span> </div>
            <div className="stdcourse" >
              <span >{StudentIdCard.courses}</span>
            </div>
            <div class="stdidno" >
              <span > ID: {StudentIdCard.registrationnumber}</span>

            </div>
          </div>
        </div>

        <div className='idback'>

          <div className='stunum'>
            <img src={tekslogo} alt="" />
            <p>Student Contact</p>
            <span>{StudentIdCard.mobilenumber}</span>
            <p>Address</p>
            <span>{StudentIdCard.branch} </span>
            <h5>www.teksacademy.com</h5>

          </div>

        </div>

      </div>


    </div>
  )
});

function StudentIdPrint() {
  const componentRef = React.useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      {/* <h1>Your React App</h1> */}
      <div className="mt-3  text-end me-5 mb-4 ">
        <button
          onClick={handlePrint}
          // style={{ margin: "30px" }}
          class="btn btn-outline-primary"
        >
          {/* <LocalPrintshopIcon /> */}
          Download PDF
        </button>
      </div>
      <StudentIdCard ref={componentRef} />
    </div>
  );
}

export default StudentIdPrint;
