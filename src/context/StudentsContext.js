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
    case "UPDATE_STUDENT":
      // Find the index of the user to be updated in the current state
      const updatedStudentIndex = state.students.findIndex(
        (user) => user.id === action.payload.id
      );

      if (updatedStudentIndex === -1) {
        // User not found, no update needed
        return state;
      }

      // Create a copy of the users array with the updated user
      const updatedStudent = [...state.students];
      updatedStudent[updatedStudentIndex].certificate_status =
        action.payload.certificate_status;

      return {
        students: updatedStudent,
      };
    default:
      return state;
  }
};
export const StudentsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(StudentsReducer, {
    students: null,
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/getstudent_data`)
      .then((response) => {
        if (response.data) {
          dispatch({ type: "SET_STUDENTS", payload: response.data });
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
