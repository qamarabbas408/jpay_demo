import React, { useState, useEffect } from "react";
import { get, isEmpty } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { unwrapResult } from "@reduxjs/toolkit";
import { Button } from "react-bootstrap";
import { showFaliureToast, showSuccessToast } from "../../../helpers/AppToasts";
import { submitContactDetails } from "../../../redux/reducers/ProfileReducer";
import AppLogger from "../../../helpers/AppLogger";
import UserInformationObject from "./UserInformationObject";
import useLocalizedConstants from "../../../hooks/useLocalizedConstants";
import AppImages from "../../../helpers/AppImages";
import parsePhoneNumber from "libphonenumber-js";
import AppUtilities from "../../../helpers/AppUtilities";
import useLocalizedToast from "../../../hooks/useLocalizedToast";
import AppConstants from "../../../helpers/AppConstants";
function ContactInfo() {
  // Dispatchers
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Localization and Constants
  var isPhonenumberEmpty = false;
  var isEmailEmpty = false;

  const appConstants = useLocalizedConstants();
  const localizedToastMsg = useLocalizedToast();

  // Reducer States
  const { profileUser } = useSelector((state) => state.ProfileReducer);
  const { token, user } = useSelector((state) => state.AuthenticationReducer);
  const [isUpdating, setIsUpdating] = useState(false);

  const [contactBody, setContactBody] = useState({
    user_id: get(profileUser, "id", ""),
    phone_number: get(profileUser, "phone_number", ""),
    email: get(profileUser, "email", ""),
  });

  useEffect(() => {
    setContactBody({
      ...contactBody,
      user_id: get(profileUser, "id", ""),
      phone_number: get(profileUser, "phone_number", ""),
      email: get(profileUser, "email", ""),
    });
  }, [profileUser]);

  function canSubmitForm() {
    const errorMessage = {
      bothFieldsInvalid: "Invalid email and phone number",
      bothFieldsEmpty: "Both Fields are empty! At least one field is required",
      invalidPhonenumber: "Please add a valid phone number",
      invalidEmail: "Please add a valid email",
    };

    let phone_number = contactBody.phone_number;
    let email = contactBody.email;

    if (!phone_number) {
      if (AppConstants.validateEmail.test(email)) {
        isPhonenumberEmpty = true;
        setIsUpdating(false);
        return true;
      } else if (!email) {
        showFaliureToast(errorMessage.bothFieldsEmpty);
      } else {
        showFaliureToast(errorMessage.invalidEmail);
      }
    }

    if (phone_number && phone_number.length == 1) {
      if (phone_number.length === 1 && !email) {
        showFaliureToast(errorMessage.bothFieldsEmpty);
      } else if (AppConstants.validateEmail.test(email)) {
        isPhonenumberEmpty = true;
        setContactBody({
          ...contactBody,
          phone_number: phone_number.replace("+", ""),
        });
        setIsUpdating(false);
        return true;
      } else {
        showFaliureToast(errorMessage.invalidEmail);
      }
    }

    if (phone_number && phone_number.length > 1) {
      if (parsePhoneNumber(phone_number)?.isValid()) {
        if (email && AppConstants.validateEmail.test(email)) {
          AppLogger("");
          setIsUpdating(false);
          return true;
        } else if (!email) {
          isEmailEmpty = true;
          setIsUpdating(false);
          return true;
        } else {
          showFaliureToast(errorMessage.invalidEmail);
        }
      } else if (!AppConstants.validateEmail.test(email)) {
        showFaliureToast(errorMessage.bothFieldsInvalid);
      } else {
        showFaliureToast(errorMessage.invalidPhonenumber);
      }
    }

    // if (email && AppConstants.validateEmail.test(email)) {
    //   if (!phone_number) {
    //     isPhonenumberEmpty = true
    //     return false
    //   } else if (phone_number && phone_number > 1 && parsePhoneNumber(phone_number)?.isValid()) {
    //     return false
    //   } else {
    //     return true
    //   }
  }

  const handleSubmitContactDetails = () => {
    var formObj = contactBody;

    if (canSubmitForm()) {
      if (isPhonenumberEmpty) {
        delete formObj.phone_number;
      } else if (isEmailEmpty) {
        delete formObj.email;
      }

      // AppLogger("Payload Obj", formObj)
      dispatch(
        submitContactDetails({
          token,
          user_id: get(profileUser, "company_user_id", ""),
          contactBody: formObj,
        })
      )
        .then(unwrapResult)
        .then((res) => {
          AppLogger("Response at submitContactDetails", res);
          showSuccessToast(
            res.message ?? localizedToastMsg.updateDetailsSuccess
          );
          setIsUpdating(false);
        })
        .catch((err) => {
          AppLogger("Error at submitContactDetails", err);
          setIsUpdating(true);
          showFaliureToast(
            err.message ?? localizedToastMsg.updateDetailsFailed
          );
          AppUtilities.isSessionTimedOut(err, navigate, dispatch);
        });
    }
  };
  const handleCancelBtn = () => {
    // AppLogger(profileUser.phone_number)
    // AppLogger(profileUser.email)
    setIsUpdating(false);
    // AppLogger(profileUser)
    setContactBody({
      ...contactBody,
      phone_number: profileUser.phone_number ? profileUser.phone_number : "",
      email: profileUser.email ? profileUser.email : "",
    });
  };

  // function handleFormDisableState() {

  //   isPhonenumberEmpty = false
  //   isEmailEmpty = false

  //   let phone_number = contactBody.phone_number
  //   let email = contactBody.email

  //   //if only plus icon then we will remove and validate

  //   if (phone_number && phone_number.length === 1) {
  //     phone_number = phone_number.replace("+", "")
  //     setContactBody({ ...contactBody, phone_number: phone_number })
  //     // don't need to send + in API
  //     //phone number is empty but we have email then don't need to disable form
  //     if (email && email.length > 1 && AppConstants.validateEmail.test(email)) {
  //       return false
  //     } else if (!email) {
  //       return false
  //     }
  //   }

  //   if (phone_number && phone_number.length > 1 && parsePhoneNumber(phone_number)?.isValid()) {
  //     if (!email) {
  //       isEmailEmpty = true
  //       return false
  //     }
  //     else if (email && email.length > 1 && AppConstants.validateEmail.test(email)) {
  //       return false
  //     }
  //     else {
  //       return true
  //     }
  //   }
  //   else if (email && AppConstants.validateEmail.test(email)) {
  //     if (!phone_number) {
  //       isPhonenumberEmpty = true
  //       return false
  //     } else if (phone_number && phone_number > 1 && parsePhoneNumber(phone_number)?.isValid()) {
  //       return false
  //     } else {
  //       return true
  //     }
  //   } else {
  //     return true
  //   }
  // }

  return (
    <div>
      <h4 className="mt-4 mb-3">{appConstants.contact}</h4>
      <UserInformationObject
        isUpdating={isUpdating}
        title={appConstants.phone}
        value={contactBody.phone_number}
        icon={AppImages.mobile}
        onChange={(e) =>
          setContactBody({
            // ...contactBody, phone_number: e.target.value,
            ...contactBody,
            phone_number: AppUtilities.format_phone_number(e),
          })
        }
        inputStyle={
          contactBody.phone_number &&
          contactBody.phone_number.length > 0 &&
          !parsePhoneNumber(contactBody.phone_number)?.isValid()
            ? { border: "0.5px solid red" }
            : {}
        }
      />
      <div style={{ marginTop: 20 }}>
        <UserInformationObject
          isUpdating={isUpdating}
          title={appConstants.updateEmail}
          value={contactBody.email}
          icon={AppImages.mail}
          onChange={(e) =>
            setContactBody({
              ...contactBody,
              email: e.target.value,
            })
          }
          // inputStyle={
          //   contactBody.email &&
          //     contactBody.email.length > 0 &&
          //     !AppConstants.validateEmail.test(contactBody.email)
          //     ? { border: "1px solid red" }
          //     : {}
          // }
        />
        <div className="mt-4">
          {!isUpdating ? (
            AppUtilities.isAdmin(user) && (
              <Button
                onClick={() => setIsUpdating(true)}
                variant="secondary"
                className="me-2 py-1"
              >
                {appConstants.buttons.edit}
              </Button>
            )
          ) : (
            <>
              <Button
                onClick={() => handleSubmitContactDetails()}
                variant="secondary"
                className="me-2 py-1"
                // disabled={handleFormDisableState()
                // !validForm
                //   !contactBody.email ||
                //   !contactBody.phone_number ||
                //   // !AppConstants.validateEmail.test(contactBody.email) ||
                //   !parsePhoneNumber(contactBody.phone_number)?.isValid()
                // }
              >
                {appConstants.buttons.save}
              </Button>
              <Button
                onClick={handleCancelBtn}
                variant="light"
                className="me-2 py-1"
              >
                {appConstants.buttons.cancel}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

ContactInfo.propTypes = {};

export default ContactInfo;
