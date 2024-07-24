import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { VivupLoginRequest } from "../../redux/reducers/AuthenticationReducer";
import { unwrapResult } from "@reduxjs/toolkit";
import { showFaliureToast } from "../../helpers/AppToasts";
import { useNavigate } from "react-router-dom";
import { get } from "lodash";
import useLocalizedConstants from "../../hooks/useLocalizedConstants";
import AppLogger from "../../helpers/AppLogger";
import AppRoutes from "../../helpers/AppRoutes";
import APIConstants from "../../helpers/APIConstants";
import AppUtilities from "../../helpers/AppUtilities";

export default function Vivup() {
  const vivupLoginBtn = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const appConstants = useLocalizedConstants();

  const { user, token } = useSelector((state) => state.AuthenticationReducer);
  const { whiteLabelling } = useSelector((state) => state.WhiteLabelingReducer);

  const [samlReponse, setSamlReponse] = useState("");
  const [showModal, setShowModal] = useState(true);

  //When model is set to show this method is called
  useEffect(() => {
    handleVivupLogin();
  }, []);

  const handleVivupLogin = () => {
    dispatch(
      VivupLoginRequest({
        userId: get(user, "company_user_id", ""),
        token: token,
      })
    )
      .then(unwrapResult)
      .then((res) => {
        AppLogger("Response at VivupLoginRequest", res);
        setSamlReponse(get(res, "data.SAMLResponse", ""));
      })
      .catch((err) => {
        AppLogger("Error at VivupLoginRequest", err);
        showFaliureToast(err.message);
        AppUtilities.isSessionTimedOut(err, navigate, dispatch);
      });
  };

  const handleHideModal = () => {
    navigate(AppRoutes.dashboard);
  };

  return (
    <div>
      <Modal
        closeIcon
        centered={true}
        open={showModal}
        onOk={() => {
          setShowModal(false);
        }}
        onCancel={() => handleHideModal()}
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
      >
        <h2 className="heading-add-update">
          {AppUtilities.isAdmin(user)
            ? appConstants.vivup_admin
            : appConstants.vivup}
        </h2>
        {samlReponse && (
          <form
            target="_blank"
            ref={vivupLoginBtn}
            method="post"
            // action={whiteLabelling.company.acs_url}
            action={get(whiteLabelling, "company.acs_url", "")}
          >
            <input type="hidden" name="SAMLResponse" value={samlReponse} />
            <input
              style={{ display: "none" }}
              className="fs-5 border-0"
              type="submit"
              value="Ready for Benefits Login"
            />
          </form>
        )}
        <p className="card-paragraph-font mt-2">
          {appConstants.vivup_site_leaving_warning}
        </p>
        <div className="justify-content-start mt-2 ">
          <Button
            style={{
              backgroundColor: "var(--primary-btn-color)",
              color: "#fff",
            }}
            className="fs-5 border-0"
            variant="secondary"
            onClick={() => handleHideModal()}
          >
            {appConstants.buttons.cancel}
          </Button>

          <Button
            disabled={!samlReponse}
            style={{
              backgroundColor: "#D3D3D9",
              color: "var(--primary-btn-color)",
            }}
            className="fs-5 border-0 ml-1"
            onClick={() => vivupLoginBtn.current.submit()}
          >
            {appConstants.proceed_to_vivup}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
