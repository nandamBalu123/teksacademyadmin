import { createContext, useReducer, useEffect } from "react";
import axios from "axios";
export const CoursePackageContext = createContext();

export const CoursePackageReducer = (state, action) => {
  switch (action.type) {
    case "SET_COURSESPACKAGES":
      return {
        coursepackages: action.payload,
      };
    case "CREATE_COURSEPACKAGE":
      return {
        coursepackages: [...state.coursepackages, action.payload],
      };
    default:
      return state;
  }
};

export const CoursePackageContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CoursePackageReducer, {
    coursepackages: null,
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/getcoursespackages`)
      .then((response) => {
        if (response.data) {
          dispatch({ type: "SET_COURSESPACKAGES", payload: response.data });
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  console.log("CoursePakagesContext state:", state);

  return (
    <CoursePackageContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CoursePackageContext.Provider>
  );
};
