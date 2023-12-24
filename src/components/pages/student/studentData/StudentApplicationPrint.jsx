import React from "react";
import { useReactToPrint } from "react-to-print";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import logo from "../../../../images/Teks-Logo-with-Trade.png";
import profilePic from "../../../../images/img4-11.png";

import "./StudentApplication.css";

import studentimg from "../../../../images/img4.png";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useStudentsContext } from "../../../../hooks/useStudentsContext";
import useFormattedDate from "../../../../hooks/useFormattedDate";

const PrintableComponent = React.forwardRef((props, ref) => {
  const { id } = useParams();
  const { students, dispatch } = useStudentsContext();
  const [studentdata, setstudentdata] = useState([]);
  let BirthDate = useFormattedDate(studentdata.birthdate);
  let EnquiryDate = useFormattedDate(studentdata.enquirydate);
  let AdmissionDate = useFormattedDate(studentdata.admissiondate);
  let CourseStartDate = useFormattedDate(studentdata.validitystartdate);
  let ExpectedEndDate = useFormattedDate(studentdata.validityenddate);
  let IssueDate = useFormattedDate(studentdata.admissiondate);

  // useEffect(() => {
  //   // Make a GET request to your backend API endpoint
  //   axios
  //     .get(`${process.env.REACT_APP_API_URL}/viewstudentdata/${id}`)
  //     .then((response) => {
  //       // Handle the successful response here
  //       // response.data[0].feedetails = JSON.parse(response.data[0].feedetails);
  //       setstudentdata(response.data[0]); // Update the data state with the fetched data
  //       // setstudentdata()
  //       // console.log("studentdata", response.data[0].feedetails);
  //     })
  //     .catch((error) => {
  //       // Handle any errors that occur during the request
  //       console.error("Error fetching data:", error);
  //     });
  // }, []);
  useEffect(() => {
    if (students && id) {
      const filteredResults = students.filter((item) => {
        const singlestudentCondition = id ? item.id === parseInt(id) : true;

        return singlestudentCondition;
      });
      if (filteredResults) {
        console.log("filteredResults[0]", filteredResults[0]);
      }
      setstudentdata(filteredResults[0]);
    }
  }, [students, id, dispatch]);
  // const jsonString = studentdata.feedetails;

  // // const jsonObject = JSON.parse(jsonString);
  // useEffect(() => {
  //   setstudentdata((item)=>(...item,feedetails: JSON.parse(feedetails)))
  //   // setstudentdata((data) => {
  //   //   // return data.map((item) => {
  //   //   return { ...data, data.feedetails: JSON.parse(data.feedetails) };
  //   //   // });
  //   // });
  // }, [studentdata]);

  // let jsonObject;
  // useEffect(() => {

  // });
  return (
    <div ref={ref} className="container">
      <div className="page ">
        <div className="application ">
          <h5 className="text-center mt-5 ">Application Form</h5>

          <div className="row align-items-center">
            <div
              className="col-12 col-md-5 col-lg-5 col-xl-5 mt-2 "
              style={{ marginLeft: "10px" }}
            >
              <h5>
                <strong> Kapil Knowledge Hub Private Limited</strong>
              </h5>
              <p className="m-0 p-0"> CIN: U80100TG2018PTC123853</p>
              <p className="m-0 p-0">
                <strong>
                  <EmailIcon />
                </strong>
                info@teksacademy.com
              </p>
              <p className="m-0 p-0">
                <strong>
                  <LocalPhoneIcon />
                </strong>
                1800-120-4748
              </p>
              <p className="m-0 p-0">
                <strong>
                  <AlternateEmailIcon />
                </strong>
                www.teksacademy.com
              </p>
            </div>
            <div className="col-12 col-md-6 col-lg-6 col-xl-6 text-center mt-2">
              <img src={logo} style={{ width: "70%" }} />
              <p style={{ marginTop: "10px" }}>
                <strong> Branch:</strong>
                {studentdata.branch}
              </p>
            </div>
          </div>

          {/* <div className="row  ">
            <div className="col-5 col-md-5 col-lg-5 col-xl-5">
              <h4 style={{ marginLeft: "15px" }}>
                
                <strong> Kapil Knowledge Hub Private Limited</strong>
              </h4>
              <p>&nbsp;&nbsp; CIN: U80100TG2018PTC123853 </p>
              <p>
                &nbsp;&nbsp;
                <strong>
                  <EmailIcon />
                </strong>
                info@teksacademy.com
              </p>
              <p>
                &nbsp;&nbsp;
                <strong>
                  <LocalPhoneIcon />
                </strong>
                1800-120-4748
              </p>
              <p>
                &nbsp;&nbsp;
                <strong>
                  <AlternateEmailIcon />
                </strong>
                www.teksacademy.com
              </p>
            </div>
            <div className="col-7 col-md-7 col-lg-7 col-xl-7">
              <br />
              <img src={logo} style={{ width: "100%" }} />
             <h5 className="text-center" style={{ marginTop: "10px" }}>
                      
                      <strong className="fs-5"> Branch:</strong>
                      {studentdata.branch}
                    </h5>
                 
               
                <div className="col-7 col-md-7 col-lg-7 col-xl-7">
                  <h4 className="text-center" style={{ marginTop: "23px" }}>
               
                    <h5 className="text-start">
                      <strong className="fs-5"> Registration :</strong>
                      {studentdata.registrationnumber}
                    </h5>
                  </h4>
                </div>
            
            </div>
          </div> */}
          <br />
          <div className="admform-sd ">
            <h5
              className=" text-center caption py-1"
              style={{ fontWeight: "500" }}
            >
              Student Details
            </h5>
            <div className="row ">
              <div className="col-12 col-md-7 col-lg-8 col-xl-8">
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead> </thead>
                    <tbody>

                      <tr>
                        <td
                          style={{ background: "#e4ecff", width: "35%" }}
                        // className="w-25 borderleft "s
                        >
                          <b> Student Name</b>
                        </td>
                        <td colspan="4">{studentdata.name}</td>
                      </tr>
                      <tr>
                        <td style={{ background: "#e4ecff" }}>
                          <b>Parent Name</b>
                        </td>
                        <td colspan="4">{studentdata.parentsname}</td>
                      </tr>
                      <tr>
                        <td style={{ background: "#e4ecff" }}>
                          <b>Date of Birth</b>
                        </td>
                        <td colspan="4">
                          {BirthDate ? BirthDate.substring(0, 10) : "No Date"}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ background: "#e4ecff" }}>
                          <b>Gender</b>
                        </td>
                        <td colspan="4">{studentdata.gender}</td>
                      </tr>
                      <tr>
                        <td style={{ background: "#e4ecff" }}>
                          <b>Marital Status</b>
                        </td>
                        <td colspan="4">{studentdata.maritalstatus}</td>
                      </tr>
                      <tr>
                        <td style={{ background: "#e4ecff" }}>
                          <b>College/Company</b>
                        </td>
                        <td colspan="4">{studentdata.college}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className=" col-12 col-md-5 col-lg-4 col-xl-4 mt-4">
                {/* <img src={studentimg} /> */}
                {!studentdata.studentImg && (
                  <img src={profilePic} alt="photo" />
                )}
                {studentdata.studentImg && (
                  <img
                    src={`https://teksacademyimages.s3.amazonaws.com/${studentdata.studentImg}`}
                    alt="photo"
                  />
                )}
              </div>
            </div>
          </div>
          <br />
          <div className="admform-scd">
            <h5
              className=" text-center caption py-1"
              style={{ fontWeight: "500" }}
            >
              Student Contact Details
            </h5>
            <div className="row">
              <div className="table-responsive">
                <table className="table">
                  <tbody>

                    <tr>
                      <td
                        className="borderright"
                        style={{ background: "#e4ecff" }}
                      >
                        Country
                      </td>
                      <td className=" borderleft ">{studentdata.country} </td>
                      <td
                        className="borderright"
                        style={{ background: "#e4ecff" }}
                      >
                        Native Place
                      </td>
                      <td className=" borderleft">{studentdata.native}</td>
                    </tr>
                    <tr>
                      <td
                        className="borderright"
                        style={{ background: "#e4ecff" }}
                      >
                        State
                      </td>
                      <td className=" borderleft "> {studentdata.state} </td>
                      <td
                        className="borderright"
                        style={{ background: "#e4ecff" }}
                      >
                        Area
                      </td>
                      <td className="borderleft ">{studentdata.area}</td>
                    </tr>
                    <tr>
                      <td
                        className="borderright"
                        style={{ background: "#e4ecff" }}
                      >
                        Present Address
                      </td>
                      <td className=" borderleft  ">{studentdata.area} </td>
                      <td
                        className="borderright"
                        style={{ background: "#e4ecff" }}
                      >
                        ZipCode
                      </td>
                      <td className=" borderleft ">{studentdata.zipcode}</td>
                    </tr>
                    <tr>
                      <td
                        className="borderright"
                        style={{ background: "#e4ecff" }}
                      >
                        Mobile Number
                      </td>
                      <td className="borderleft ">{studentdata.mobilenumber}</td>
                      <td
                        className="borderright"
                        style={{ background: "#e4ecff" }}
                      >
                        WhatsApp Number
                      </td>
                      <td className="borderleft ">{studentdata.whatsappno}</td>
                    </tr>
                    <tr>
                      <td
                        className="borderright"
                        style={{ background: "#e4ecff" }}
                      >
                        Email Id
                      </td>
                      <td className="borderleft  ">{studentdata.email} </td>
                      <td className="borderright"></td>
                      <td className="borderleft "></td>
                      {/* <td className="borderright"></td>
                    <td className="w-25 borderleft "></td> */}
                    </tr>
                  </tbody>
                </table>
              </div>{" "}
            </div>
          </div>
          <br />
          <div className="admform-scd">
            <h5
              className=" text-center caption py-1"
              style={{ fontWeight: "500" }}
            >
              Education Details
            </h5>
            <div className="table-responsive">
              <table className="table">
                <tbody>


                  <tr>
                    <td
                      className="borderright"
                      style={{ background: "#e4ecff" }}
                    >
                      S.No
                    </td>

                    <td
                      className="borderright"
                      style={{ background: "#e4ecff" }}
                    >
                      Education
                    </td>
                    <td
                      className="borderright"
                      style={{ background: "#e4ecff" }}
                    >
                      Marks(Percentage)
                    </td>
                    <td
                      className="borderright"
                      style={{ background: "#e4ecff" }}
                    >
                      Acdemic Year
                    </td>
                  </tr>
                  <tr>
                    <td className=" borderleft"> 1 </td>
                    <td className=" borderleft">{studentdata.educationtype}</td>
                    <td className=" borderleft">{studentdata.marks}</td>
                    <td className=" borderleft">{studentdata.academicyear}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* <div className="admform-scd   ">
            <div
              className="text-center caption  "
              style={{ fontSize: "25px", fontWeight: "600" }}
            >
              Education Details
            </div>
            <div className="table-responsive">
              <table class="table table-bordered">
                <tbody>
                  <br />
                  <tr>
                    <td style={{ background: "#e4ecff" }}>
                      <b> S.No</b>
                    </td>
                    <th style={{ background: "#e4ecff" }}>
                      {" "}
                      <b>Education</b>
                    </th>
                    <th style={{ background: "#e4ecff" }}>
                      <b>Marks(Percentage)</b>
                    </th>
                    <th style={{ background: "#e4ecff" }}>
                      <b>Academic Year</b>
                    </th>
                  </tr>
                  <tr>
                    <td class="w-25">1</td>
                    <td class="w-25">{studentdata.educationtype}</td>
                    <td class="w-25">{studentdata.marks}</td>
                    <td class="w-25">{studentdata.academicyear}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div> */}
          <br />
          <div className="admform-scd page-break  mt-5">
            <h5
              className=" text-center caption py-1"
              style={{ fontWeight: "500" }}
            >
              Admission Details
            </h5>
          </div>
          <div classNamen="table-responsive my-3">
            <table className="table ">
              <tbody>

                <tr>
                  <td className="borderright" style={{ background: "#e4ecff" }}>
                    Enquiry Date
                  </td>
                  <td className=" borderleft  ">
                    {EnquiryDate ? EnquiryDate : "No Date"}
                  </td>
                  <td className="borderright" style={{ background: "#e4ecff" }}>
                    {" "}
                    Reg Number
                  </td>
                  <td className="borderleft ">
                    {studentdata.registrationnumber}
                  </td>
                  {/* <td className="borderright">Branch</td>
                    <td className="w-25 borderleft ">{studentdata.branch}</td> */}
                </tr>
                <tr>
                  <td className="borderright" style={{ background: "#e4ecff" }}>
                    {" "}
                    Enquiry Taken By{" "}
                  </td>
                  <td className="borderleft ">{studentdata.enquirytakenby}</td>
                  <td className="borderright" style={{ background: "#e4ecff" }}>
                    {" "}
                    Lead Source{" "}
                  </td>
                  {/* <td className="borderleft ">{studentdata.leadsource}</td> */}
                  {studentdata.leadsource &&
                    studentdata.leadsource.map((source) => (
                      <td className="borderleft ">{source.source}</td>
                    ))}
                </tr>
                <tr>
                  <td className="borderright" style={{ background: "#e4ecff" }}>
                    {" "}
                    Course Package{" "}
                  </td>
                  <td className="borderleft">{studentdata.coursepackage}</td>
                  <td className="borderright" style={{ background: "#e4ecff" }}>
                    {" "}
                    Course
                  </td>
                  <td className="borderleft">{studentdata.courses}</td>
                </tr>
                <tr>
                  <td className="borderright" style={{ background: "#e4ecff" }}>
                    {" "}
                    Admission Date{" "}
                  </td>
                  <td className="borderleft ">
                    {AdmissionDate ? AdmissionDate : "No Date"}
                  </td>
                  {/* <td className="borderright"> Admission Status </td> */}
                  {/* <td className="w-25 borderleft ">
                      {studentdata.admissionstatus}
                    </td> */}
                  <td className="borderright" style={{ background: "#e4ecff" }}>
                    {" "}
                    Mode of Training
                  </td>
                  <td className="borderleft ">{studentdata.modeoftraining}</td>
                </tr>
                <tr>
                  <td className="borderright" style={{ background: "#e4ecff" }}>
                    {" "}
                    Expected End Date{" "}
                  </td>
                  <td className="borderleft ">
                    {ExpectedEndDate ? ExpectedEndDate : "No Date"}
                  </td>
                  <td className="borderright" style={{ background: "#e4ecff" }}>
                    {" "}
                    Course Start Date
                  </td>
                  <td colspan="1" className="borderleft">
                    {CourseStartDate ? CourseStartDate : "No Date"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <br />
          <div className="admform-scd ">
            <h5
              className=" text-center caption py-1"
              style={{ fontWeight: "500" }}
            >
              Fee Details
            </h5>
            <div className="table-responsive">
              <table className="table table-bordered">
                <tbody>

                  <tr>
                    <td style={{ background: "#e4ecff" }}>
                      <b> Fees Type</b>
                    </td>
                    <td style={{ background: "#e4ecff" }}>
                      <b> Fee Amount</b>{" "}
                    </td>
                    <td style={{ background: "#e4ecff" }}>
                      {" "}
                      <b>Discount</b>{" "}
                    </td>
                    <td style={{ background: "#e4ecff" }}>
                      <b>Tax</b>
                    </td>
                    <td className="col-sm-4" style={{ background: "#e4ecff" }}>
                      <b>Total Fee</b>
                    </td>
                  </tr>

                  {studentdata.feedetails &&
                    studentdata.feedetails.map((item, index) => (
                      <tr key={index}>
                        <td>{item.feetype}</td>
                        <td>
                          {Number(
                            parseFloat(item.amount).toFixed(2)
                          ).toLocaleString("en-IN")}
                        </td>
                        <td>
                          {item.discount &&
                            Number(
                              parseFloat(item.discount).toFixed(2)
                            ).toLocaleString("en-IN")}
                          {!item.discount && <>0</>}
                        </td>
                        <td>
                          {" "}
                          {Number(
                            parseFloat(item.taxamount).toFixed(2)
                          ).toLocaleString("en-IN")}
                        </td>
                        <td>
                          {Number(
                            parseFloat(item.totalamount).toFixed(2)
                          ).toLocaleString("en-IN")}{" "}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          <br />
          <div className="admform-scd">
            <h5
              className=" text-center caption py-1"
              style={{ fontWeight: "500" }}
            >
              Assets
            </h5>
            <div className="table-responsive">
              <table className="table table-bordered">
                <tbody>


                  <tr>
                    <td style={{ background: "#e4ecff" }}>
                      <b> Provided</b>
                    </td>
                    <td>
                      {studentdata.assets &&
                        studentdata.assets.map((item, index) => (
                          <>
                            {item}
                            {index !== studentdata.assets.length - 1 && (
                              <span>, </span>
                            )}
                          </>
                        ))}
                    </td>
                    {/* <ul>
                      {studentdata.assets &&
                        studentdata.assets.map((asset, index) => (
                          <li key={index}>{asset}</li>
                        ))}
                    </ul> */}
                    <td style={{ background: "#e4ecff" }}>
                      <b> Issue Date</b>
                    </td>
                    <td>{IssueDate}</td>
                  </tr>

                  <tr>
                    <td style={{ background: "#e4ecff" }}>
                      <b> Comments</b>
                    </td>
                    <td colspan="4">{studentdata.admissionremarks}</td>
                  </tr>
                  <tr>
                    <td colspan="4" style={{ height: "100px" }}>
                      <strong> For Office Purpose</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="main-tc page-break">
        <div className="tc">
          <div>
            <h4 className="tclogo"> Terms & Conditions</h4>
          </div>
          <div className="info">
            <strong> 1. Admission :</strong>
            <ul style={{ listStyleType: "bulets" }}>
              <li>
                Students must provide all required documents and information during the admission process.
              </li>
              <li>
                Admission will be confirmed only after payment of the booking amount, as decided by the management from time to time.
              </li>
            </ul>
            <strong> 2.Fees:</strong>

            <ul style={{ listStyleType: "bulets" }}>
              <li >
                Students shall pay the course fees as per the due dates / terms mentioned overleaf. Fees shall not refundable/non-transferable/non-adjustable, under any circumstances.
              </li>

              <li>	Late payment of fees shall attract penal interest @1.5% per month.
              </li>
              <li>
                Teks academy reserves its right to cancel the admission, in case of non-payment of fees, as per the agreed due dates.
              </li>
              <li>
                Course fees may vary from student to student, based on their merit and other relevant factors as determined by the Teks Academy (“Academy) administration, at its sole discretion.
              </li>

            </ul>
            <strong> 3. Course Material :</strong>
            <ul style={{ listStyleType: "bulets" }}>
              <li>
                The course material provided by the Academy is the intellectual property of Teks Academy and cannot be reproduced or used for commercial purposes without written permission of the Academy.
              </li>
              <li>
                Any damage or loss of course material will be the responsibility of the student and shall attract additional charges for extra material copy of the course material as decided by the administration from time to time.
              </li>
            </ul>
            <strong> 4. Attendance :</strong>
            <ul style={{ listStyleType: "bulets" }}>
              <li>
                Regular attendance is essential for successfully completing the course and obtaining a certificate.
              </li>
              <li>
                In case of Continuous absence of 3 classes, without intimation, Academy reserves its right, to terminate the admission.
              </li>
              <li>
                In case of absence, Make-up / Extra classes may be arranged at the discretion of the Academy and subject to availability of resources. For clarity, the Academy is not obliged to provide the makeup/extra classes.
              </li>
            </ul>

            <strong> 5. Conduct:</strong>
            <ul style={{ listStyleType: "bulets" }}>
              <li>
                Students must conduct themselves respectfully towards the Academy staff, fellow students, and not spoil the Academy's property.
              </li>
              <li>
                Any form of harassment, discrimination, or bullying will not be tolerated and may lead to immediate expulsion of the student from the Academy.
              </li>
              <li>
                Use of drugs or alcohol within the Academy's premises is strictly prohibited and shall lead to immediate expulsion from the Academy.
              </li>
            </ul>

            <div className="page-break pt-5 ">
              <strong> 6. Certification :</strong>
              <ul style={{ listStyleType: "bulets" }}>
                <li>
                  Certificates will be awarded to students who successfully complete the course as per the Academy's criteria, as decided by the management from time to time.
                </li>
                <li>
                  The certificate does not guarantee employment or acceptance/admission into any institution.
                </li>

              </ul>
            </div>

            <strong> 7. Liability :</strong>
            <ul style={{ listStyleType: "bulets" }}>
              <li>
                The Academy is not responsible for any injury, loss, or damage to the students or their belongings within the Academy's premises or during any offsite activity.
              </li>
              <li>
                Students must take responsibility for their personal safety and belongings while attending classes at the Academy or any other location..
              </li>
            </ul>
            <strong> 8. Change in Policies:</strong>
            <ul style={{ listStyleType: "bulets" }}>
              <li>
                The Academy may revise its policies, rules and regulations, course structure, fees, timings, or any other aspect of the Academy at its sole discretion from time to time, without prior notice to the students.
              </li>
              <li>
                Such revised policies will be applicable to all existing and new students.
              </li>
            </ul>
            <strong> 9. Dispute Resolution :</strong>
            <ul style={{ listStyleType: "bulets" }}>
              <li>
                Any dispute arising out of or related to these terms and conditions shall be resolved amicably through mutual discussion and agreement between the Academy and the student. Any unresolved dispute shall be subject to the jurisdiction of the courts of Hyderabad, Telangana, India.
              </li>
            </ul>
            <strong> 10. Termination of Admission :</strong>
            <ul style={{ listStyleType: "bulets" }}>
              <li>
                The Academy reserves the right to terminate the admission of any student at any time, without assigning any reason.
              </li>
              <li>
                In such cases, Academy may at its sole discretion, refund a portion of the fees that completely depends on Academy’s decision and on the duration of the course completed by the student.
              </li>
            </ul>

            <strong> 11. No Placement Guarantee:</strong>
            <ul style={{ listStyleType: "bulets" }}>
              <li>
                The Academy does not provide any placement guarantee to the students but may assist them in finding suitable job opportunities through guidance, counseling.
              </li>
            </ul>

            <strong>12. Using Id Card:</strong>
            <ul style={{ listStyleType: "bulets" }}>
              <li>
                Each student will be issued an identification card (ID card) by the Academy, and it must be carried by the student at all times while attending classes or any other activities conducted by the Academy.
              </li>
            </ul>
            <div className="page-break pt-5 ">
              <strong> 13. Copying Institute Content :</strong>
              <ul style={{ listStyleType: "bulets" }}>
                <li>
                  Distributing any of the any other Academy's / Coaching centers brochures /course material, including lectures, notes, presentations, or any other content, promoting of any other coaching institutes is strictly prohibited. Any violation of this rule may lead to immediate expulsion from the Academy and legal action may be taken against the student.
                </li>
              </ul></div>
            <strong>14. Teaching Staff:</strong>
            <ul style={{ listStyleType: "bulets" }}>
              <li>
                While the Academy will endeavor to provide training with a specific teaching staff member, there is no commitment to do so.
              </li>
              <li>
                The Academy reserves the right to assign trainers based on availability, and students cannot demand a specific trainer.
              </li>
            </ul>
            <strong>15. Course Curriculum:</strong>
            <ul style={{ listStyleType: "bulets" }}>
              <li>
                The Academy reserves the right to update the course curriculum at its discretion, without any prior notice to the students.
              </li>
              <li>
                Students are expected to keep themselves updated with any changes in the course curriculum.
              </li>


            </ul>
            <strong> 16. Course Duration: </strong>
            <ul style={{ listStyleType: "bulets" }}>
              <li>
                The course duration may vary from batch to batch, depending on factors such as students' attendance, training methodology, and other relevant factors as determined by the Academy.
              </li>
              <li>
                The Academy reserves the right to change the course duration at any time without prior notice.
              </li>
            </ul>
            <strong>17. Paid Internship Support:</strong>
            <ul style={{ listStyleType: "bulets" }}>
              <li>
                The Academy may assist students in finding suitable paid internships based on their skills and interests.
              </li>
              <li>
                The Academy will not guarantee any specific internship or job placement.
              </li>
              <li>
                The Academy may charge a separate fee for providing internship support services.
              </li>
              <li>
                The Academy will not be liable for any issues or disputes that arise between the student and the internship provider.
              </li>
            </ul>
            <strong>18. Project Assignment:</strong>
            <ul style={{ listStyleType: "bulets" }}>
              <li>
                The Academy may provide practice projects to the students for upgrading their learning and skill development.
              </li>
              <li>
                The projects assigned may be either Capstone, live or previously completed projects, depending on availability and suitability.
              </li>
              <li>
                Students must complete the project within the given time frame and submit it to the Academy for evaluation.
              </li>
            </ul>
            <div className="page-break pt-2">
              <strong> 19. Intellectual Property:</strong>
              <ul style={{ listStyleType: "bulets" }}>
                <li>
                  All intellectual property created by students during the live project or internship belongs to the Academy.
                </li>
                <li>
                  The Academy may use such intellectual property for promotional or educational purposes, at its sole discretion.
                </li>
                <li>
                  The Academy will not claim any ownership rights over the student's intellectual property.
                </li>
              </ul>
            </div>
            <strong>Privacy Policy:</strong>
            <br />
            <br />
            <strong> 1. Information Collection :</strong>
            <ul>
              <li>
                We collect personal information such as name, email address, phone number, and other details from students at the time of enrollment.
              </li>
            </ul>
            <strong> 2. Use of Information:</strong>
            <ul>
              <li>
                We use the information collected to contact students regarding course updates, provide course materials, and issue certificates of completion.
              </li>
            </ul>
            <strong> 3. Information Sharing:</strong>
            <ul>
              <li>
                We do not share personal information with any third parties without the student's consent, except as required by law.
              </li>
            </ul>

            <strong> 4. Security:</strong>
            <ul>
              <li>
                We take reasonable measures to ensure the security of the personal information collected from students.
              </li>
            </ul>

            <strong> 5. Cookies:</strong>
            <ul>
              <li>
                We use cookies on our website to track user behavior and improve the user experience. Students can disable cookies in their web browser if they choose to do so.
              </li>
            </ul>
            <strong>6. Data Retention :</strong>
            <ul>
              <li>
                We retain personal information for as long as necessary to provide the course and related services, or until the student requests that their information be deleted.
              </li>
            </ul>
            <strong>7. Modification :</strong>

            <ul>
              <li>
                We reserve the right to modify this privacy policy at any time without prior notice. </li>
            </ul>
            <p> By signing this form, you acknowledge that you have read, understood, and agree to abide by the terms and conditions and privacy policy.</p>
            <p>Further I hereby give my consent for Kapil Group of Companies or Teks Academy and its affiliates, to send their promotional emails/communication to me.</p>
            <div className="sign row">
              <div className="col-6">
                <h6>Date :</h6>
                <h6> Place :</h6>
              </div>
              <div className="col-6">
                <h6>Counsellor Signature : </h6>
                <h6> Student Signature : </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

function StudentApplicationPrint() {
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
          className="btn btn-color "
        >
          {/* <LocalPrintshopIcon /> */}
          Print
        </button>
      </div>
      <PrintableComponent ref={componentRef} />
    </div>
  );
}

export default StudentApplicationPrint;
