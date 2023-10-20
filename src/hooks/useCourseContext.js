import { useContext } from "react";
import { CourseContext } from "../context/CourseContext";

export const useCourseContext = () => {
  const context = useContext(CourseContext);

  if (!context) {
    throw Error("useBranchContext must be used inside an useCourseContext");
  }

  return context;
};
