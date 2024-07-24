import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useLocalizedConstants from "../../hooks/useLocalizedConstants";
import useLocalizedPageTitle from "../../hooks/useLocalizedPageTitle";
import BulkUploadModal from "../../components/employees/subComponents/BulkUploadModal";
import AppUtilities from "../../helpers/AppUtilities";
import AdminNotFound from "../pageNotFound/AdminNotFound";
import BulkUploadError from "../../components/employees/subComponents/BulkUploadError";
import BulkUploadErrorDownloadFile from "../../components/employees/subComponents/BulkUploadErrorDownloadFile";

function EmployeesBulkUpload() {
  // Localization and Constants
  const appConstants = useLocalizedConstants();
  const [uploadError, setUploadError] = useState(null);

  // Custom Hooks
  useLocalizedPageTitle(appConstants.pageTitles.bulkUpload);

  // Reducer States
  const { user } = useSelector((state) => state.AuthenticationReducer);

  const handleModalClose = () => {
    setShowModal(true);
    setUploadError(null);
  };
  // Local States
  const [showModal, setShowModal] = useState(true);
  const [showExport, setShowExport] = useState(false);

  if (AppUtilities.isAdmin(user)) {
    return (
      <div>
        {showModal && !uploadError ? (
          <BulkUploadModal
            showModal={showModal}
            setShowModal={setShowModal}
            uploadError={uploadError}
            setUploadError={setUploadError}
          />
        ) : !showExport ? (
          <BulkUploadError
            uploadError={uploadError}
            onHide={handleModalClose}
            setShowExport={setShowExport}
          />
        ) : (
          <BulkUploadErrorDownloadFile
            uploadError={uploadError}
            showModal={true}
            setShowModal={() => {
              setShowExport(false);
              // handleModalClose();
            }}
          />
        )}
      </div>
    );
  } else {
    return <AdminNotFound />;
  }
}
export default EmployeesBulkUpload;
