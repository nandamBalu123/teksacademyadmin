import { createContext, useReducer, useEffect } from "react";
import axios from "axios";
export const CourseContext = createContext();

// export const CourseReducer = (state, action) => {
//   switch (action.type) {
//     case "SET_COURSES":
//       return {
//         getcourses: action.payload,
//       };
//     case "CREATE_COURSE":
//       return {
//         getcourses: [...state.getcourses, action.payload],
//       };
//     case "DELETE_COURSE":
//       return {
//         getcourses: [...state.getcourses, action.payload],
//       };      
//     default:
//       return state;
//   }
// };

export const CourseReducer = (state, action) => {
  switch (action.type) {
    case "SET_COURSES":
      return {
        getcourses: action.payload,
      };
    case "CREATE_COURSE":
      return {
        getcourses: [...state.getcourses, action.payload],
      };
    case "EDIT_COURSE":
      // Find the index of the user to be updated in the current state
      let updatedInstallmentStudentIndex = state.getcourses.findIndex(
        (course) => course.id == action.payload.id
      );

      if (updatedInstallmentStudentIndex === -1) {
        // User not found, no update needed
        return state;
      }

      // Create a copy of the users array with the updated user

      let updatedInstallment = [...state.getcourses];
      updatedInstallment[updatedInstallmentStudentIndex] =
        action.payload.updatedData;

      return {
        getcourses: updatedInstallment,
      };
    case "DELETE_COURSE":
      let id = action.payload.id;
      id = parseInt(id);
      console.log("balu", action.payload.id)
      return {

        getcourses: state.getcourses.filter(course => course.id !== id),
      };
    default:
      return state;
  }
};


export const CourseContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CourseReducer, {
    getcourses: null,
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/getcourses`)
      .then((response) => {
        if (response.data) {
          dispatch({ type: "SET_COURSES", payload: response.data });
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  console.log("CourseContext state:", state);

  return (
    <CourseContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CourseContext.Provider>
  );
};
