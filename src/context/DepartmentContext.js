import { createContext, useReducer, useEffect } from "react";
import axios from "axios";
export const DepartmentContext = createContext();

export const DepartmentReducer = (state, action) => {
  switch (action.type) {
    case "SET_DEPARTMENTS":
      return {
        departments: action.payload,
      };
    case "CREATE_DEPARTMENT":
      return {
        departments: [...state.departments, action.payload],
      };
    default:
      return state;
  }
};

export const DepartmentContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DepartmentReducer, {
    departments: null,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3030/getdepartment")
      .then((response) => {
        if (response.data) {
          dispatch({ type: "SET_DEPARTMENTS", payload: response.data });
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  console.log("DepartmentContext state:", state);

  return (
    <DepartmentContext.Provider value={{ ...state, dispatch }}>
      {children}
    </DepartmentContext.Provider>
  );
};
