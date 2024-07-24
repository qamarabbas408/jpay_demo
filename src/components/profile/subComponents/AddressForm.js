import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { get } from "lodash";
import { Button } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import {
  getUserAddressRequest,
  updateUserAddressRequest,
} from "../../../redux/reducers/ProfileReducer";
import { showFaliureToast, showSuccessToast } from "../../../helpers/AppToasts";
import FormFieldText from "../../common/FormFieldText";
import useLocalizedConstants from "../../../hooks/useLocalizedConstants";
import useLocalizedPageTitle from "../../../hooks/useLocalizedPageTitle";
import AppLogger from "../../../helpers/AppLogger";
import useLocalizedToast from "../../../hooks/useLocalizedToast";
import AppUtilities from "../../../helpers/AppUtilities";

function AddressForm() {
  // Dispatchers
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [params] = useSearchParams();

  // Localization and Constants
  const appConstants = useLocalizedConstants();
  const localizedToastMsg = useLocalizedToast();

  // Constants
  const userId = params.get("user_id");

  // Reducer States

  const { userAddress, profileUser } = useSelector(
    (state) => state.ProfileReducer
  );
  const { token, user } = useSelector((state) => state.AuthenticationReducer);

  // Custom Hooks
  useLocalizedPageTitle(appConstants.pageTitles.profile);

  // Local States
  const [isUpdating, setIsUpdating] = useState(false);
  const [addressBody, setAddressBody] = useState({
    house_no: "",
    street: "",
    county: "",
    post_code: "",
    country: "",
  });

  useEffect(() => {
    setAddressBody({
      house_no: get(userAddress, "house_no", ""),
      street: get(userAddress, "street", ""),
      county: get(userAddress, "county", ""),
      post_code: get(userAddress, "post_code", ""),
      country: get(userAddress, "country", ""),
    });
  }, [userAddress]);

  useEffect(() => {
    handleGetUserAddressRequest();
  }, [userId]);

  const getSelectedUserId = () => {
    return userId ?? get(profileUser, "company_user_id", "");
  };

  const handleGetUserAddressRequest = () => {
    dispatch(getUserAddressRequest({ token, user_id: getSelectedUserId() }))
      .then(unwrapResult)
      .then((res) => {
        AppLogger("Response at getUserAddressRequest", res);
      })
      .catch((err) => {
        AppLogger("Error at getUserAddressRequest", err);
      });
  };

  const handleUpdateUserAddressRequest = () => {
    dispatch(
      updateUserAddressRequest({
        token,
        user_id: getSelectedUserId(),
        addressBody,
      })
    )
      .then(unwrapResult)
      .then((res) => {
        AppLogger("Response at updateUserAddressRequest", res);
        showSuccessToast(res.message ?? localizedToastMsg.updateAddressSuccess);
      })
      .catch((err) => {
        AppLogger("Error at updateUserAddressRequest", err);
        showFaliureToast(err.message ?? localizedToastMsg.updateAddressFailed);
        AppUtilities.isSessionTimedOut(err, navigate, dispatch);
      });
  };

  const handleSubmit = () => {
    handleUpdateUserAddressRequest();
    setIsUpdating(false);
  };

  return (
    <div>
      <h4>{appConstants.address}</h4>
      <form className="profile-address-form" onSubmit={handleSubmit}>
        <FormFieldText
          disabled={!isUpdating}
          title={appConstants.houseNo}
          placeholder={appConstants.placeholderHouseNo}
          value={addressBody.house_no}
          onChange={(e) =>
            setAddressBody({ ...addressBody, house_no: e.target.value })
          }
        />
        <FormFieldText
          disabled={!isUpdating}
          title={appConstants.street}
          placeholder={appConstants.placeholderStreet}
          value={addressBody.street}
          onChange={(e) =>
            setAddressBody({ ...addressBody, street: e.target.value })
          }
        />
        <FormFieldText
          disabled={!isUpdating}
          title={appConstants.county}
          placeholder={appConstants.placeholderCounty}
          value={addressBody.county}
          onChange={(e) =>
            setAddressBody({ ...addressBody, county: e.target.value })
          }
        />
        <FormFieldText
          disabled={!isUpdating}
          title={appConstants.country}
          placeholder={appConstants.placeholderCountry}
          value={addressBody.country}
          onChange={(e) =>
            setAddressBody({ ...addressBody, country: e.target.value })
          }
        />
        <FormFieldText
          disabled={!isUpdating}
          title={appConstants.postCode}
          placeholder={appConstants.placeholderPostCode}
          value={addressBody.post_code}
          onChange={(e) =>
            setAddressBody({ ...addressBody, post_code: e.target.value })
          }
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
                onClick={() => handleSubmit()}
                variant="secondary"
                className="me-2 py-1"
              >
                {appConstants.buttons.save}
              </Button>
              <Button
                onClick={() => {
                  setIsUpdating(false);
                  setAddressBody({
                    house_no: get(userAddress, "house_no", ""),
                    street: get(userAddress, "street", ""),
                    county: get(userAddress, "county", ""),
                    post_code: get(userAddress, "post_code", ""),
                  });
                }}
                variant="light"
                className="me-2 py-1"
              >
                {appConstants.buttons.cancel}
              </Button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}

export default AddressForm;
