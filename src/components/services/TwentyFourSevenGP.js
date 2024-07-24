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
import ListItem from "../common/ListItem";
import ParaType1 from "../common/ParaType1";
import CardTitle from "../common/CardTitle";
import CardSubHeading from "../common/CardSubHeading";
import AppUtilities from "../../helpers/AppUtilities";

function TwentyFourSevenGP() {
  // Dispatchers
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Localization and Constants
  const appConstants = useLocalizedConstants();

  // Reducer States
  const { user, token } = useSelector((state) => state.AuthenticationReducer);

  // Custom Hooks
  useLocalizedPageTitle(appConstants.pageTitles.twentyFourSevenGP);

  // Local States

  const handleClickThroughRateRequest = () => {
    dispatch(
      clickThroughRateRequest({
        userId: get(user, "company_user_id", ""),
        token,
        key: AppConstants.servicesTypes.twentyfour_7_gp,
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
      <CardTitle text={appConstants.twentyFourSevenGP} />
      <div className="d-flex justify-content-center justify-content-sm-start  mx-sm-5">
        <div className="p-0 mx-1">
          <a href={"tel:08002062576"}>
            <Button
              variant="secondary"
              id="pension-portal-access"
              onClick={() => handleClickThroughRateRequest()}
            >
              {appConstants.calllDoctor}
            </Button>
          </a>
        </div>
      </div>
      <ParaType1
        text={appConstants.services24_7GPIntro}
        styles={"card-paragraph-font mt-3 px-sm-5"}
      />
      <CardSubHeading
        text={appConstants.telephoneConsultationAvailable}
        styles={"mx-2 mx-sm-5"}
      />
      <ParaType1
        text={appConstants.telephonePara1}
        styles={"card-paragraph-font  mb-0 px-sm-5"}
      />
      <ParaType1
        text={appConstants.telephonePara2}
        styles={"card-paragraph-font px-sm-5"}
      />
      <CardSubHeading
        text={appConstants.videoConsultation}
        styles={"mx-2 mx-sm-5"}
      />

      <ParaType1
        text={appConstants.videoPara1}
        styles={"card-paragraph-font px-sm-5"}
      />
      <div class="mx-2 mx-sm-5 px-sm-5">
        <ListItem
          text={appConstants.videoListItem1}
          fillColor={"var(--secondary)"}
          styles={"card-paragraph-font"}
        />
        <ListItem
          text={appConstants.videoListItem2}
          fillColor={"var(--secondary)"}
          styles={"card-paragraph-font"}
        />
        <ListItem
          text={appConstants.videoListItem3}
          fillColor={"var(--secondary)"}
          styles={"card-paragraph-font"}
        />
      </div>

      <ParaType1
        text={appConstants.videoPara2}
        styles={"card-paragraph-font px-sm-5"}
      />
      <ParaType1
        text={appConstants.videoPara3}
        styles={"card-paragraph-font px-sm-5"}
      />

      <CardSubHeading
        text={appConstants.privatePrescription}
        styles={"mx-2 mx-sm-5"}
      />

      <ParaType1
        text={appConstants.callToActionText}
        styles={"card-paragraph-font px-sm-5"}
      />
    </div>
  );
}

TwentyFourSevenGP.propTypes = {};

export default TwentyFourSevenGP;
