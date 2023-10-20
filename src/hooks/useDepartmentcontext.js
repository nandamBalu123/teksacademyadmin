import { useContext } from "react";
import { DepartmentContext } from "../context/DepartmentContext";

export const useDepartmentContext = () => {
  const context = useContext(DepartmentContext);

  if (!context) {
    throw Error(
      "useDepartmentContext must be used inside an DepartmentContext"
    );
  }

  return context;
};
