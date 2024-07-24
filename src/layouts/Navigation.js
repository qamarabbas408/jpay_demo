import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { get } from "lodash";
import {
  getRolesListRequest,
  getTagsListRequest,
} from "../redux/reducers/ProfileReducer";
import { userEmployeeRequest } from "../redux/reducers/AuthenticationReducer";
import { showFaliureToast, showWarningToast } from "../helpers/AppToasts";
import useLocalizedConstants from "../hooks/useLocalizedConstants";
import useLocalizedPageTitle from "../hooks/useLocalizedPageTitle";
import useLocalizedToast from "../hooks/useLocalizedToast";
import AppLogger from "../helpers/AppLogger";
import SideBar from "./SideBar";
import NavHeader from "./NavHeader";
import Header from "./Header";
import AppRoutes from "../helpers/AppRoutes";
import AppUtilities from "../helpers/AppUtilities";

const Navigation = ({ title, onClick: ClickToAddEvent }) => {
  // Dispatchers
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Localization and Constants
  const appConstants = useLocalizedConstants();
  const localizedToastMsg = useLocalizedToast()
  // Reducer States
  const { user, token } = useSelector((state) => state.AuthenticationReducer);
  const { tagsList, rolesList } = useSelector((state) => state.ProfileReducer);

  // Constants

  // Custom Hooks
  useLocalizedPageTitle(appConstants.pageTitles.login);

  // Local States
  const [toggle, setToggle] = useState("");

  useEffect(() => {
    if (user && token) {
      handleUserEmployeeRequest();
    } else {
      showWarningToast(localizedToastMsg.pleaseLoginToContinue);
      navigate(AppRoutes.login);
    }
  }, []);

  const handleUserEmployeeRequest = () => {
    dispatch(userEmployeeRequest({ user_id: get(user, "company_user_id", ""), token }))
      .then(unwrapResult)
      .then((res) => {
        AppLogger("Response at userEmployeeRequest", res);
        if (!tagsList.length > 0) {
          handleGetTagsListRequest();
        }
        if (!rolesList.length > 0) {
          handleGetRolesListRequest();
        }
      })
      .catch((err) => {
        showFaliureToast(err.message);
        AppLogger("Error at userEmployeeRequest", err);
        AppUtilities.isSessionTimedOut(err, navigate, dispatch);
      });
  };

  const handleGetRolesListRequest = () => {
    dispatch(
      getRolesListRequest({ companyId: get(user, "company_id", ""), token })
    )
      .then(unwrapResult)
      .then((res) => {
        AppLogger("Response at getRolesListRequest", res);
      })
      .catch((err) => {
        AppLogger("Error at getRolesListRequest", err);
      });
  };

  const handleGetTagsListRequest = () => {
    dispatch(
      getTagsListRequest({ companyId: get(user, "company_id", ""), token })
    )
      .then(unwrapResult)
      .then((res) => {
        AppLogger("Response at getTagsListRequest", res);
      })
      .catch((err) => {
        AppLogger("Error at getTagsListRequest", err);
      });
  };

  const onClick = (name) => {
    setToggle(toggle === name ? "" : name);
  };

  return (
    <Fragment>
      <NavHeader />

      <Header
        onNote={() => onClick("chatbox")}
        onNotification={() => onClick("notification")}
        onProfile={() => onClick("profile")}
        toggle={toggle}
        title={title}
        onBox={() => onClick("box")}
        onClick={() => ClickToAddEvent()}
      />
      <SideBar />
    </Fragment>
  );
};

export default Navigation;
