import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { get } from "lodash";
import { useSearchParams } from "react-router-dom";
import { otherDocumentsListRequest } from "../../../redux/reducers/ProfileReducer";
import useLocalizedConstants from "../../../hooks/useLocalizedConstants";
import useLocalizedPageTitle from "../../../hooks/useLocalizedPageTitle";
import AppLogger from "../../../helpers/AppLogger";
import DocumentsView from "./DocumentsView";
import UploadDocumentModal from "../../uploadDocument/UploadDocumentModal";

function OthersDocuments() {
  // Dispatchers
  const dispatch = useDispatch();
  const [params] = useSearchParams();

  // Localization and Constants
  const appConstants = useLocalizedConstants();

  // Reducer States

  const { otherDocuments, profileUser } = useSelector(
    (state) => state.ProfileReducer
  );
  const { token } = useSelector((state) => state.AuthenticationReducer);

  // Constants
  const userId = params.get("user_id");

  // Custom Hooks
  useLocalizedPageTitle(appConstants.pageTitles.profile);

  // Local States
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddDocumentModal, setShowAddDocumentModal] = useState(false);

  useEffect(() => {
    handleOtherDocumentsListRequest();
  }, [userId]);

  const getSelectedUserId = () => {
    return userId ?? get(profileUser, "company_user_id", "");
  };

  const handleOtherDocumentsListRequest = () => {
    dispatch(otherDocumentsListRequest({ token, userId: getSelectedUserId() }))
      .then(unwrapResult)
      .then((res) => {
        AppLogger("Response at otherDocumentsListRequest", res);
      })
      .catch((err) => {
        AppLogger("Error at otherDocumentsListRequest", err);
      });
  };

  const handleUpload = () => {
    setShowAddDocumentModal((value) => !value);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <DocumentsView
        docTitle={"Other"}
        handleUpload={() => handleUpload()}
        tableData={get(otherDocuments, "documents", [])}
        currentPage={currentPage}
        setCurrentPage={handlePageChange}
        docType="other"
        updateDocumentList={() => handleOtherDocumentsListRequest()}
      />

      {showAddDocumentModal && (
        <UploadDocumentModal
          showModal={showAddDocumentModal}
          setShowModal={setShowAddDocumentModal}
          documnetDefaultValue="other"
          navigationRequired={true}
        />
      )}
    </>
  );
}

export default OthersDocuments;
