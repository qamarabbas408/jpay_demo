import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { get } from "lodash";
import { useSearchParams } from "react-router-dom";
import { p45DocumentsListRequest } from "../../../redux/reducers/ProfileReducer";
import useLocalizedConstants from "../../../hooks/useLocalizedConstants";
import useLocalizedPageTitle from "../../../hooks/useLocalizedPageTitle";
import AppLogger from "../../../helpers/AppLogger";
import DocumentsView from "./DocumentsView";
import UploadDocumentModal from "../../uploadDocument/UploadDocumentModal";

function P45Documents() {
  // Dispatchers
  const dispatch = useDispatch();
  const [params] = useSearchParams();

  // Localization and Constants
  const appConstants = useLocalizedConstants();

  // Reducer States

  const { p45Documents, profileUser } = useSelector(
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
    handleP45DocumentsListRequest();
  }, [userId]);

  const getSelectedUserId = () => {
    return userId ?? get(profileUser, "company_user_id", "");
  };

  const handleP45DocumentsListRequest = () => {
    dispatch(p45DocumentsListRequest({ token, userId: getSelectedUserId() }))
      .then(unwrapResult)
      .then((res) => {
        AppLogger("Response at p45DocumentsListRequest", res);
      })
      .catch((err) => {
        AppLogger("Error at p45DocumentsListRequest", err);
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
        docTitle={"P45"}
        handleUpload={() => handleUpload()}
        tableData={get(p45Documents, "documents", [])}
        currentPage={currentPage}
        setCurrentPage={handlePageChange}
        docType="p45"
        updateDocumentList={() => handleP45DocumentsListRequest()}
      />
      {showAddDocumentModal && (
        <UploadDocumentModal
          showModal={showAddDocumentModal}
          setShowModal={setShowAddDocumentModal}
          documnetDefaultValue="p45"
          navigationRequired={true}
        />
      )}
    </>
  );
}

export default P45Documents;
