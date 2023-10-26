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
