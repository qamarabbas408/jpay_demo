import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router";
import { Button } from "react-bootstrap";
import { Select, Modal } from "antd";
import { useSearchParams } from "react-router-dom";
import { addDocumentRequest } from "../../redux/reducers/ProfileReducer";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { get } from "lodash";
import { showSuccessToast, showFaliureToast } from "../../helpers/AppToasts";
import { getNotificationsRequest } from "../../redux/reducers/AuthenticationReducer";
import MIMETYPES from "../../hooks/mimetypes";
import useLocalizedConstants from "../../hooks/useLocalizedConstants";
import useLocalizedPageTitle from "../../hooks/useLocalizedPageTitle";
import FormFieldUploadFile from "../common/FormFieldUploadFile";
import AppUtilities from "../../helpers/AppUtilities";
import AppLogger from "../../helpers/AppLogger";
import AppConstants from "../../helpers/AppConstants";

function UploadDocumentModal(props) {
  // Local States
  const {
    showModal,
    setShowModal,
    documnetDefaultValue = "p45",
    navigationRequired,
  } = props;

  const [requestBody, setRequestBody] = useState({
    type: "",
    file: "",
  });

  // Dispatchers
  const dispatch = useDispatch();
  const [params] = useSearchParams();

  // Navigate
  const navigate = useNavigate();

  // Constants
  const userId = params.get("user_id");

  // Local States
  const resetFileInputField = useRef(null);

  // Reducer States
  const { user, token } = useSelector((state) => state.AuthenticationReducer);

  const handleAddDocumentRequest = () => {
    dispatch(
      addDocumentRequest({
        userId: userId ?? get(user, "company_user_id", ""),
        type: requestBody.type,
        file: requestBody.file,
        token,
      })
    )
      .then(unwrapResult)
      .then((res) => {
        showSuccessToast(res.message);
        setRequestBody({
          file: "",
          type: documnetDefaultValue,
        });
        resetFileInputField.current.value = null;
        handleGetNotificationsRequest();
      })
      .catch((err) => {
        showFaliureToast(err.message);
        AppUtilities.isSessionTimedOut(err, navigate, dispatch);
      });
  };

  const handleGetNotificationsRequest = () => {
    dispatch(
      getNotificationsRequest({
        user_id: get(user, "company_user_id", ""),
        token,
      })
    )
      .then(unwrapResult)
      .then((res) => {
        AppLogger("Response at getNotificationsRequest", res);
      })
      .catch((err) => {
        AppLogger("Error at getNotificationsRequest", err);
      });
  };

  // Localization and Constants
  const appConstants = useLocalizedConstants();

  // Custom Hooks
  useLocalizedPageTitle(appConstants.pageTitles.uploadDocument);

  const handleAddDocument = () => {
    handleAddDocumentRequest();
  };
  const isDisabled = () => {
    const { file } = requestBody;
    return !file;
  };
  const handleCancel = () => {
    navigationRequired ? setShowModal(false) : navigate(-1);
  };

  const handleChange = (value) => {
    setRequestBody({ ...requestBody, type: value });
  };

  useEffect(() => {
    setRequestBody({
      ...requestBody,
      type: documnetDefaultValue,
    });
  }, []);

  const handleSelectedFile = (file) => {
    setRequestBody({
      ...requestBody,
      file: file,
    });
  };

  const getDropdownItems = () => {
    if (AppUtilities.isAdmin(user)) {
      return [
        {
          value: "p45",
          label: "P45",
        },
        {
          value: "p60",
          label: "P60",
        },
        {
          value: "p11d",
          label: "P11D",
        },
        {
          value: "other",
          label: "Other",
        },
      ];
    } else {
      return [
        {
          value: "other",
          label: "Other",
        },
      ];
    }
  };

  return (
    <div>
      <Modal
        closeIcon
        centered={true}
        destroyOnClose={true}
        open={true}
        onOk={() => {
          setShowModal(false);
        }}
        onCancel={handleCancel}
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
      >
        <h2 className="heading-add-update">
          {appConstants.buttons.addDocument}
        </h2>
        <label>{appConstants.titles.docType}</label>
        <Select
          defaultValue={documnetDefaultValue}
          className="p-0 w-100 border w-auto mw-100 inputField d-flex align-items-center h-auto"
          style={{
            width: 120,
          }}
          onChange={handleChange}
          options={getDropdownItems()}
        />
        <div className="mt-4 ">
          <FormFieldUploadFile
            title={appConstants.document}
            maxFilenameLength={30} // characters
            maxFileSize={AppConstants.maxBulkFileSize} // bytes
            validFileTypeList={[
              MIMETYPES.jpeg,
              MIMETYPES.png,
              MIMETYPES.pdf,
              MIMETYPES.epub,
              MIMETYPES.doc,
              MIMETYPES.docx,
            ]}
            typesRequired={true}
            setSelectedFile={handleSelectedFile}
            resetFileInputField={resetFileInputField}
          />
        </div>
        <div className="justify-content-start">
          <Button
            style={{
              backgroundColor: "var(--primary-btn-color)",
              color: "#fff",
            }}
            onClick={handleAddDocument}
            className="fs-5 border-0"
            disabled={isDisabled()}
          >
            {appConstants.buttons.save}
          </Button>
          <Button
            style={{
              backgroundColor: "#D3D3D9",
              color: "var(--primary-btn-color)",
            }}
            className="ml-1 fs-5 border-0"
            onClick={handleCancel}
          >
            {appConstants.buttons.cancel}
          </Button>
        </div>
      </Modal>
    </div>
  );
}

UploadDocumentModal.propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
};

export default UploadDocumentModal;
