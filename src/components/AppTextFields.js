import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import AppImages from "../helpers/AppImages";
import "react-phone-number-input/style.css";
import "./style.css";

export const PrimaryTextField = ({
  title = "",
  onChange = () => { },
  type = "",
  keyboardType = "none",
  value = "",
  name = "",
  placeholder = "",
  addInputCss = "",
  inputStyle = {},
  isDisabled = false,
}) => {
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  return (
    <div className="container">
      <div className="row">
        <p className="mb-2 fs-6 p-0 txtInp-title">{title}</p>
        <input
          className={`inputField ${addInputCss}`}
          onChange={onChange}
          value={value}
          type={type != "password" ? type : isPasswordSecure && "password"}
          name={name}
          placeholder={placeholder}
          style={inputStyle}
          disabled={isDisabled}
          maxLength={87}
        />
        {
          type == "password" &&
          <div className="eye-icons-container" onClick={() => setIsPasswordSecure(!isPasswordSecure)}>
            {!isPasswordSecure ? (
              <img className="eye-icons" src={AppImages.eyeIcon} />
            ) : (
              <img className="eye-icons" src={AppImages.hiddenEyeIcon} />
            )}
          </div>
        }
      </div>
    </div>
  );
};

export const PhoneNumberTextField = ({
  title = "",
  onChange = () => { },
  type = "text",
  keyboardType = "none",
  value = "",
  name = "",
  customStyle = {},
}) => {
  return (
    <div style={customStyle}>
      <p className="mb-2 fs-6 p-0">{title}</p>
      <div className="signupInputField">
        <PhoneInput
          onChange={onChange}
          inputComponent={() => (
            <SignupTextField
              value={value}
              addCSS="sp-phone-input-internal"
              customStyle={customStyle}
            />
          )}
        />
      </div>
    </div>
  );
};

// Sigup Fields
export const SignupTextField = ({
  title = "",
  onChange = () => { },
  type = "text",
  keyboardType = "none",
  value = "",
  name = "",
  customStyle = {},
  addCSS = "",
  inputStyle = {},
}) => {
  return (
    <div style={customStyle}>
      <p className="mb-2 fs-6 p-0">{title}</p>
      <input
        className={`signupInputField ${addCSS}`}
        onChange={onChange}
        value={value}
        keyboardType={keyboardType}
        type={type}
        name={name}
        style={inputStyle}
      />
    </div>
  );
};
