import { createContext, useReducer, useEffect } from "react";
import axios from "axios";
export const CourseContext = createContext();

export const CourseReducer = (state, action) => {
  switch (action.type) {
    case "SET_COURSES":
      return {
        courses: action.payload,
      };
    case "CREATE_COURSE":
      return {
        courses: [...state.courses, action.payload],
      };
    default:
      return state;
  }
};

export const CourseContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CourseReducer, {
    courses: null,
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

  console.log("BranchContext state:", state);

  return (
    <CourseContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CourseContext.Provider>
  );
};
