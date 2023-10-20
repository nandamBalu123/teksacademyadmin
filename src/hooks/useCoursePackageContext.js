import { useContext } from "react";
import { CoursePackageContext } from "../context/CoursePackageContext";

export const useCoursePackageContext = () => {
  const context = useContext(CoursePackageContext);

  if (!context) {
    throw Error(
      "useCoursePackageContext must be used inside an CoursePackageContext"
    );
  }

  return context;
};
