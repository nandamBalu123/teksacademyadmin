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
    case "UPDATE_USER":
      // Find the index of the user to be updated in the current state
      const updatedUserIndex = state.users.findIndex(
        (user) => user.id === action.payload.id
      );

      if (updatedUserIndex === -1) {
        // User not found, no update needed
        return state;
      }

      // Create a copy of the users array with the updated user
      const updatedUsers = [...state.users];
      updatedUsers[updatedUserIndex] .status= action.payload.status;

      return {
        users: updatedUsers,
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
