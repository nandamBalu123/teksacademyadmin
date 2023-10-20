import { createContext, useReducer, useEffect } from "react";
import axios from "axios";
export const LeadSourceContext = createContext();

export const LeadSourceReducer = (state, action) => {
  switch (action.type) {
    case "SET_LEADSOURCES":
      return {
        leadsources: action.payload,
      };
    case "CREATE_SOURCE":
      return {
        leadsources: [...state.leadsources, action.payload],
      };
    default:
      return state;
  }
};

export const LeadSourceContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(LeadSourceReducer, {
    leadsources: null,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3030/getleadsource")
      .then((response) => {
        if (response.data) {
          dispatch({ type: "SET_LEADSOURCES", payload: response.data });
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  console.log("LeadsourceContext state:", state);

  return (
    <LeadSourceContext.Provider value={{ ...state, dispatch }}>
      {children}
    </LeadSourceContext.Provider>
  );
};
