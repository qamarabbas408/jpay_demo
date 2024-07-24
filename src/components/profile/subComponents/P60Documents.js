import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { get } from "lodash";
import { useSearchParams } from "react-router-dom";
import { p60DocumentsListRequest } from "../../../redux/reducers/ProfileReducer";
import useLocalizedConstants from "../../../hooks/useLocalizedConstants";
import useLocalizedPageTitle from "../../../hooks/useLocalizedPageTitle";
import AppLogger from "../../../helpers/AppLogger";
import DocumentsView from "./DocumentsView";
import UploadDocumentModal from "../../uploadDocument/UploadDocumentModal";

function P60Documents() {
  // Dispatchers
  const dispatch = useDispatch();
  const [params] = useSearchParams();

  // Localization and Constants
  const appConstants = useLocalizedConstants();

  // Reducer States

  const { p60Documents, profileUser } = useSelector(
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
    handleP60DocumentsListRequest();
  }, [userId]);

  const getSelectedUserId = () => {
    return userId ?? get(profileUser, "company_user_id", "");
  };

  const handleP60DocumentsListRequest = () => {
    dispatch(p60DocumentsListRequest({ token, userId: getSelectedUserId() }))
      .then(unwrapResult)
      .then((res) => {
        AppLogger("Response at p60DocumentsListRequest", res);
      })
      .catch((err) => {
        AppLogger("Error at p60DocumentsListRequest", err);
      });
  };

  const handleUpload = () => {
    setShowAddDocumentModal(!showAddDocumentModal);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <DocumentsView
        docTitle={"P60"}
        handleUpload={() => handleUpload()}
        tableData={get(p60Documents, "documents", [])}
        currentPage={currentPage}
        setCurrentPage={handlePageChange}
        docType="p60"
        updateDocumentList={() => handleP60DocumentsListRequest()}
      />
      {showAddDocumentModal && (
        <UploadDocumentModal
          showModal={showAddDocumentModal}
          setShowModal={setShowAddDocumentModal}
          documnetDefaultValue="p60"
          navigationRequired={true}
        />
      )}
    </>
  );
}

export default P60Documents;
