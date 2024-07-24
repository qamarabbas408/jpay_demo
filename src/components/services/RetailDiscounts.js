import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { useNavigate } from "react-router";
import { Button } from "react-bootstrap";
import { get } from "lodash";
import { clickThroughRateRequest } from "../../redux/reducers/ReportsReducer";
import useLocalizedConstants from "../../hooks/useLocalizedConstants";
import useLocalizedPageTitle from "../../hooks/useLocalizedPageTitle";
import AppLogger from "../../helpers/AppLogger";
import AppConstants from "../../helpers/AppConstants";
import CardTitle from "../common/CardTitle";
import ParaType1 from "../common/ParaType1";
import AppUtilities from "../../helpers/AppUtilities";

function RetailDiscounts() {
  // Dispatchers
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Localization and Constants
  const appConstants = useLocalizedConstants();

  // Reducer States
  const { user, token } = useSelector((state) => state.AuthenticationReducer);

  // Custom Hooks
  useLocalizedPageTitle(appConstants.pageTitles.retailDiscounts);

  // Local States

  const handleClickThroughRateRequest = () => {
    dispatch(
      clickThroughRateRequest({
        userId: get(user, "company_user_id", ""),
        token,
        key: AppConstants.servicesTypes.retail_dicounts,
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
        text={appConstants.retailDiscounts}
        styles={"text-center mt-2"}
      />

      <div className="d-flex flex-column align-items-center align-items-sm-start gap-2 gap-sm-0 flex-sm-row mx-sm-5">
        <div className="p-0 mx-1 ">
          {/* TODOP: add an action here */}
          <a
            href={AppConstants.externalUrls.retail_dicounts.accessYourDiscounts}
            target="_blank"
          >
            <Button
              variant="secondary"
              id="pension-portal-access"
              onClick={() => handleClickThroughRateRequest()}
            >
              {appConstants.accessYourDiscounts}
            </Button>
          </a>
        </div>
        {/* <div className="p-0 mx-1">
          <a
            href={AppConstants.externalUrls.retail_dicounts.accessYourDiscounts}
            target="_blank"
          >
            <Button
              variant="secondary"
              id="pension-portal-access"
              onClick={() => handleClickThroughRateRequest()}
            >
              {appConstants.accessYourSalary}
            </Button>
          </a>
        </div> */}
      </div>

      <ParaType1
        text={appConstants.servicesIntro}
        styles={"card-paragraph-font mt-3 px-sm-5"}
      />
      <ParaType1
        text={appConstants.retailDiscountspara1}
        styles={"card-paragraph-font px-sm-5"}
      />
    </div>
  );
}

RetailDiscounts.propTypes = {};

export default RetailDiscounts;
