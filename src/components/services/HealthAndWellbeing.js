import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { unwrapResult } from "@reduxjs/toolkit";
import { Button } from "react-bootstrap";
import { get } from "lodash";
import { clickThroughRateRequest } from "../../redux/reducers/ReportsReducer";
import useLocalizedConstants from "../../hooks/useLocalizedConstants";
import useLocalizedPageTitle from "../../hooks/useLocalizedPageTitle";
import AppLogger from "../../helpers/AppLogger";
import AppConstants from "../../helpers/AppConstants";
import ListItem from "../common/ListItem";
import ParaType1 from "../common/ParaType1";
import CardTitle from "../common/CardTitle";
import AppUtilities from "../../helpers/AppUtilities";

function HealthAndWellbeing() {
  // Dispatchers
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Localization and Constants
  const appConstants = useLocalizedConstants();

  // Reducer States
  const { user, token } = useSelector((state) => state.AuthenticationReducer);

  // Custom Hooks
  useLocalizedPageTitle(appConstants.pageTitles.healthAndWellbeing);

  // Local States

  // TODO: change this number. to be done after implementing API
  const codeNumber = 72135;

  const handleClickThroughRateRequest = () => {
    dispatch(
      clickThroughRateRequest({
        userId: get(user, "company_user_id", ""),
        token,
        key: AppConstants.servicesTypes.health_and_wellbeing,
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
    <div className="card m-4 m-sm-5 p-3 pb-5 ">
      <CardTitle
        text={appConstants.healthAndWellbeing}
        styles={"text-center mt-2"}
      />

      <div className="mx-5">
        <div className="d-flex flex-column gap-2  flex-sm-row gap-sm-0 p-0">
          <a
            href={AppConstants.externalUrls.health_and_wellbeing.freeWellBeing}
            target="_blank"
          >
            <Button
              variant="secondary"
              className={"mx-1"}
              id="pension-portal-access"
              // size="lg"
              onClick={() => handleClickThroughRateRequest()}
            >
              {appConstants.freeWellbeingCheck}
            </Button>
          </a>
          <a
            href={AppConstants.externalUrls.health_and_wellbeing.gymDiscounts}
            target="_blank"
          >
            <Button
              variant="secondary"
              className={"mx-1"}
              id="pension-portal-access"
              // size="lg"
              onClick={() => handleClickThroughRateRequest()}
            >
              {appConstants.gymDiscounts}
            </Button>
          </a>
          <a href={"tel:08000744319"}>
            <Button
              variant="secondary"
              className={"mx-1"}
              id="pension-portal-access"
              // size="lg"
              onClick={() => handleClickThroughRateRequest()}
            >
              {appConstants.callMedicalSpecialist}
            </Button>
          </a>
        </div>
      </div>

      <ParaType1
        text={appConstants.WellbeingIntro}
        styles={"card-paragraph-font mt-3 px-sm-5"}
      />
      <ParaType1
        text={appConstants.WellbeingPara1}
        styles={"card-paragraph-font px-sm-5"}
      />

      <p className="card-paragraph-font px-sm-5">
        {appConstants.WellbeingCallToAction}
        <strong> {codeNumber} </strong>
        {appConstants.toRegister}
      </p>

      <div class="card-paragraph-font mx-3 mx-sm-5 px-sm-5">
        <ListItem
          text={appConstants.featureListItem1}
          fillColor={"var(--secondary)"}
        />
        <ListItem
          text={appConstants.featureListItem2}
          fillColor={"var(--secondary)"}
        />
        <ListItem
          text={appConstants.featureListItem3}
          fillColor={"var(--secondary)"}
        />
        <ListItem
          text={appConstants.featureListItem4}
          fillColor={"var(--secondary)"}
        />
        <ListItem
          text={appConstants.featureListItem5}
          fillColor={"var(--secondary)"}
        />
      </div>

      <ParaType1
        text={appConstants.wellbeingPara2}
        styles={"card-paragraph-font px-sm-5 mt-2"}
      />

      <div class="card-paragraph-font mx-3 mx-sm-5 px-sm-5">
        <ListItem
          text={appConstants.wellbeingItem1}
          fillColor={"var(--secondary)"}
        />
        <ListItem
          text={appConstants.wellbeingItem2}
          fillColor={"var(--secondary)"}
        />
        <ListItem
          text={appConstants.wellbeingItem3}
          fillColor={"var(--secondary)"}
        />
      </div>
    </div>
  );
}

HealthAndWellbeing.propTypes = {};

export default HealthAndWellbeing;
