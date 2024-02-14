import React from 'react'
import "./StudentIdCard.css"
import stdphoto from "../../../../images/img_files/stdphoto.png"
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useStudentsContext } from '../../../../hooks/useStudentsContext'


import { useNavigate } from 'react-router-dom'





export default function StudentIdCard() {
  const navigate = useNavigate ();

  const [StudentIdCard, setStudentidcard] = useState("");
  const { id } = useParams();
  const { students, dispatch } = useStudentsContext();

  useEffect(() => {
    if (students && id) {

      const filteredResults = students.filter((item) => {
        const singlestudentCondition = id ? item.id === parseInt(id) : true;

        return singlestudentCondition;
      });
      if (filteredResults) {
        console.log("filteredResults[0]", filteredResults[0]);
      }

      setStudentidcard(filteredResults[0]);
    }

  }, [students, id, dispatch]);
  return (
    <>
  
    <div className='studentidcard'>
    <button onClick={() => navigate(-1)} className="btn btn-color btn-sm ">Go Back</button>

      <div className="main-con">
        <div className='certificate-con'>
          <div className="stuid">
            <span>STUDENT ID</span></div>
          <div className='stuimg'>
            <img src={stdphoto} alt="">
            </img></div>
          <div className='stuinfo'>
            <div className='name'>
              <span> xyz{}</span> </div>
            <div className="stdcourse" >
              <span > DATA ANALYTICS</span>
            </div>
            <div class="stdidno" >
              <span > ID: 1234</span>

            </div>
          </div>
        </div>

        <div className='idback'>
          <div className='stunum'>
            <span >1234567890</span>
          </div>
        </div>
       
      </div>

      <div className="downloadbtn">
          <button className="btn btn-primary">Download</button>
        </div>



    </div>


</>


  )
}
