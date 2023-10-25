import { createContext, useReducer, useEffect } from "react";
import axios from "axios";
export const RoleContext = createContext();

export const RoleReducer = (state, action) => {
  switch (action.type) {
    case "SET_ROLES":
      return {
        roles: action.payload,
      };
    case "CREATE_ROLE":
      return {
        roles: [...state.roles, action.payload],
      };
    default:
      return state;
  }
};

export const RoleContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(RoleReducer, {
    roles: null,
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/getuserroles`)
      .then((response) => {
        if (response.data) {
          dispatch({ type: "SET_ROLES", payload: response.data });
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  console.log("RoleContext state:", state);

  return (
    <RoleContext.Provider value={{ ...state, dispatch }}>
      {children}
    </RoleContext.Provider>
  );
};
