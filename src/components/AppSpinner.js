import React from "react";
import { Squares } from "react-activity";
import { useSelector } from "react-redux";
import "react-activity/dist/library.css";

export default function AppSpinner({ externalLoader = false }) {
  const { loading: authLoading } = useSelector(
    (state) => state.AuthenticationReducer
  );
  const { loading: employeeLoading } = useSelector(
    (state) => state.EmployeesReducer
  );
  const { loading: profileLoading } = useSelector(
    (state) => state.ProfileReducer
  );
  const { loading: reportsLoading } = useSelector(
    (state) => state.ReportsReducer
  );

  const isLoading = () => {
    return (
      externalLoader ||
      authLoading ||
      employeeLoading ||
      profileLoading ||
      reportsLoading
    );
  };
  if (isLoading()) {
    return (
      <div className="spinner-container">
        <Squares type="dots" color={"var(--primary)"} size={50} />
      </div>
    );
  } else {
    return null;
  }
}
