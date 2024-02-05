import React from 'react'
import "./StudentIdCard.css"
import stdphoto from "./Logos/stdphoto.png"




export default function StudentIdCard() {
  return (
    <div className='studentidcard'>

      <div className="main-con">
        <div className='certificate-con'>
           <div className="stuid">
            <span>STUDENT ID</span></div>
           <div className='stuimg'>
            <img src={stdphoto} alt="">
                </img></div>
                <div className='stuinfo'>
                <div className='name'>
                    <span> ARCHANA P</span> </div>
                    <div className="stdcourse" >
                                <span > DATA ANALYTICS</span>
                            </div>
                            <div class="stdidno" >
                                <span > ID: 1234</span>
                                
                    </div>
                    </div>
                    </div>
           
                    <div  className='idback'>
                        <div className='stunum'>
                        <span >1234567890</span>
                        </div>
                        </div>        


      </div>
   
                
  </div>
  )
}
