import React, { useState } from "react";
import { PrimaryTextField } from "../../components/AppTextFields";
import { PrimaryButton } from "../../components/AppButtons";
import { useSearchParams } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { changePasswordRequest } from "../../redux/reducers/AuthenticationReducer";
import { showFaliureToast, showSuccessToast } from "../../helpers/AppToasts";
import useLocalizedConstants from "../../hooks/useLocalizedConstants";
import useLocalizedPageTitle from "../../hooks/useLocalizedPageTitle";
import useLocalizedToast from "../../hooks/useLocalizedToast";
import AppLogger from "../../helpers/AppLogger";
import AppImages from "../../helpers/AppImages";
import AppRoutes from "../../helpers/AppRoutes";
import H1 from "../../components/Headings";
import AppUtilities from "../../helpers/AppUtilities";

const ChangePassword = () => {
  // Dispatchers
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [params] = useSearchParams();

  // Localization and Constants
  const appConstants = useLocalizedConstants();
  const localizedToastMsg = useLocalizedToast();

  // Custom Hooks
  useLocalizedPageTitle(appConstants.pageTitles.changePassword);

  // Constants
  const user_id = params.get("user_id");

  // Local States
  const [changePassBody, setChangePassBody] = useState({
    password: "",
    password_confirm: "",
  });

  const handleChangePassword = () => {
    dispatch(changePasswordRequest({ changePassBody, user_id }))
      .then(unwrapResult)
      .then((res) => {
        AppLogger("Response at changePasswordRequest", res);
        showSuccessToast(res.message ?? localizedToastMsg.resetPassSuccess);
        navigate(AppRoutes.login);
      })
      .catch((err) => {
        AppLogger("Error at changePasswordRequest", err);
        showFaliureToast(err.message ?? localizedToastMsg.resetPassFailed);
        AppUtilities.isSessionTimedOut(err, navigate, dispatch);
      });
  };

  return (
    <div className="container-fluid bg-image">
      <div className="row">
        <div
          className="col bg-image login-mainCont"
          style={{ backgroundImage: `url(${AppImages.loginbg1})` }}
        >
          <div className="twofacCon">
            <div className="headingWithText">
              <H1
                title={appConstants.titles.Password}
                subTitle={appConstants.descriptions.please_create_a_new_password_to_secure_your_account}
              />
            </div>
            <PrimaryTextField
              name="password"
              type="password"
              value={changePassBody.password}
              title={appConstants.titles.password}
              onChange={(e) =>
                setChangePassBody({
                  ...changePassBody,
                  password: e.target.value,
                })
              }
            />
            <PrimaryTextField
              name="confirmPassword"
              type="password"
              value={changePassBody.password_confirm}
              title={appConstants.titles.confirmPassword}
              onChange={(e) =>
                setChangePassBody({
                  ...changePassBody,
                  password_confirm: e.target.value,
                })
              }
            />
            <div className="d-flex justify-content-center reset-btn">
              <PrimaryButton
                title={appConstants.buttons.reset}
                isDisabled={
                  !changePassBody.password || !changePassBody.password_confirm
                }
                onClick={() => handleChangePassword()}
              />
            </div>
          </div>
        </div>
        <div
          className="col-12 col-lg-6 col-md col-sm-0 bg-image2"
          style={{ backgroundImage: `url(${AppImages.loginbg2})` }}
        />
      </div>
    </div>
  );
};

export default ChangePassword;
