import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { PrimaryButton } from "../../components/AppButtons";
import { PrimaryTextField } from "../../components/AppTextFields";
import { Link, useSearchParams } from "react-router-dom";
import { whiteLabelingRequest } from "../../redux/reducers/WhiteLabelingReducer";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { get } from "lodash";
import {
  verifyOTpRequest,
  loginRequest,
} from "../../redux/reducers/AuthenticationReducer";
import { showFaliureToast, showSuccessToast } from "../../helpers/AppToasts";
import useLocalizedConstants from "../../hooks/useLocalizedConstants";
import useLocalizedPageTitle from "../../hooks/useLocalizedPageTitle";
import useLocalizedToast from "../../hooks/useLocalizedToast";
import AppLogger from "../../helpers/AppLogger";
import AppRoutes from "../../helpers/AppRoutes";
import AppImages from "../../helpers/AppImages";
import H1 from "../../components/Headings";
import "./style.css";

function Login() {
  // Dispatchers
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [params] = useSearchParams();

  // Localization and Constants
  const appConstants = useLocalizedConstants();
  const localizedToastMsg = useLocalizedToast();
  const { whiteLabelling } = useSelector((state) => state.WhiteLabelingReducer);

  // Reducer States
  const { credentials, user, token } = useSelector(
    (state) => state.AuthenticationReducer
  );

  // Get the company id from the Reducer
  const company_id = useSelector((state) =>
    get(state.WhiteLabelingReducer.whiteLabelling, "company_id", "")
  );

  // Constants
  const isVerifying = params.get("verify_otp");
  const resetPassword = params.get("reset_password");
  const otpType = params.get("otp_type");

  // Custom Hooks
  useLocalizedPageTitle(appConstants.pageTitles.login);

  // Local States
  const [isAuthenticating, setIsAuthenticating] = useState(isVerifying);
  const [otp, setOTP] = useState("");
  const [user_id, setUserId] = useState(params.get("user_id"));
  const [loginBody, setLoginBody] = useState({
    ni_number: get(credentials, "ni_number", ""),
    sub_domain: "", // get(whiteLabelling, "company.sub_domain", ""),
    // ni_number: get(credentials, "ni_number", "abc 123 456 789"),
    password: get(credentials, "password", ""),
    rememberMe: get(credentials, "rememberMe", false),
  });
  useEffect(() => {
    if (user && token) {
      navigate(AppRoutes.dashboard);
    }
  }, []);

  useEffect(() => {
    if (whiteLabelling) {
      setLoginBody({
        ...loginBody,
        sub_domain: get(whiteLabelling, "company.sub_domain", ""),
      });
    }
  }, [whiteLabelling]);

  const handleWhiteLabelRequest = () => {
    dispatch(whiteLabelingRequest({ subDomain: window.location.hostname }))
      .then(unwrapResult)
      .then((res) => {
        handleLoginRequest();
      })
      .catch((err) => {});
  };

  const handleLoginRequest = () => {
    if (company_id) {
      dispatch(loginRequest({ loginBody }))
        .then(unwrapResult)
        .then((res) => {
          AppLogger("Response at loginRequest", res);
          setUserId(get(res, "data.user.company_user_id", null));
          showSuccessToast(res.message ?? localizedToastMsg.loginSuccess);
          if (res.data.hasOwnProperty("access_token")) {
            navigate(AppRoutes.dashboard);
          } else {
            setIsAuthenticating(true);
          }
        })
        .catch((err) => {
          AppLogger("Error at loginRequest", err);
          showFaliureToast(err.message ?? localizedToastMsg.loginFailed);
        });
    } else {
      navigate(AppRoutes.notFound);
    }
  };
  const handleVerifyOTP = () => {
    if (otp.length == 6) {
      dispatch(
        verifyOTpRequest({
          otp,
          user_id:
            resetPassword == "1" ? get(user, "company_user_id", "") : user_id,
          reset: resetPassword ? "1" : "0",
          type: otpType,
        })
      )
        .then(unwrapResult)
        .then((res) => {
          AppLogger("Response at verifyOTpRequest", res);
          showSuccessToast(res.message ?? localizedToastMsg.verifyOTPSuccess);
          if (resetPassword) {
            navigate(
              AppRoutes.changePassword +
                `?user_id=${get(res, "data.user.id", "")}`
            );
          } else {
            navigate(AppRoutes.dashboard);
          }
        })
        .catch((err) => {
          AppLogger("Error at verifyOTpRequest", err);
          showFaliureToast(err.message ?? localizedToastMsg.verifyOTPFailed);
        });
    } else {
      showFaliureToast(localizedToastMsg.otpLengthValidation);
    }
  };

  return (
    <div className="container-fluid bg-image">
      <div className="row">
        <div
          className="col bg-image login-mainCont"
          style={{ backgroundImage: `url(${AppImages.loginbg1})` }}
        >
          {get(whiteLabelling, "company.company_logo_url", "") && (
            <img
              src={get(whiteLabelling, "company.company_logo_url", "")}
              className="logo object-contain"
            />
          )}
          <div className="twofacCon">
            <div className="headingWithText">
              <H1
                title={appConstants.titles.signin}
                subTitle={appConstants.descriptions.sign_in_to_stay_connected}
              />
            </div>
            {!isAuthenticating ? (
              <>
                <PrimaryTextField
                  onChange={(e) =>
                    setLoginBody({
                      ...loginBody,
                      ni_number: e.target.value,
                    })
                  }
                  name="ni_number"
                  type="text"
                  value={loginBody.ni_number}
                  title={appConstants.updateEmail}
                />
                <PrimaryTextField
                  onChange={(e) =>
                    setLoginBody({ ...loginBody, password: e.target.value })
                  }
                  name="password"
                  type="password"
                  value={loginBody.password}
                  title={appConstants.titles.password}
                />
              </>
            ) : (
              <PrimaryTextField
                onChange={(e) => setOTP(e.target.value)}
                name="authCode"
                type="text"
                value={otp}
                title={appConstants.titles.twoFactorAuthentication}
              />
            )}
            <div className="container p-0  d-flex align-items-center twoRemberMeCon">
              <div className="twoRemberMe">
                <input
                  checked={loginBody.rememberMe}
                  onChange={(e) =>
                    setLoginBody({ ...loginBody, rememberMe: e.target.checked })
                  }
                  className="check-box "
                  type="checkbox"
                />
                <p className="remember">{appConstants.buttons.rememberMe}</p>
              </div>
              <Link className="color pointer" to={AppRoutes.forgotPassword}>
                {appConstants.titles.forgotPass}
              </Link>
            </div>

            <div className="d-flex justify-content-center mt-4 flex-column align-items-center">
              {!isAuthenticating ? (
                <PrimaryButton
                  title={appConstants.buttons.signin}
                  isDisabled={!loginBody.ni_number || !loginBody.password}
                  onClick={() => {
                    {
                      whiteLabelling
                        ? handleLoginRequest()
                        : handleWhiteLabelRequest();
                    }
                  }}
                />
              ) : (
                <PrimaryButton
                  title={appConstants.buttons.confirm}
                  isDisabled={!otp}
                  onClick={() => {
                    handleVerifyOTP();
                  }}
                />
              )}
            </div>
            {/* <div className="mt-4  d-flex justify-content-center">
              <p className="fs-6">
                Don’t have an account?{" "}
                <Link className="color pointer" to={AppRoutes.signUp}>
                  Click here to sign up.
                </Link>
              </p>
            </div> */}
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

export default Login;
