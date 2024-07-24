import React, { useEffect, useState } from "react";
import { get } from "lodash";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { showSuccessToast, showFaliureToast } from "../../helpers/AppToasts";
import { exportEmployeeRequest } from "../../redux/reducers/EmployeesReducer";
import Notifications from "./Notifications";
import AppRoutes from "../../helpers/AppRoutes";
import useLocalizedConstants from "../../hooks/useLocalizedConstants";
import BottomButtons from "../../components/dashboard/BottomButtons";
import InteractiveSection from "./subComponents/InteractiveSection";
import AppUtilities from "../../helpers/AppUtilities";
import AppLogger from "../../helpers/AppLogger";
import { VivupLoginRequest } from "../../redux/reducers/AuthenticationReducer";
import AppConstants from "../../helpers/AppConstants";
function Tasks(props) {
  // Dispatchers
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Reducer States
  const { user, token } = useSelector((state) => state.AuthenticationReducer);
  const { whiteLabelling } = useSelector((state) => state.WhiteLabelingReducer);

  // Localization and Constants
  const appConstants = useLocalizedConstants();

  // Constants
  const isAdmin = AppUtilities.isAdmin(user);
  const isArchive = AppUtilities.isArchive(user);
  const [samlReponse, setSamlReponse] = useState("");

  // Local States

  const data = [
    {
      id: 1,
      title: appConstants.pageTitles.payslips,
      color: "var(--primary-btn-color)",
      vivupLink: false,
      isArchive: false,
      href: `${AppRoutes.profile}?user_id=${get(
        user,
        "company_user_id",
        ""
      )}#payslip`,
    },
    {
      id: 2,
      title: appConstants.pageTitles.pensions,
      color: "#E486DB",
      href: get(whiteLabelling, "company.employee_pension_url", ""),
      vivupLink: false,
      isArchive: isArchive,
    },
    {
      id: 3,
      title: appConstants.life_style_savings,
      color: "#61B0C1",
      // href: whiteLabelling.company.lifestyle_url,
      href: get(whiteLabelling, "company.lifestyle_url", ""),
      vivupLink: true,
      isArchive: isArchive,
    },
    {
      id: 4,
      title: appConstants.your_care,
      color: "#C1B861",
      // href: whiteLabelling.company.yourcare_url,
      href: get(whiteLabelling, "company.yourcare_url", ""),
      vivupLink: true,
      isArchive: isArchive,
    },
    // {
    //   id: 5,
    //   title: appConstants.pageTitles.retailDiscounts,
    //   color: "#61B0C1",
    //   href: AppRoutes.servicesRetailDiscounts,
    // },
    // {
    //   id: 6,
    //   title: appConstants.pageTitles.healthAndWellbeing,
    //   color: "#7A61C1",
    //   href: AppRoutes.servicesRetailHealthAndWellBeing,
    // },
  ];

  useEffect(() => {
    if (!isArchive) {
      handleVivupLogin();
    }
  }, [user]);

  const handleVivupLogin = () => {
    dispatch(
      VivupLoginRequest({
        userId: get(user, "company_user_id", ""),
        token: token,
      })
    )
      .then(unwrapResult)
      .then((res) => {
        AppLogger("Response at VivupLoginRequest", res);
        setSamlReponse(get(res, "data.SAMLResponse", ""));
      })
      .catch((err) => {
        AppLogger("Error at VivupLoginRequest", err);
        // showFaliureToast(err.message);
        AppUtilities.isSessionTimedOut(err, navigate, dispatch);
      });
  };

  const handleExport = () => {
    dispatch(
      exportEmployeeRequest({ id: get(user, "company_user_id", ""), token })
    )
      .then(unwrapResult)
      .then((res) => {
        AppLogger("Response at exportEmployeeRequest", res);
        showSuccessToast(res.message);
        window.open(res.data, "_blank");
      })
      .catch((err) => {
        showFaliureToast(err.message);
        AppLogger("Error at exportEmployeeRequest", err);
        AppUtilities.isSessionTimedOut(err, navigate, dispatch);
      });
  };

  const handleProfileClick = () => {
    if (AppUtilities.isAdmin(user)) {
      handleExport();
    } else {
      navigate(
        AppRoutes.profile + `?user_id=${get(user, "company_user_id", "")}`
      );
    }
  };

  return (
    <div>
      {!isAdmin && (
        <div className="container my-4">
          <div
            className={` d-flex flex-wrap gap-3 ${
              isArchive ? "archive" : "justify-content-around "
            }`}
          >
            {data.map((item, index) => {
              const { title, color, href, vivupLink, isArchive } = item;
              return (
                <BottomButtons
                  key={index}
                  color={color}
                  title={title}
                  href={href}
                  vivupLink={vivupLink}
                  samlReponse={samlReponse}
                  isArchive={isArchive}
                />
              );
            })}
          </div>
        </div>
      )}
      <div className="card px-4-5 py-3">
        <div className="">
          <h4 className="task-notification-title">{appConstants.tasks}</h4>
          <div className="mt-2-5">
            <InteractiveSection
              onClick={() => navigate(AppRoutes.uploadDocument)}
              title={appConstants.documentUploads}
              subtitle={appConstants.upload}
              description={appConstants.documentUploadsDesc}
            />
          </div>
          <div className="interactive-section mt-2-5">
            <InteractiveSection
              onClick={() => handleProfileClick()}
              title={
                isAdmin
                  ? appConstants.documentExport
                  : appConstants.manageProfile
              }
              subtitle={
                isAdmin ? appConstants.exportData : appConstants.updateStaff
              }
              description={
                isAdmin
                  ? appConstants.documentExportDesc
                  : appConstants.manageProfileDesc
              }
            />
          </div>
        </div>
      </div>
      <div className="card px-4-5  py-3" id="notifications">
        <Notifications />
      </div>
    </div>
  );
}

export default Tasks;
