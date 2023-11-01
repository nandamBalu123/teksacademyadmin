import React from "react";
import { useReactToPrint } from "react-to-print";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import logo from "../../../../images/Teks-Logo-with-Trade.png";
import "./StudentApplication.css";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const PrintableComponent = React.forwardRef((props, ref) => {
  const { id } = useParams();

  const [studentdata, setstudentdata] = useState([]);

  useEffect(() => {
    // Make a GET request to your backend API endpoint
    axios
      .get(`${process.env.REACT_APP_API_URL}/viewstudentdata/${id}`)
      .then((response) => {
        // Handle the successful response here
        // response.data[0].feedetails = JSON.parse(response.data[0].feedetails);
        setstudentdata(response.data[0]); // Update the data state with the fetched data
        // setstudentdata()
        // console.log("studentdata", response.data[0].feedetails);
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error("Error fetching data:", error);
      });
  }, []);
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
    <div ref={ref}>
      <div className="page">
        <div className="application">
          <h3 className="text-center mt-2 "> Application Form </h3>
          <div className="row  ">
            <div className="col-5 col-md-5 col-lg-5 col-xl-5">
              <h4 style={{ marginLeft: "15px", marginTop: "25px" }}>
                {" "}
                <strong> Kapil Knowledge Hub Private Limited</strong>
              </h4>
              <p>&nbsp;&nbsp; CIN: U80100TG2018PTC123853 </p>
              <p>
                &nbsp;&nbsp;{" "}
                <strong>
                  <EmailIcon />
                </strong>
                info@teksacademy.com{" "}
              </p>
              <p>
                &nbsp;&nbsp;{" "}
                <strong>
                  <LocalPhoneIcon />
                </strong>{" "}
                1800-120-4748
              </p>
              <p>
                &nbsp;&nbsp;
                <strong>
                  <AlternateEmailIcon />{" "}
                </strong>{" "}
                www.teksacademy.com{" "}
              </p>
            </div>
            <div className="col-7 col-md-7 col-lg-7 col-xl-7">
              <br />
              <img src={logo} className="tekslogo" style={{ width: "100%" }} />
              <div className="row">
                <div className="col-5 col-md-5 col-lg-5 col-xl-5">
                  <h4 className="text-center" style={{ marginTop: "23px" }}>
                    {" "}
                    <h5 className="text-start">
                      {" "}
                      <strong className="fs-5"> Branch:</strong>{" "}
                      {studentdata.branch}
                    </h5>
                  </h4>
                </div>
                <div className="col-7 col-md-7 col-lg-7 col-xl-7">
                  <h4 className="text-center" style={{ marginTop: "23px" }}>
                    {" "}
                    <h5 className="text-start">
                      <strong className="fs-5"> Registration :</strong>
                      {studentdata.registrationnumber}
                    </h5>
                  </h4>
                </div>{" "}
              </div>
            </div>
          </div>

          <div className="admform-sd  mt-4 ">
            <div
              className=" text-center caption "
              style={{ fontSize: "25px", fontWeight: "600" }}
            >
              {" "}
              Student Details
            </div>
            <div className="row ">
              <div className="col-8 col-md-8 col-lg-8 col-xl-8">
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead> </thead>
                    <tbody>
                      <tr>
                        {" "}
                        <th style={{ width: "30.66%" }}> Student Name</th>{" "}
                        <td colspan="4">{studentdata.name}</td>{" "}
                      </tr>
                      <tr>
                        {" "}
                        <th>Parent Name </th>{" "}
                        <td colspan="4">{studentdata.parentsname}</td>{" "}
                      </tr>
                      <tr>
                        {" "}
                        <th> Date of Birth</th>{" "}
                        <td colspan="4">
                          {studentdata.birthdate
                            ? studentdata.birthdate.substring(0, 10)
                            : "No Date"}
                        </td>{" "}
                      </tr>
                      <tr>
                        {" "}
                        <th>Gender </th>{" "}
                        <td colspan="4">{studentdata.gender}</td>{" "}
                      </tr>
                      <tr>
                        {" "}
                        <th>Marital Status </th>{" "}
                        <td colspan="4">{studentdata.maritalstatus}</td>{" "}
                      </tr>
                      <tr>
                        {" "}
                        <th> College/Company</th>{" "}
                        <td colspan="4">{studentdata.college}</td>{" "}
                      </tr>
                    </tbody>
                  </table>
                </div>{" "}
              </div>
              <div className=" col-4 col-md-4 col-lg-4 col-xl-4">
                <img src="" />
              </div>
            </div>
          </div>
          <div className="admform-scd ">
            <div
              className="text-center caption"
              style={{ fontSize: "25px", fontWeight: "600" }}
            >
              {" "}
              Student Contact Details{" "}
            </div>
            {/* <div>
  <div className="row">
    <div className="col-3 borderright"><b> Country</b></div>
    <div className="col-3 borderleft ">a</div>

    <div className="col-3 borderright">a</div>
    <div className="col-3 borderleft">a</div>

  </div>
  <div className="row">
  <div className="col-3 borderright"><b> Country</b></div>
    <div className="col-3 borderleft ">a</div>

    <div className="col-3 borderright">a</div>
    <div className="col-3 borderleft">a</div>

  </div>
  <div className="row">
  <div className="col-3 borderright"><b> Country</b></div>
    <div className="col-3 borderleft ">a</div>

    <div className="col-3 borderright">a</div>
    <div className="col-3 borderleft">a</div>

  </div>
  <div className="row">
  <div className="col-3 borderright"><b> Country</b></div>
    <div className="col-3 borderleft ">a</div>

    <div className="col-3 borderright">a</div>
    <div className="col-3 borderleft">a</div>

  </div>
  <div className="row">
  <div className="col-3 borderright"><b> Country</b></div>
    <div className="col-3 borderleft ">a</div>

    <div className="col-3 borderright">a</div>
    <div className="col-3 borderleft">a</div>

  </div>
</div> */}

            <div className="table-responsive">
              <table className="table">
                <tbody>
                  <br />
                  <tr>
                    {" "}
                    <td className="borderright">Country</td>{" "}
                    <td className="w-25 borderleft ">{studentdata.country} </td>
                    <td className="borderright">Native Place</td>{" "}
                    <td className="w-25 borderleft">{studentdata.native}</td>{" "}
                  </tr>
                  <tr>
                    {" "}
                    <td className="borderright">State</td>{" "}
                    <td className="w-25 borderleft "> {studentdata.state} </td>
                    <td className="borderright">Area</td>
                    <td className="w-25 borderleft ">
                      {studentdata.area}
                    </td>{" "}
                  </tr>
                  <tr>
                    {" "}
                    <td className="borderright">Present Address</td>{" "}
                    <td className="w-25 borderleft  ">{studentdata.area} </td>{" "}
                    <td className="borderright"> ZipCode</td>{" "}
                    <td className="w-25 borderleft ">{studentdata.zipcode}</td>{" "}
                  </tr>
                  <tr>
                    {" "}
                    <td className="borderright"> Mobile Number </td>{" "}
                    <td className="w-25 borderleft ">
                      {" "}
                      {studentdata.mobilenumber}
                    </td>{" "}
                    <td className="borderright"> WhatsApp Number</td>{" "}
                    <td className="w-25 borderleft ">
                      {studentdata.whatsappno}
                    </td>{" "}
                  </tr>
                  <tr>
                    {" "}
                    <td className="borderright"> Email Id </td>{" "}
                    <td className="w-25 borderleft  " colSpan={3}>
                      {studentdata.email}{" "}
                    </td>{" "}
                    {/* <td className="borderright"></td>{" "}
                    <td className="w-25 borderleft "></td>{" "} */}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="admform-scd  page-break ">
              <div
                className="text-center caption  "
                style={{ fontSize: "25px", fontWeight: "600" }}
              >
                {" "}
                Education Details{" "}
              </div>
              <div className="table-responsive">
                <table class="table table-bordered">
                  <tbody>
                    <br />
                    <tr>
                      {" "}
                      <th>S No</th> <th> Education</th> <th> Marks Secured</th>{" "}
                      <th> Academic Year</th>{" "}
                    </tr>
                    <tr>
                      {" "}
                      <td class="w-25">1</td>{" "}
                      <td class="w-25">{studentdata.educationtype}</td>{" "}
                      <td class="w-25">{studentdata.marks}</td>{" "}
                      <td class="w-25">{studentdata.academicyear}</td>{" "}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="admform-scd  mt-3">
              <div
                className="text-center caption"
                style={{ fontSize: "25px", fontWeight: "600" }}
              >
                {" "}
                Admission Details{" "}
              </div>
            </div>
            <div classNamen="table-responsive">
              <table className="table ">
                <tbody>
                  <br />
                  <tr>
                    {" "}
                    <td className="borderright">Enquiry Date</td>{" "}
                    <td className="w-25 borderleft  ">
                      {" "}
                      {studentdata.enquirydate
                        ? studentdata.enquirydate.substring(0, 10)
                        : "No Date"}
                    </td>{" "}
                    <td className="borderright">Branch</td>{" "}
                    <td className="w-25 borderleft ">{studentdata.branch}</td>{" "}
                  </tr>
                  <tr>
                    {" "}
                    <th className="borderright"> Enquiry Taken By </th>{" "}
                    <td className="w-25 borderleft ">
                      {studentdata.enquirytakenby}{" "}
                    </td>{" "}
                    <td className="borderright"> Lead Source </td>{" "}
                    <td className="w-25 borderleft ">
                      {studentdata.leadsource}
                    </td>{" "}
                  </tr>
                  <tr>
                    {" "}
                    <td className="borderright"> Course Package </td>{" "}
                    <td className="w-25 borderleft">
                      {studentdata.coursepackage}{" "}
                    </td>{" "}
                    <td className="borderright"> Course</td>{" "}
                    <td className="w-25 borderleft">{studentdata.courses}</td>{" "}
                  </tr>
                  <tr>
                    {" "}
                    <td className="borderright"> Admission Status </td>{" "}
                    <td className="w-25 borderleft ">
                      {studentdata.admissionstatus}{" "}
                    </td>{" "}
                    <td className="borderright"> Mode of Training</td>{" "}
                    <td className="w-25 borderleft ">
                      {studentdata.modeoftraining}
                    </td>{" "}
                  </tr>
                  <tr>
                    {" "}
                    <td className="borderright"> Admission Date </td>
                    <td className="w-25 borderleft ">
                      {studentdata.admissiondate
                        ? studentdata.admissiondate.substring(0, 10)
                        : "No Date"}{" "}
                    </td>{" "}
                    <td className="borderright"> Course Start Date</td>{" "}
                    <td colspan="1" className="w-25 borderleft">
                      {" "}
                      {studentdata.validitystartdate
                        ? studentdata.validitystartdate.substring(0, 10)
                        : "No Date"}{" "}
                    </td>{" "}
                  </tr>
                  <tr>
                    {" "}
                    <td className="borderright"> Expected End Date </td>
                    <td className="w-25 borderleft ">
                      {studentdata.validityenddate
                        ? studentdata.validityenddate.substring(0, 10)
                        : "No Date"}{" "}
                    </td>{" "}
                    <td className="borderright"> Reg Number</td>
                    <td colspan="1" className="w-25 borderleft ">
                      {" "}
                      {studentdata.registrationnumber}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="admform-scd">
            <div
              className="text-center caption"
              style={{ fontSize: "25px", fontWeight: "600" }}
            >
              {" "}
              Fee Detail{" "}
            </div>
            <div className="table-responsive">
              <table className="table table-bordered">
                <tbody>
                  <br />
                  <tr>
                    <th> Fees Type </th>
                    <th> Fee Amount </th>
                    <th> Discount </th>
                    <th> Tax </th>
                    <th className="col-sm-4"> Total Fee </th>
                  </tr>

                  {studentdata.feedetails &&
                    JSON.parse(studentdata.feedetails).map((item, index) => (
                      <tr key={index}>
                        <td>{item.feetype}</td>
                        <td>{item.amount}</td>
                        <td>{item.discount}</td>
                        <td>{parseFloat(item.taxamount).toFixed(2)}</td>
                        <td>{item.totalamount} </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="admform-scd">
            <div
              className="text-center caption"
              style={{ fontSize: "25px", fontWeight: "600" }}
            >
              {" "}
              Assets{" "}
            </div>
            <div className="table-responsive">
              <table className="table table-bordered">
                <tbody>
                  <br />

                  <tr>
                    {" "}
                    <th> Provided </th>{" "}
                    <td className="w-25">
                      {studentdata.assets && studentdata.assets}
                    </td>{" "}
                    <th> Issue Date </th>{" "}
                    <td className="w-25">{studentdata.admissiondate}</td>{" "}
                  </tr>

                  <tr>
                    {" "}
                    <th> Comments </th>{" "}
                    <td className="w-25" colspan="4">
                      {studentdata.admissionremarks}
                    </td>{" "}
                  </tr>
                  <tr>
                    {" "}
                    <td class="w-25" colspan="4" style={{ height: "100px" }}>
                      <strong> For Office Purpose</strong>{" "}
                    </td>{" "}
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
            {" "}
            <h2 className="tclogo"> Terms & Conditions</h2>
          </div>
          <div className="info">
            <strong> 1. Admission :</strong>
            <ul>
              {" "}
              <li>
                {" "}
                The eligibility criteria for each course will be clearly
                communicated to the students before admission, and students must
                provide all required documents and information during the
                admission process.
              </li>
              <li>
                {" "}
                Admission will be confirmed only after the completion of all
                formalities and payment of full fees.
              </li>
            </ul>
            <strong> 2.Fees:</strong>
            <ul>
              {" "}
              <li>
                {" "}
                Fees for each course will be clearly communicated to the
                students before admission, and they are non-refundable except in
                case of course cancellation by the center or extenuating
                circumstances that prevent the student from continuing the
                course, in both the cases payment will be refunded after
                deductions.
              </li>
              <li>
                {" "}
                No course fee adjustment will be allowed from one course to
                another course.
              </li>
              <li>
                {" "}
                No course fee adjustment will be allowed from one student to
                another student
              </li>
              <li>
                {" "}
                Any request for course fee adjustment will not be entertained by
                the coaching center under any circumstances.
              </li>
              <li> All course fees are non-transferable and non-refundable.</li>
              <li>
                {" "}
                Students are advised to choose their courses carefully and make
                sure that they are fully committed to the course before paying
                the course fee.
              </li>
              <li>
                {" "}
                In case a student is unable to complete the course due to valid
                reasons, the course fee will not be refunded or adjusted against
                any other course.
              </li>
              <li>
                Late payment of fees may attract additional charges as per the
                center's policy.
              </li>
            </ul>
            <strong> 3. Course Material :</strong>
            <ul>
              {" "}
              <li>
                {" "}
                The course material and digital goods provided by the coaching
                center is copyrighted and cannot be reproduced or used for
                commercial purposes without permission.
              </li>
              <li>
                {" "}
                Any damage or loss of course material will be the responsibility
                of the student and may attract additional charges for extra
                material copy as per the center's policy.
              </li>
            </ul>
            <strong> 4. Attendance :</strong>
            <ul>
              <li>
                Regular attendance is essential for successfully completing the
                course and obtaining a certificate.
              </li>
              <li>
                {" "}
                Students must inform the center in advance if they are unable to
                attend a class due to valid reasons such as illness or
                emergencies.
              </li>
              <li>
                {" "}
                Make-up classes may be arranged at the discretion of the center
                and subject to availability of resources.
              </li>
            </ul>
            <br />
            <strong> 5. Conduct:</strong>
            <ul>
              {" "}
              <li>
                {" "}
                Students must conduct themselves respectfully towards the center
                staff, fellow students, and the center's property.
              </li>
              <li>
                {" "}
                Any form of harassment, discrimination, or bullying will not be
                tolerated and may lead to immediate expulsion from the center.
              </li>
              <li>
                {" "}
                The use of drugs or alcohol within the center's premises is
                strictly prohibited and may lead to immediate expulsion from the
                center.
              </li>
            </ul>
            <strong> 6. Examinations :</strong>
            <ul>
              {" "}
              <li>
                {" "}
                The examination schedule and format will be communicated to the
                students in advance.
              </li>
              <li>
                {" "}
                Students must adhere to the rules and regulations of the
                examination, and any deviation may lead to disqualification or
                cancellation of the examination.
              </li>
              <li>
                {" "}
                Students must return all examination papers and materials to the
                center after the examination is over.
              </li>
            </ul>
            <strong> 7.certificate :</strong>
            <ul>
              <li className="pt-5">
                The certificate will only be awarded to students who
                successfully complete the course as per the center's criteria.
              </li>
              <li>
                {" "}
                The certificate does not guarantee employment or acceptance into
                any institution.
              </li>
            </ul>
            <strong> 8. Liability :</strong>
            <ul>
              <li>
                The center is not responsible for any injury, loss, or damage to
                the students or their belongings within the center's premises or
                during any offsite activity.
              </li>
              <li>
                {" "}
                Students must take responsibility for their personal safety and
                belongings while attending classes at the center or any other
                location.
              </li>
            </ul>
            <strong> 9. Change in Policies:</strong>
            <ul>
              <li>
                The center may revise its policies, rules and regulations,
                course structure, fees, timings, or any other aspect of the
                coaching center from time to time without prior notice to the
                students.
              </li>
              <li>
                {" "}
                The revised policies will be applicable to all existing and new
                students
              </li>
            </ul>
            <strong> 10. Dispute Resolution :</strong>
            <ul>
              {" "}
              <li>
                {" "}
                Any dispute arising out of or related to these terms and
                conditions shall be resolved amicably through mutual discussion
                and agreement between the coaching center and the student.
              </li>
            </ul>
            <strong> 11. Termination of Admission :</strong>
            <ul>
              {" "}
              <li>
                {" "}
                The center reserves the right to terminate the admission of any
                student at any time, without assigning any reason.
              </li>
              <li>
                {" "}
                In such cases, the center may refund a portion of the fees that
                completely depends on centers decision and on the duration of
                the course completed by the student and the center's policy.
              </li>
            </ul>
            <strong> 12. Placement Guarantee:</strong>
            <ul>
              {" "}
              <li>
                {" "}
                The center does not provide any placement guarantee to the
                students but may assist them in finding suitable job
                opportunities through guidance, counseling, and if any
                recommendations.
              </li>
            </ul>
            <strong>13. Using Id Card:</strong>
            <ul>
              <li>
                {" "}
                Each student will be issued an identification card (ID card) by
                the coaching center, and it must be carried by the student at
                all times while attending classes or any other activities
                conducted by the center.
              </li>
            </ul>
            <strong> 14. Copying Institute Content :</strong>
            <ul>
              <li>
                Copying or distributing any of the coaching center's course
                material, including lectures, notes, presentations, or any other
                content, is strictly prohibited. Any violation of this rule may
                lead to immediate expulsion from the center and legal action may
                be taken against the student.
              </li>
            </ul>
            <strong>15. Absconding:</strong>
            <ul>
              <li>
                Absconding, or leaving the coaching center without informing the
                center authorities, is not permitted. In case a student wishes
                to discontinue the course, they must inform the center in
                writing and complete all formalities as required.
              </li>
            </ul>
            <strong>16. Attendance and Absence:</strong>
            <ul>
              <li>
                Regular attendance is important for the successful completion of
                the course.
              </li>
            </ul>
            <ul>
              <li>
                Students must inform the center in advance if they are unable to
                attend a class due to valid reasons such as illness or
                emergencies.
              </li>
            </ul>
            <ul>
              {" "}
              <li>
                {" "}
                If a student is absent for 3 consecutive days without
                intimation, their admission may be terminated without refund.
              </li>
            </ul>
            <strong> 17. Teaching Staff: </strong>
            <ul>
              {" "}
              <li>
                {" "}
                While the center will endeavor to provide training with a
                specific teaching staff, there is no commitment to do so.
              </li>
              <li>
                {" "}
                The center reserves the right to assign trainers on the basis of
                availability, and students cannot demand a specific trainer.
              </li>
            </ul>
            <strong>18. Course Fees:</strong>
            <ul>
              {" "}
              <li>
                {" "}
                The course fees may vary from student to student, based on their
                merit and other relevant factors as determined by the center.
              </li>
              <li>
                {" "}
                The center reserves the right to change the course fees at any
                time without prior notice.
              </li>
            </ul>
            <strong>19. Course Curriculum:</strong>
            <ul>
              <li>
                {" "}
                The center reserves the right to update the course curriculum as
                per its requirements, without any prior notice to the students.
              </li>
              <li>
                {" "}
                Students are expected to keep themselves updated with any
                changes in the course curriculum.
              </li>
            </ul>
            <strong> 20. Course Duration:</strong>
            <ul className="pt-5">
              <li>
                The course duration may vary from batch to batch, depending on
                factors such as students' attendance, training methodology, and
                other relevant factors as determined by the center.
              </li>
              <li>
                {" "}
                The center reserves the right to change the course duration at
                any time without prior notice.
              </li>
            </ul>
            <strong>21. Paid Internship Support: </strong>
            <ul>
              <li>
                The coaching center may assist students in finding suitable paid
                internships based on their skills and interests.
              </li>
              <li>
                The coaching center will not guarantee any specific internship
                or job placement.
              </li>
              <li>
                The coaching center may charge a separate fee for providing
                internship support services.
              </li>
              <li>
                The coaching center will not be liable for any issues or
                disputes that arise between the student and the internship
                provider.
              </li>
            </ul>
            <strong>22. Project Assignment : </strong>
            <ul>
              {" "}
              <li>
                {" "}
                The coaching center will provide practice projects to the
                students for their learning and skill development.
              </li>
              <li>
                {" "}
                The projects assigned may be either live or previous completed
                projects, depending on availability and suitability.
              </li>
              <li>
                {" "}
                Students must complete the project within the given time frame
                and submit it to the center for evaluation.
              </li>
            </ul>
            <strong>23.Intellectual Property:</strong>
            <ul>
              {" "}
              <li>
                {" "}
                All intellectual property created by students during the live
                project or internship will belong to the student.
              </li>
              <li>
                {" "}
                The coaching center may use such intellectual property for
                promotional or educational purposes with the student's consent.
              </li>
              <li>
                {" "}
                The coaching center will not claim any ownership rights over the
                student's intellectual property.
              </li>
            </ul>
            <strong>Privacy Policy:</strong>
            <br />
            <strong> 1. Information Collections :</strong>
            <ul>
              <li>
                {" "}
                The coaching center will not claim any ownership rights over the
                student's intellectual property.
              </li>
            </ul>
            <strong> 2. Use of Information:</strong>
            <ul>
              <li>
                {" "}
                We use the information collected to contact students regarding
                course updates, provide course materials, and issue certificates
                of completion.
              </li>
            </ul>
            <strong> 3. Information Sharing:</strong>
            <ul>
              <li>
                We do not share personal information with any third parties
                without the student's consent, except as required by law.
              </li>
            </ul>
            <strong> 4. Security:</strong>
            <ul>
              <li>
                We take reasonable measures to ensure the security of the
                personal information collected from students.
              </li>
            </ul>
            <strong> 5. Cookies:</strong>
            <li>
              We use cookies on our website to track user behavior and improve
              the user experience. Students can disable cookies in their web
              browser if they choose to do so.
            </li>
            <strong>6. Data Retention</strong>
            <ul>
              {" "}
              <li>
                {" "}
                We retain personal information for as long as necessary to
                provide the course and related services, or until the student
                requests that their information be deleted.
              </li>
            </ul>
            <br />
            <br />
            <strong>7. Modification</strong>
            <br />
            <ul>
              <li>
                We reserve the right to modify this privacy policy at any time
                without prior notice.
              </li>
            </ul>
            By enrolling in our coaching center, you acknowledge that you have
            read, understood, and agree to abide by our terms and conditions and
            privacy policy.
            <div className="sign">
              <h6>Counsellor Signature</h6>
              <h6> Student Signature</h6>
            </div>{" "}
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
      <div className="w-50  mt-3">
        <button
          onClick={handlePrint}
          // style={{ margin: "30px" }}
          className="btn btn-primary mb-3 m-auto"
        >
          {" "}
          {/* <LocalPrintshopIcon />{" "} */}
          Print
        </button>
      </div>
      <PrintableComponent ref={componentRef} />
    </div>
  );
}

export default StudentApplicationPrint;
