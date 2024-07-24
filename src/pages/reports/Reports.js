import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { get } from "lodash";
import { unwrapResult } from "@reduxjs/toolkit";
import { getReportsRequest } from "../../redux/reducers/ReportsReducer";
import { SecondaryButton } from "../../components/AppButtons";
import AdminNotFound from "../pageNotFound/AdminNotFound";
import useLocalizedConstants from "../../hooks/useLocalizedConstants";
import useLocalizedPageTitle from "../../hooks/useLocalizedPageTitle";
import CardWidget from "../../components/reports/CardWidget";
import EmployeeBenifits from "../../components/reports/EmployeeBenifits";
import AverageSessionCard from "../../components/reports/AverageSessionCard";
import CurrentSessionCard from "../../components/reports/CurrentSessionCard";
import AppLogger from "../../helpers/AppLogger";
import AppUtilities from "../../helpers/AppUtilities";
import ReportsPrintModal from "../../components/reports/ReportsPrintModal";

function Reports({ exportAllowed = true }) {
  // Dispatchers
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Localization and Constants
  const appConstants = useLocalizedConstants();

  // Reducer States
  const { user, token } = useSelector((state) => state.AuthenticationReducer);
  const { analytics } = useSelector((state) => state.ReportsReducer);

  // Custom Hooks
  useLocalizedPageTitle(appConstants.pageTitles.reports);

  // Constants
  const companyId = get(user, "company_id", "");

  // Local States
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (exportAllowed) {
      handleGetReportsRequest();
    }
  }, []);

  const handleGetReportsRequest = () => {
    dispatch(getReportsRequest({ companyId, token }))
      .then(unwrapResult)
      .then((res) => {
        AppLogger("Response at getReportsRequest", res);
      })
      .catch((err) => {
        AppLogger("Error at getReportsRequest", err);
        AppUtilities.isSessionTimedOut(err, navigate, dispatch);
      });
  };

  if (AppUtilities.isAdmin(user)) {
    return (
      <>
        <ReportsPrintModal showModal={showModal} setShowModal={setShowModal} />
        <div className="container-fluid">
          <div className="row">
            {exportAllowed && (
              <div className="d-flex justify-content-between text-wrap align-items-center mb-3">
                <div className="dashboard-text">{appConstants.report}</div>
                <SecondaryButton
                  title={appConstants.buttons.export}
                  onClick={() => setShowModal(true)}
                />
              </div>
            )}
            <div className="col-xl-12 w-100">
              <div className="row d-flex justify-content-center">
                <DashboardCard
                  title={appConstants.titles.total_payslips}
                  value={get(analytics, "payslips_count", "")}
                  percentage={get(analytics, "payslips_percentage", "")}
                />
                <DashboardCard
                  title={appConstants.titles.total_employees}
                  value={get(analytics, "users_count", "")}
                  percentage={get(analytics, "users_percentage", "")}
                />
                <DashboardCard
                  title={appConstants.titles.new_employees}
                  value={get(analytics, "new_users_count", "")}
                />
              </div>
              <div className="row d-flex justify-content-center">
                <CardWidget
                  loggedInUsers={get(analytics, "logged_in_users", [])}
                  loggedOutUsers={get(analytics, "not_logged_in_users", [])}
                />
              </div>
              <div className="row justify-content-center">
                <AverageSessionCard isAnimationActive={exportAllowed} />
                <CurrentSessionCard isAnimationActive={exportAllowed} />
              </div>
              {/* <div className="row">
                <EmployeeBenifits />
              </div> */}
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <AdminNotFound />;
  }
}

export default Reports;

const DashboardCard = ({ title = "", value = "", percentage = "" }) => {
  return (
    <div className="col-xl-3 col-sm-6 rounded-4">
      <div
        className="card rounded-4 border-0 shadow-sm same-card"
        style={{ height: "auto" }}
      >
        <div className="card-body depostit-card p-0 rounded-4">
          <div className="depostit-card-media d-flex flex-column justify-content-between pb-0">
            <p className="mb-0">{title}</p>
            <div className="d-flex justify-content-between align-items-center pb-3">
              <p className="font-w700 w-100 text-black mb-0">{value}</p>
              {percentage && (
                <p
                  className="font-w700 w-100 mb-0"
                  style={{
                    color: Number(percentage) > 0 ? "#48BB78" : "#E53E3E",
                  }}
                >
                  {Number(percentage) + "%"}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
