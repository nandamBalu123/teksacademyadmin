import { useContext } from "react";
import { SettingsContext } from "../context/SettingsContext";

export const useSettingsContext = () => {
  const context = useContext(SettingsContext);

  if (!context) {
    throw Error(
      "useSettngsContext must be used inside an SettingsContextProvider"
    );
  }

  return context;
};
