import { createContext, useReducer } from "react";

export const LoggedUserContext = createContext();

export const LoggedUserReducer = (state, action) => {
  switch (action.type) {
    case "LOGGED_USER":
      return {
        loggeduser: action.payload,
      };

    default:
      return state;
  }
};

export const LoggedUserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(LoggedUserReducer, {
    loggeduser: null,
  });

  return (
    <LoggedUserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </LoggedUserContext.Provider>
  );
};
