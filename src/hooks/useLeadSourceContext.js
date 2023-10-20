import { useContext } from "react";
import { LeadSourceContext } from "../context/LeadSourceContext";

export const useLeadSourceContext = () => {
  const context = useContext(LeadSourceContext);

  if (!context) {
    throw Error(
      "useLeadSourceContext must be used inside an LeadSourceContext"
    );
  }

  return context;
};
