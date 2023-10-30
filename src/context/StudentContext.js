import { createContext, useReducer } from "react";
import axios from "axios";
export const StudentContext = createContext();

export const StudentReducer = (state, action) => {
  switch (action.type) {
    case "SET_STUDENT":
      return {
        student: action.payload,
      };

    case "UPDATE_FEE_INSTALLMENTS":
      // Find the index of the user to be updated in the current state
      // let updatedFeeInstallmentsIndex = state.student.findIndex(
      //   (user) => user.id === action.payload.id
      // );

      // if (updatedFeeInstallmentsIndex === -1) {
      //   // User not found, no update needed
      //   return state;
      // }

      // Create a copy of the users array with the updated user
      const updatedFeeInstallments = state.student;
      updatedFeeInstallments.installments = action.payload.installments;

      updatedFeeInstallments.totalinstallments =
        action.payload.totalinstallments;

      updatedFeeInstallments.dueamount = action.payload.dueamount;

      updatedFeeInstallments.totalpaidamount = action.payload.totalpaidamount;

      updatedFeeInstallments.nextduedate = action.payload.nextduedate;

      return {
        student: updatedFeeInstallments,
      };
    default:
      return state;
  }
};
export const StudentContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(StudentReducer, {
    student: null,
  });

  // useEffect(() => {
  //   axios
  //     .get(`${process.env.REACT_APP_API_URL}/getstudent_data`)
  //     .then((response) => {
  //       if (response.data) {
  //         dispatch({ type: "SET_STUDENTS", payload: response.data });
  //       }
  //     })
  //     .catch((error) => {
  //       // Handle any errors that occur during the request
  //       console.error("Error fetching data:", error);
  //     });
  // }, []);

  console.log("StudentContext state:", state);

  return (
    <StudentContext.Provider value={{ ...state, dispatch }}>
      {children}
    </StudentContext.Provider>
  );
};
