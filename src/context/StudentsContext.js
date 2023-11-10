import { createContext, useReducer, useEffect, useState } from "react";
import axios from "axios";
export const StudentsContext = createContext();

export const StudentsReducer = (state, action) => {
  switch (action.type) {
    case "SET_STUDENTS":
      return {
        students: action.payload,
      };
    case "CREATE_STUDENT":
      return {
        students: [...state.students, action.payload],
      };
    case "UPDATE_CERTIFICATE_STATUS":
      // Find the index of the user to be updated in the current state
      let updatedStudentIndex = state.students.findIndex(
        (user) => user.id === action.payload.id
      );

      if (updatedStudentIndex === -1) {
        // User not found, no update needed
        return state;
      }

      // Create a copy of the users array with the updated user
      const updatedCertificate = [...state.students];
      updatedCertificate[updatedStudentIndex].certificate_status =
        action.payload.certificate_status;

      return {
        students: updatedCertificate,
      };

    default:
      return state;
  }
};
export const StudentsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(StudentsReducer, {
    students: null,
  });
  const role = localStorage.getItem("role");
  let userId = localStorage.getItem("id");
  let userName = JSON.parse(localStorage.getItem("user"));

  let reportto = localStorage.getItem("reportto");
  console.log("reportto", reportto);
  userId = parseInt(userId)
  console.log("userId", role);
  let lusername
if(userName){
  lusername  = userName.fullname;

}

 

  const [users, setUsers] = useState()
  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/userdata`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        var data = await response.json();
        setUsers(data)

        // dispatch({ type: "SET_USERS", payload: data });
      } catch (err) {
        // setError(err);
      }
    };

    fetchData();
  }, []);


console.log("userdd", users)

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/getstudent_data`)
      .then((response) => {
        if (response.data) {
          if (role === "admin" || role === "RM") {
            dispatch({ type: "SET_STUDENTS", payload: response.data });
          }

          if (role === "counsellor") {
            const filteredResults = response.data.filter((item) => {
              const user_id = parseInt(item.user_id);

              const dataaspercounsellor = userId
                ? user_id === userId
                : true;
              return (
                dataaspercounsellor
              );
            });

            dispatch({
              type: "SET_STUDENTS", payload: filteredResults
            });
          }


          if (role === "branch manager") {
            let userd_id;
            const filteredResults = response.data.filter((item) => {
              userd_id = parseInt(item.user_id);

              const filterreportto = users.filter((user) => {
                const muser_id = parseInt(user.id);
                console.log("muser_id", muser_id);
                if (muser_id === userd_id) {
                  const ureportto = user.reportto;
                  
                  // const lusername = userName.fullname;
                  console.log("ureportto, lusername", ureportto, lusername);
                  return ureportto === lusername;
                }
          
                return false;
              });
          
              return filterreportto.length > 0; 
            });

            
          
            dispatch({
              type: "SET_STUDENTS",
              payload: filteredResults,
            });
          }
          
        //   if (role === "branch manager") {
        //     const filteredResults = response.data.filter((item) => {
        //       const user_id = parseInt(item.user_id); ////counsellor  id  9 1 1 1
        //       const filterreportto = users.filter((user) => {
        //         const muser_id = parseInt(user.id);
                
        //         if(muser_id === user_id){
        //           const ureportto = user.reportto;
        //           const lusername = userName.fullname;

        //           if(ureportto == lusername){
                     
        //           }

        //         }
        //         // const rp = user_id ? user.id === user_id : false

        //         // return (reporttoo)
        //       })
        //       filterreportto();
        //     //   const dataaspercounsellor = user_id
        //     //     ? filterreportto === userName.fullname

        //     //     : true;
        //     //   return (
        //     //     dataaspercounsellor
        //     //   );
        //     // });
        //     // const filteredResults = response.data.filter((item) => {
        //     //   const user_id=parseInt(item.user_id);
        //     //   // userId, reportto

        //     //     const dataaspercounsellor = userId
        //     //     ? user_id === userId
        //     //     : true;

        //     //     const rept = dataaspercounsellor ? reportto 
        //     //   return (

        //     //   );
        //     // });

        //     dispatch({
        //       type: "SET_STUDENTS", payload: filteredResults
        //     });
        //   })


        //   // dispatch({ type: "SET_STUDENTS", payload: response.data });
        // }

      }
        // if (response.data) {
        //   if(role==="admin"){
        //     dispatch({ type: "SET_STUDENTS", payload: response.data });
        //   }
        //   if(role === "branch manager"){
        //     const filteredResults = response.data.filter((item) => {
        //       const reportto=item.reportto;

        //         const dataaspercounsellor = reportto
        //         ? reportto === reportto
        //         : true;
        //       return (
        //        dataaspercounsellor
        //       );
        //     });

        //     dispatch({ type: "SET_STUDENTS", payload: filteredResults
        //   });
        //   }
        //   if(role==="counsellor"){
        //     const filteredResults = response.data.filter((item) => {
        //       const user_id=parseInt(item.user_id);

        //         const dataaspercounsellor = userId
        //         ? user_id === userId
        //         : true;
        //       return (
        //        dataaspercounsellor
        //       );
        //     });

        //     dispatch({ type: "SET_STUDENTS", payload: filteredResults
        //   });
        //   }


        //   // dispatch({ type: "SET_STUDENTS", payload: response.data });
        // }
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error("Error fetching data:", error);
      });
  }, [users]);

  console.log("StudentsContext state:", state);

  return (
    <StudentsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </StudentsContext.Provider>
  );
};
