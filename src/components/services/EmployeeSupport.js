import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { unwrapResult } from "@reduxjs/toolkit";
import { Button } from "react-bootstrap";
import { get } from "lodash";
import { clickThroughRateRequest } from "../../redux/reducers/ReportsReducer";
import useLocalizedConstants from "../../hooks/useLocalizedConstants";
import useLocalizedPageTitle from "../../hooks/useLocalizedPageTitle";
import ListItem from "../common/ListItem";
import CardTitle from "../common/CardTitle";
import ParaType1 from "../common/ParaType1";
import AppLogger from "../../helpers/AppLogger";
import AppConstants from "../../helpers/AppConstants";
import AppUtilities from "../../helpers/AppUtilities";

function EmployeeSupport() {
  // Dispatchers
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Localization and Constants
  const appConstants = useLocalizedConstants();

  // Reducer States
  const { user, token } = useSelector((state) => state.AuthenticationReducer);

  // Custom Hooks
  useLocalizedPageTitle(appConstants.pageTitles.employeeSupport);

  // Local States

  // TODO: add links. To be done after implementing AppRoutes
  const links = [
    {
      text: appConstants.emotionalCounselling,
      to: "#",
    },
    {
      text: appConstants.supportListItem2,
      to: "#",
    },
    {
      text: appConstants.supportListItem3,
      to: "#",
    },
  ];

  const handleClickThroughRateRequest = () => {
    dispatch(
      clickThroughRateRequest({
        userId: get(user, "company_user_id", ""),
        token,
        key: AppConstants.servicesTypes.employee_support,
      })
    )
      .then(unwrapResult)
      .then((res) => {
        AppLogger("Response at clickThroughRateRequest", res);
      })
      .catch((err) => {
        AppLogger("Error at clickThroughRateRequest", err);
        AppUtilities.isSessionTimedOut(err, navigate, dispatch);
      });
  };

  return (
    <div className="card m-4 m-sm-5 p-3">
      <CardTitle
        text={appConstants.employeeSupport}
        styles={"text-center mt-2"}
      />

      <div className="d-flex justify-content-center justify-content-sm-start mx-0 mx-sm-5 ">
        <div className="p-0 mx-1">
          <a href={"tel:08001076147"}>
            <Button
              variant="secondary"
              id="pension-portal-access"
              onClick={() => handleClickThroughRateRequest()}
            >
              {appConstants.callUs}
            </Button>
          </a>
        </div>
        <div className="p-0 mx-1">
          <a
            href={AppConstants.externalUrls.employeSupport.accessOnlineSupport}
            target="_blank"
          >
            <Button
              variant="secondary"
              id="pension-portal-access"
              onClick={() => handleClickThroughRateRequest()}
            >
              {appConstants.accessOnlineSupport}
            </Button>
          </a>
        </div>
      </div>

      {/* TODO: add dynamic code for each user here */}
      <p className={"card-paragraph-font mt-3 px-sm-5"}>
        {appConstants.onlineSupportCode} <strong>{"72135"}</strong>
      </p>
      <ParaType1
        text={appConstants.callToActionText}
        styles={"card-paragraph-font px-sm-5"}
      />

      {links.map((item) => {
        return (
          <div class="mx-2 px-2 mx-sm-5 px-sm-5">
            <ListItem
              text={item.text}
              fillColor={"var(--secondary)"}
              styles={"card-paragraph-font"}
            />
          </div>
        );
      })}
    </div>
  );
}

EmployeeSupport.propTypes = {};

export default EmployeeSupport;
