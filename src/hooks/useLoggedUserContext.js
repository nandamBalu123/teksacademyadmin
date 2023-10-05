import { LoggedUserContext } from "../context/LoggedUserContext";
import { useContext } from "react";

export const useLoggedUserContext = () => {
  const context = useContext(LoggedUserContext);

  if (!context) {
    throw Error(
      "useWorkoutsContext must be used inside an WorkoutsContextProvider"
    );
  }

  return context;
};
