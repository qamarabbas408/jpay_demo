import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useLocation } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";
import { get } from "lodash";
import { Button } from "react-bootstrap";
import { profileEmployeeRequest } from "../../redux/reducers/ProfileReducer";
import {
  deleteEmployeeRequest,
  exportEmployeeRequest,
} from "../../redux/reducers/EmployeesReducer";
import { showFaliureToast, showSuccessToast } from "../../helpers/AppToasts";
import AppLogger from "../../helpers/AppLogger";
import UserInformation from "../../components/profile/UserInformation";
import ProfileForms from "../../components/profile/ProfileForms";
import useLocalizedConstants from "../../hooks/useLocalizedConstants";
import useLocalizedPageTitle from "../../hooks/useLocalizedPageTitle";
import AppUtilities from "../../helpers/AppUtilities";
import DeleteModel from "../../components/employees/subComponents/DeleteModel";
import AppRoutes from "../../helpers/AppRoutes";
import AddressForm from "../../components/profile/subComponents/AddressForm";
import ContactDetails from "../../components/profile/subComponents/ContactDetails";
import "../../pages/style.css";
import AppImages from "../../helpers/AppImages";
import BackButton from "../../components/BackButton";
function Profile() {
  // Dispatchers
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();

  // Localization and Constants
  const appConstants = useLocalizedConstants();

  // Reducer States
  const { user, token } = useSelector((state) => state.AuthenticationReducer);
  const { profileUser } = useSelector((state) => state.ProfileReducer);
  const isArchive = AppUtilities.isArchive(profileUser);
  // Custom Hooks
  useLocalizedPageTitle(appConstants.pageTitles.profile);

  // Constants
  const userId = params.get("user_id");
  const hashValue = get(location, "hash", appConstants.paySlip);

  // Local States
  const [showDeleteModel, setShowDeleteModel] = useState(false);

  useEffect(() => {
    handleProfileEmployeeRequest();
  }, [userId]);

  const getSelectedUserId = () => {
    return userId ?? get(profileUser, "company_user_id", "");
  };

  const handleProfileEmployeeRequest = () => {
    dispatch(profileEmployeeRequest({ user_id: getSelectedUserId(), token }))
      .then(unwrapResult)
      .then((res) => {
        AppLogger("Response at profileEmployeeRequest", res);
      })
      .catch((err) => {
        AppLogger("Error at profileEmployeeRequest", err);
        AppUtilities.isSessionTimedOut(err, navigate, dispatch);
      });
  };

  const getSelectedTab = () => {
    if (hashValue) {
      return hashValue
        .replace(/[!@#$%^&*-]/g, " ")
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    } else {
      return appConstants.paySlip;
    }
  };

  const handleExport = () => {
    dispatch(exportEmployeeRequest({ id: getSelectedUserId(), token }))
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

  function handleDeleteEmployeeRequest() {
    dispatch(deleteEmployeeRequest({ id: getSelectedUserId(), token }))
      .then(unwrapResult)
      .then((res) => {
        AppLogger("Response at deleteEmployeeRequest", res);
        setShowDeleteModel(false);
        showSuccessToast(res.message);
        navigate(AppRoutes.employeesAll);
      })
      .catch((err) => {
        showFaliureToast(err.message);
        AppLogger("Error at deleteEmployeeRequest", err);
        AppUtilities.isSessionTimedOut(err, navigate, dispatch);
      });
  }

  return (
    <div className="container-fluid">
      <DeleteModel
        showdeleteModel={showDeleteModel}
        setShowDeleteModel={setShowDeleteModel}
        handleDelete={handleDeleteEmployeeRequest}
      />
      <div className="d-flex  align-content-center mb-1 ">
        <BackButton navigate={navigate} />
        <span>
          {appConstants.profile} {" > "} {getSelectedTab()}
        </span>
      </div>
      <div className="d-flex card-header flex-wrap p-0 col">
        <h3 className="section-heading text-left mb-4">
          {AppUtilities.isCurrentUser(
            get(user, "company_user_id", ""),
            getSelectedUserId()
          )
            ? appConstants.yourProfile
            : `${get(profileUser, "full_name", "")} Profile`}
        </h3>
        <div>
          {AppUtilities.isAdmin(user) && (
            <Button
              variant="secondary"
              className="me-2 py-2"
              onClick={() => handleExport()}
            >
              <i className="fa-brands fa-plus me-2" />
              {appConstants.buttons.export}
            </Button>
          )}
          {!AppUtilities.isCurrentUser(
            get(user, "company_user_id", ""),
            getSelectedUserId()
          ) &&
            !isArchive && (
              <Button
                variant="danger"
                className="me-2 py-2"
                style={{ background: "red" }}
                onClick={() => setShowDeleteModel(true)}
              >
                {appConstants.buttons.delete}
              </Button>
            )}
        </div>
      </div>

      <div className="d-flex flex-xl-row flex-lg-column d-md-flex flex-column gap-4">
        <div className="user-info-container">
          <div
            className="col-xl-3 px-4 py-4 rounded-2 bg-white border rounded"
            style={{ height: "fit-content", width: "100%" }}
          >
            <UserInformation />
          </div>
          <div
            className="col-xl-3 px-4 py-4 rounded-2 bg-white border rounded"
            style={{ height: "fit-content", width: "100%", marginTop: "10px" }}
          >
            <AddressForm />
          </div>
          <div
            className="col-xl-3 px-4 py-4 rounded-2 bg-white border rounded "
            style={{ height: "fit-content", width: "100%", marginTop: "10px" }}
          >
            <ContactDetails />
          </div>
        </div>
        <div className="card col" style={{ minHeight: "580px" }}>
          <div className="card-body">
            <ProfileForms />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
