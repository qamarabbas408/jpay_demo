import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { unwrapResult } from "@reduxjs/toolkit";
import { SignupTextField } from "../../components/AppTextFields";
import { PrimaryButton } from "../../components/AppButtons";
import { useDispatch, useSelector } from "react-redux";
import { get } from "lodash";
import { signupRequest } from "../../redux/reducers/AuthenticationReducer";
import {
  showFaliureToast,
  showInfoToast,
  showSuccessToast,
  showWarningToast,
} from "../../helpers/AppToasts";
import parsePhoneNumber from "libphonenumber-js";
import useLocalizedConstants from "../../hooks/useLocalizedConstants";
import useLocalizedPageTitle from "../../hooks/useLocalizedPageTitle";
import useLocalizedToast from "../../hooks/useLocalizedToast";
import AppUtilities from "../../helpers/AppUtilities";
import AppRoutes from "../../helpers/AppRoutes";
import AppImages from "../../helpers/AppImages";
import AppLogger from "../../helpers/AppLogger";
import H1 from "../../components/Headings";
import "./style.css";

const SignUp = () => {
  // Dispatchers
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Localization and Constants
  const appConstants = useLocalizedConstants();
  const localizedToastMsg = useLocalizedToast();

  // Custom Hooks
  useLocalizedPageTitle(appConstants.pageTitles.signUp);

  // Reducer States
  const { user, token } = useSelector((state) => state.AuthenticationReducer);

  // Get the company id from the Reducer
  const company_id = useSelector((state) =>
    get(state.WhiteLabelingReducer.whiteLabelling, "company_id", "")
  );

  // Local States
  // const [subDomain, setSubDomain] = useState("localhost");
  const subDomain = window.location.hostname;
  const [isAgreed, setIsAgreed] = useState(false);
  const [signUpBody, setSignupBody] = useState({
    first_name: "",
    last_name: "",
    ni_number: "",
    phone_number: "",
    password: "",
    password_confirm: "",
  });

  useEffect(() => {
    if (user && token) {
      showInfoToast(localizedToastMsg.pleaseLogoutFromCurrentSessionToContinue);
      navigate(AppRoutes.dashboard);
    }
  }, []);

  const signupFields = [
    {
      title: appConstants.firstName,
      value: signUpBody.first_name,
      onChange: (e) => {
        setSignupBody({ ...signUpBody, first_name: e.target.value });
      },
      inputStyle: {},
    },
    {
      title: appConstants.lastName,
      value: signUpBody.last_name,
      onChange: (e) => {
        setSignupBody({ ...signUpBody, last_name: e.target.value });
      },
      inputStyle: {},
    },
    {
      title: appConstants.titles.NINumber,
      value: signUpBody.ni_number,
      onChange: (e) => {
        setSignupBody({ ...signUpBody, ni_number: e.target.value });
      },
      inputStyle: {},
    },
    {
      type: "phoneNumber",
      title: appConstants.titles.phoneNumber,
      value: signUpBody.phone_number,

      onChange: (e) => {
        setSignupBody({
          ...signUpBody,
          phone_number: AppUtilities.format_phone_number(e),
        });
      },
      inputStyle:
        signUpBody.phone_number.length > 0 &&
          !parsePhoneNumber(signUpBody.phone_number)?.isValid()
          ? { border: "1px solid red" }
          : {},
    },
    {
      title: appConstants.titles.password,
      value: signUpBody.password,
      onChange: (e) => {
        setSignupBody({ ...signUpBody, password: e.target.value });
      },
      type: "password",
      inputStyle: {},
    },
    {
      title: appConstants.titles.confirmPassword,
      value: signUpBody.password_confirm,
      onChange: (e) => {
        setSignupBody({ ...signUpBody, password_confirm: e.target.value });
      },
      type: "password",
    },
  ];

  const handleSignUp = () => {
    if (!isAgreed) {
      showWarningToast(localizedToastMsg.agreeToTerms);
      return;
    }
    if (company_id) {
      dispatch(signupRequest({ signUpBody, subDomain }))
        .then(unwrapResult)
        .then((res) => {
          AppLogger("Response at handleSignUp", res);
          showSuccessToast(res.message ?? localizedToastMsg.signUpSuccess);
          navigate(AppRoutes.dashboard);
          // navigate(
          //   AppRoutes.accountSuccess + `?user_id=${get(res, "data.user.id", "")}`
          // );
        })
        .catch((err) => {
          AppLogger("Error at handleSignUp", err);
          showFaliureToast(err.message ?? localizedToastMsg.signUpFailed);
        });
    } else {
      navigate(AppRoutes.notFound);
    }
  };

  const isDisabled = () => {
    for (const [_, value] of Object.entries(signUpBody)) {
      if (!value) {
        return true;
      } else {
        if (!parsePhoneNumber(signUpBody.phone_number)?.isValid()) {
          return true;
        }
      }
    }

    return false;
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div
          className="col-12 col-lg-6 col-md col-sm-12 bg-image2"
          style={{
            backgroundImage: `url(${AppImages.signupbg1})`,
          }}
        />
        <div
          className="signup-bg col p-0 d-flex justify-content-sm-center align-items-center flex-column fields-upcontner"
          style={{ backgroundImage: `url(${AppImages.signupbg2})` }}
        >
          <div className="headingWithText">
            <H1 title={appConstants.pageTitles.signUp} subTitle={appConstants.descriptions.create_your_hope_ui_account} />
          </div>
          <div className="col-12 col-lg-9 col-md col-sm-0 signup-fields">
            {signupFields.map((field, index) => {
              const { title, value, onChange, type, inputStyle } = field;
              return (
                <SignupTextField
                  key={index}
                  title={title}
                  value={value}
                  onChange={onChange}
                  // customStyle={{ marginRight: "4px" }}
                  type={type}
                  inputStyle={inputStyle}
                />
              );
            })}
          </div>
          <div className="mt-5 d-flex align-items-center mb-4">
            <input
              className="check-box"
              type="checkbox"
              value={isAgreed}
              onChange={(e) => {
                setIsAgreed(e.target.checked);
              }}
            />
            <label className="term-privacy ml-1">
              {appConstants.descriptions.i_agree_with_the_terms_of_use}
            </label>
          </div>
          <div>
            <PrimaryButton
              title="Sign up"
              isDisabled={isDisabled()}
              onClick={() => handleSignUp()}
            />
            <div className="mt-4 fs-6" style={{ marginBottom: "4px" }}>
              {appConstants.descriptions.already_have_an_account}
              <Link to={AppRoutes.login} className="color pointer">
                {appConstants.titles.signin}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
