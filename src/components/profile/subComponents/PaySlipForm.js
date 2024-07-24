import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { get } from "lodash";
import { useSearchParams } from "react-router-dom";
import { payslipsListRequest } from "../../../redux/reducers/ProfileReducer";
import useLocalizedConstants from "../../../hooks/useLocalizedConstants";
import useLocalizedPageTitle from "../../../hooks/useLocalizedPageTitle";
import AppLogger from "../../../helpers/AppLogger";
import DocumentsView from "./DocumentsView";
import BulkUploadModal from "../../employees/subComponents/BulkUploadModal";
import BulkUploadError from "../../employees/subComponents/BulkUploadError";
function PaySlipForm({}) {
  // Dispatchers
  const dispatch = useDispatch();
  const [params] = useSearchParams();

  // Localization and Constants
  const appConstants = useLocalizedConstants();
  // Reducer States

  const { payslipsList, profileUser } = useSelector(
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
  const [uploadError, setUploadError] = useState(null);

  useEffect(() => {
    handlePayslipsListRequest();
  }, [userId]);

  const getSelectedUserId = () => {
    return userId ?? get(profileUser, "company_user_id", "");
  };

  const handlePayslipsListRequest = () => {
    dispatch(payslipsListRequest({ token, userId: getSelectedUserId() }))
      .then(unwrapResult)
      .then((res) => {
        AppLogger("Response at payslipsListRequest", res);
      })
      .catch((err) => {
        AppLogger("Error at payslipsListRequest", err);
      });
  };

  const handleUpload = () => {
    setShowAddDocumentModal((value) => !value);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const handleModalClose = () => {
    setUploadError(null);
    setShowAddDocumentModal(true);
  };

  // useEffect(() => {
  //   AppLogger("Upload Error in Profile === ", uploadError);
  // }, [uploadError]);

  return (
    <>
      <DocumentsView
        docTitle={"Payslip"}
        handleUpload={handleUpload}
        tableData={get(payslipsList, "pay_slips", [])}
        currentPage={currentPage}
        setCurrentPage={handlePageChange}
        countSectionRequired={true}
        nextPayslip={get(payslipsList, "next_pay_slip", "N/A")}
        docType="payslip"
      />
      {showAddDocumentModal && !uploadError && (
        <BulkUploadModal
          showModal={showAddDocumentModal}
          setShowModal={setShowAddDocumentModal}
          uploadError={uploadError}
          setUploadError={setUploadError}
          navigationRequired={true}
        />
      )}
      {uploadError && (
        <BulkUploadError uploadError={uploadError} onHide={handleModalClose} />
      )}
    </>
  );
}

PaySlipForm.propTypes = {};

export default PaySlipForm;
