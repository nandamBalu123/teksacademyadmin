import { createContext, useReducer, useEffect } from "react";
import axios from "axios";
export const SettingsContext = createContext();

export const SettingsReducer = (state, action) => {
  switch (action.type) {
    case "SET_SETTINGS":
      return {
        settings: action.payload,
      };
    case "CREATE_SETTINGS":
      return {
        settings: [action.payload, ...state.settings],
      };
    case "UPDATE_SETTINGS":
      return {
        settings: [action.payload, ...state.settings],
      };
    case "UPDATE_SETTINGS":
      // Find the index of the setting to update
      const index = state.settings.findIndex(
        (setting) => setting.id === action.payload.id
      );

      if (index === -1) {
        // Setting not found, do nothing
        return state;
      }

      // Create a copy of the settings array with the updated setting
      const updatedSettings = [...state.settings];
      updatedSettings[index] = action.payload;

      return {
        settings: updatedSettings,
      };
    default:
      return state;
  }
};

export const SettingsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SettingsReducer, {
    settings: null,
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/getsettings`)
      .then((response) => {
        if (response.data) {
          dispatch({ type: "SET_SETTINGS", payload: response.data });
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  console.log("SettingsContext state:", state);

  return (
    <SettingsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </SettingsContext.Provider>
  );
};
