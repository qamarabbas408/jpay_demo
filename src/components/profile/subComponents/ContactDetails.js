import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { unwrapResult } from "@reduxjs/toolkit";
import { get } from "lodash";
import { Button, Modal } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import {
  getContactDetailsRequest,
  updateContactDetailsRequest,
} from "../../../redux/reducers/ProfileReducer";
import { showFaliureToast, showSuccessToast } from "../../../helpers/AppToasts";
import parsePhoneNumber from "libphonenumber-js";
import ContactDetailsPhoneInfo from "./ContactDetailsPhoneInfo";
import useLocalizedConstants from "../../../hooks/useLocalizedConstants";
import useLocalizedPageTitle from "../../../hooks/useLocalizedPageTitle";
import AppLogger from "../../../helpers/AppLogger";
import useLocalizedToast from "../../../hooks/useLocalizedToast";
import AppUtilities from "../../../helpers/AppUtilities";
function ContactDetails() {
  // Dispatchers
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  // Localization and Constants
  const appConstants = useLocalizedConstants();
  const localizedToastMsg = useLocalizedToast();
  // Reducer States

  const { contactDetails, profileUser } = useSelector(
    (state) => state.ProfileReducer
  );
  const { token, user } = useSelector((state) => state.AuthenticationReducer);

  // Constants
  const userId = params.get("user_id");

  // Custom Hooks
  useLocalizedPageTitle(appConstants.pageTitles.profile);

  // Local States
  const [showModal, setShowModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [contactBody, setContactBody] = useState({
    manager: get(contactDetails, "manager", ""),
    support_line: get(contactDetails, "support_line", ""),
  });

  useEffect(() => {
    handleGetContactDetailsRequest();
  }, [userId]);

  useEffect(() => {
    setContactBody({
      manager: get(contactDetails, "manager", ""),
      support_line: get(contactDetails, "support_line", ""),
    });
  }, [contactDetails]);

  const getSelectedUserId = () => {
    return userId ?? get(profileUser, "company_user_id", "");
  };

  const handleGetContactDetailsRequest = () => {
    dispatch(getContactDetailsRequest({ token, user_id: getSelectedUserId() }))
      .then(unwrapResult)
      .then((res) => {
        AppLogger("Response at getContactDetailsRequest", res);
      })
      .catch((err) => {
        AppLogger("Error at getContactDetailsRequest", err);
      });
  };

  const handleUpdateUserAddressRequest = (user_id, company_id) => {
    dispatch(
      updateContactDetailsRequest({
        token,
        user_id: user_id,
        company_id: company_id,
        contactBody,
      })
    )
      .then(unwrapResult)
      .then((res) => {
        AppLogger("Response at updateContactDetailsRequest", res);
        handleGetContactDetailsRequest();
        showSuccessToast(res.message ?? localizedToastMsg.updateDetailsSuccess);
        setShowModal(false);
      })
      .catch((err) => {
        AppLogger("Error at updateContactDetailsRequest", err);
        showFaliureToast(err.message ?? localizedToastMsg.updateDetailsFailed);
        AppUtilities.isSessionTimedOut(err, navigate, dispatch);
      });
    setIsUpdating(false)
  };

  return (
    <div>
      <Modal
        className="fade"
        show={showModal}
        onHide={() => setShowModal(false)}
        centered={true}
      >
        <Modal.Body className="add-emp-modal-form" closeButton>
          <div className={`alert-heading`}>
            <h2 className="font-w700">
              {appConstants.titles.saveContactDetails}
            </h2>
            <p className="mt-2 txtInp-title">
              {appConstants.saveContactDetailsDesc}
            </p>
          </div>
          <div className="d-flex justify-content-end">
            <Button
              variant="primary tp-btn-light"
              onClick={() =>
                handleUpdateUserAddressRequest(null, getSelectedUserId())
              }
            >
              {appConstants.buttons.singleEmployee}
            </Button>
            <Button
              className="me-2"
              variant="primary"
              onClick={() =>
                handleUpdateUserAddressRequest(
                  null,
                  get(profileUser, "company_id", "")
                )
              }
            >
              {appConstants.buttons.allContacts}
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      <h5>{appConstants.contactDetails}</h5>
      <ContactDetailsPhoneInfo
        title={appConstants.manager}
        value={contactBody.manager}
        isUpdating={isUpdating}
        disabled={!AppUtilities.isAdmin(user)}
        onChange={(e) =>
          setContactBody({
            ...contactBody,
            manager: AppUtilities.format_phone_number(e),
          })
        }
        inputStyle={
          contactBody.manager.length > 0 &&
            !parsePhoneNumber(contactBody.manager)?.isValid()
            ? { border: "1px solid red" }
            : {}
        }
      />
      <div className="mt-1">
        <ContactDetailsPhoneInfo
          title={appConstants.supportLine}
          value={contactBody.support_line}
          isUpdating={isUpdating}
          disabled={!AppUtilities.isAdmin(user)}
          onChange={(e) =>
            setContactBody({
              ...contactBody,
              support_line: AppUtilities.format_phone_number(e),
            })
          }
          inputStyle={
            contactBody.support_line.length > 0 &&
              !parsePhoneNumber(contactBody.support_line)?.isValid()
              ? { border: "1px solid red" }
              : {}
          }
        />
      </div>
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
              onClick={() => setShowModal(true)}
              variant="secondary"
              className="me-2 py-1"
              disabled={
                !contactBody.manager ||
                (contactBody.manager &&
                  !parsePhoneNumber(contactBody.manager)?.isValid()) ||
                !contactBody.support_line ||
                (contactBody.support_line &&
                  !parsePhoneNumber(contactBody.support_line)?.isValid())
              }
            >
              {appConstants.buttons.save}
            </Button>
            <Button
              onClick={() => {
                setIsUpdating(false);
                setContactBody({
                  manager: get(contactDetails, "manager", ""),
                  support_line: get(contactDetails, "support_line", ""),
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
    </div>
  );
}

ContactDetails.propTypes = {};

export default ContactDetails;
