import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { get } from "lodash";
import { useSearchParams } from "react-router-dom";
import { p11dDocumentsListRequest } from "../../../redux/reducers/ProfileReducer";
import useLocalizedConstants from "../../../hooks/useLocalizedConstants";
import useLocalizedPageTitle from "../../../hooks/useLocalizedPageTitle";
import AppLogger from "../../../helpers/AppLogger";
import DocumentsView from "./DocumentsView";
import UploadDocumentModal from "../../uploadDocument/UploadDocumentModal";

function P11DDocuments() {
  // Dispatchers
  const dispatch = useDispatch();
  const [params] = useSearchParams();

  // Localization and Constants
  const appConstants = useLocalizedConstants();

  // Reducer States

  const { p11dDocuments, profileUser } = useSelector(
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
    handleP11dDocumentsListRequest();
  }, [userId]);

  const getSelectedUserId = () => {
    return userId ?? get(profileUser, "company_user_id", "");
  };

  const handleP11dDocumentsListRequest = () => {
    dispatch(p11dDocumentsListRequest({ token, userId: getSelectedUserId() }))
      .then(unwrapResult)
      .then((res) => {
        AppLogger("Response at p11dDocumentsListRequest", res);
      })
      .catch((err) => {
        AppLogger("Error at p11dDocumentsListRequest", err);
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
        docTitle={"P11D"}
        handleUpload={() => handleUpload()}
        tableData={get(p11dDocuments, "documents", [])}
        currentPage={currentPage}
        setCurrentPage={handlePageChange}
        docType="p11d"
        updateDocumentList={() => handleP11dDocumentsListRequest()}
      />
      {showAddDocumentModal && (
        <UploadDocumentModal
          showModal={showAddDocumentModal}
          setShowModal={setShowAddDocumentModal}
          documnetDefaultValue="p11d"
          navigationRequired={true}
        />
      )}
    </>
  );
}

export default P11DDocuments;
