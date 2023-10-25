import { createContext, useReducer, useEffect } from "react";
import axios from "axios";
export const BranchContext = createContext();

export const BranchReducer = (state, action) => {
  switch (action.type) {
    case "SET_BRANCHES":
      return {
        branches: action.payload,
      };
    case "CREATE_BRANCH":
      return {
        branches: [...state.branches, action.payload],
      };
    default:
      return state;
  }
};

export const BranchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(BranchReducer, {
    branches: null,
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/getbranch`)
      .then((response) => {
        if (response.data) {
          dispatch({ type: "SET_BRANCHES", payload: response.data });
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  console.log("BranchContext state:", state);

  return (
    <BranchContext.Provider value={{ ...state, dispatch }}>
      {children}
    </BranchContext.Provider>
  );
};
