import { useContext } from "react";
import { RoleContext } from "../context/RoleContext";

export const useRoleContext = () => {
  const context = useContext(RoleContext);

  if (!context) {
    throw Error("useRoleContext must be used inside an RoleContextProvider");
  }

  return context;
};
