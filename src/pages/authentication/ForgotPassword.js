import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { get } from "lodash";
import { PrimaryTextField } from "../../components/AppTextFields";
import { PrimaryButton } from "../../components/AppButtons";
import { resetPasswordRequest } from "../../redux/reducers/AuthenticationReducer";
import { showSuccessToast, showFaliureToast } from "../../helpers/AppToasts";
import parsePhoneNumber from "libphonenumber-js";
import AppRoutes from "../../helpers/AppRoutes";
import AppLogger from "../../helpers/AppLogger";
import useLocalizedToast from "../../hooks/useLocalizedToast";
import useLocalizedConstants from "../../hooks/useLocalizedConstants";
import useLocalizedPageTitle from "../../hooks/useLocalizedPageTitle";
import AppImages from "../../helpers/AppImages";
import H1 from "../../components/Headings";
import AppUtilities from "../../helpers/AppUtilities";
import AppConstants from "../../helpers/AppConstants";

function ForgotPassword() {
  // Dispatchers
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Reducer States
  const { user, token } = useSelector((state) => state.AuthenticationReducer);

  // Localization and Constants
  const appConstants = useLocalizedConstants();
  const localizedToastMsg = useLocalizedToast();

  // Custom Hooks
  useLocalizedPageTitle(appConstants.pageTitles.forgotPassword);

  // Local States
  const [phone_number, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (user && token) {
      navigate(AppRoutes.dashboard);
    }
  }, []);

  const handleResetPassword = () => {
    if (email && AppConstants.validateEmail.test(email)) {
      var body = {};
      var otpType = "";

      if (email) {
        body.email = email;
        otpType = AppConstants.OTPTypes.email;
      } else {
        body.phone_number = phone_number;
        otpType = AppConstants.OTPTypes.sms;
      }

      dispatch(resetPasswordRequest({ body }))
        .then(unwrapResult)
        .then((res) => {
          AppLogger("Response at resetPasswordRequest", res);
          showSuccessToast(res.message ?? localizedToastMsg.resetPassSuccess);
          navigate(
            AppRoutes.login +
            `?verify_otp=true&reset_password=true&user_id=${get(
              res,
              "data.user.id",
              ""
            )}&otp_type=${otpType}`
          );
        })
        .catch((err) => {
          AppLogger("Error at resetPasswordRequest", err);
          showFaliureToast(err.message ?? localizedToastMsg.resetPassFailed);
        });
    } else {
      showFaliureToast(appConstants.InValidEmailFormat)
    }

  };

  const isDisabled = () => {
    var check = true;
    if (phone_number && parsePhoneNumber(phone_number)?.isValid()) {
      check = false;
    } else if (email) {
      check = false;
    }
    return check;
  };

  return (
    <div className="container-fluid forgot-bg">
      <div className="row">
        <div
          className="col forgot-bg login-mainCont"
          style={{ backgroundImage: `url(${AppImages.loginbg1})` }}
        >
          <div className="twofacCon">
            <div className="headingWithText">
              <H1
                title={appConstants.titles.resetPassword}
                subTitle={appConstants.descriptions.enter_phone_and_email_and_send_you_instructions}
                span={appConstants.descriptions.to_reset_your_password}
              />
            </div>
            <PrimaryTextField
              isDisabled={email}
              type="text"
              name="reset"
              value={phone_number}
              onChange={(e) =>
                setPhoneNumber(AppUtilities.format_phone_number(e))
              }
              title={appConstants.titles.phoneNumber}
              inputStyle={
                phone_number.length > 0 &&
                  !parsePhoneNumber(phone_number)?.isValid()
                  ? { border: "1px solid red" }
                  : {}
              }
            />
            <div className="container d-flex justify-content-between align-items-center separator-con ">
              <div className="separator" />
              <span className="fs-6 ">{appConstants.titles.or}</span>
              <div className="separator" />
            </div>
            <PrimaryTextField
              isDisabled={phone_number.length > 1}
              type="text"
              name="reset"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              title={appConstants.emailTitle}
            // inputStyle={
            //   email && !AppConstants.validateEmail.test(email)
            //     ? { border: "1px solid red" }
            //     : {}
            // }
            />
            <div
              className="d-flex justify-content-center mt-5"
              style={{ marginBottom: "4px" }}
            >
              <PrimaryButton
                title={appConstants.buttons.reset}
                isDisabled={isDisabled()}
                onClick={() => handleResetPassword()}
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
}
export default ForgotPassword;
