import { createContext, useReducer, useEffect } from "react";
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
   userId = parseInt(userId)
   console.log("userId", role)
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/getstudent_data`)
      .then((response) => {
        if (response.data) {
          if(role==="admin"){
            dispatch({ type: "SET_STUDENTS", payload: response.data });
          }
   
          if(role==="counsellor"){
            const filteredResults = response.data.filter((item) => {
              const user_id=parseInt(item.user_id);
            
                const dataaspercounsellor = userId
                ? user_id === userId
                : true;
              return (
               dataaspercounsellor
              );
            });
            
            dispatch({ type: "SET_STUDENTS", payload: filteredResults
          });
          }
         

          // dispatch({ type: "SET_STUDENTS", payload: response.data });
        }
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error("Error fetching data:", error);
      });
  }, []);

  console.log("StudentsContext state:", state);

  return (
    <StudentsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </StudentsContext.Provider>
  );
};
