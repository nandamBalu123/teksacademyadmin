import { BranchContext } from "../context/BranchContext";
import { useContext } from "react";

export const useBranchContext = () => {
  const context = useContext(BranchContext);

  if (!context) {
    throw Error(
      "useBranchContext must be used inside an BranchContextProvider"
    );
  }

  return context;
};
