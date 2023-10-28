import { createContext, useReducer, useEffect } from "react";

export const UsersContext = createContext();

export const UsersReducer = (state, action) => {
  switch (action.type) {
    case "SET_USERS":
      return {
        users: action.payload,
      };
    case "CREATE_USER":
      return {
        users: [action.payload, ...state.users],
      };
    case "DELETE_USER":
      return {
        users: state.users.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const UsersContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UsersReducer, {
    users: null,
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/userdata`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        dispatch({ type: "SET_USERS", payload: data });
      } catch (err) {
        // setError(err);
      }
    };

    fetchData();
  }, []);

  console.log("UsersContext state:", state);
  return (
    <UsersContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UsersContext.Provider>
  );
};
