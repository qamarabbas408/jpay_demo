import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import AppConstants from "../../../helpers/AppConstants";
import useLocalizedConstants from "../../../hooks/useLocalizedConstants";
import { Stack } from "react-bootstrap";
import AppLogger from "../../../helpers/AppLogger";
import { resendLoginEmail } from "../../../redux/reducers/ProfileReducer";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { showFaliureToast, showSuccessToast } from "../../../helpers/AppToasts";
import AppUtilities from "../../../helpers/AppUtilities";
import useLocalizedToast from "../../../hooks/useLocalizedToast";
import { get } from "lodash";

function UserAvatar(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userAvatar, userName, userDesignation, userEmail, userId, isAdmin } =
    props;
  const { token, user } = useSelector((state) => state.AuthenticationReducer);
  const appConstants = useLocalizedConstants();
  const localizedToastMsg = useLocalizedToast();

  const handleResendEmailRequest = () => {
    dispatch(
      resendLoginEmail({
        token,
        userId,
      })
    )
      .then(unwrapResult)
      .then((res) => {
        AppLogger("Response at resend login", res);
        showSuccessToast(res.message ?? "success in sending resend login");
      })
      .catch((err) => {
        AppLogger("Error at resend login", err);
        showFaliureToast(err.message ?? "Error in sending resend login");
        AppUtilities.isSessionTimedOut(err, navigate, dispatch);
      });
  };

  const showResendEmail = () => {
    if (userEmail && isAdmin != 1) {
      return (
        get(user, "is_admin", 0) == 1 &&
        get(user, "company_user_id", 0) != userId
      );
    } else return false;
  };

  return (
    <div>
      <div className="d-flex align-items-center">
        <img
          src={userAvatar}
          className="avatar avatar-md rounded-circle fit-content fireFoxStyle"
          alt=""
        />
        <div className="ms-2">
          <Stack gap={0}>
            <div className="mb-0 text-start font-w500">{userName}</div>
            <div>{userDesignation}</div>
            {showResendEmail() && (
              <button
                className=" text-start bg-transparent border-0 fw-semibold"
                onClick={() => handleResendEmailRequest()}
              >
                <a className="" style={{ fontSize: "12px" }}>
                  {appConstants.resendLoginEmail}
                </a>
              </button>
            )}
          </Stack>
        </div>
      </div>
    </div>
  );
}

UserAvatar.propTypes = {
  userAvatar: PropTypes.string,
  userName: PropTypes.string,
  userDesignation: PropTypes.string,
};

export default UserAvatar;
