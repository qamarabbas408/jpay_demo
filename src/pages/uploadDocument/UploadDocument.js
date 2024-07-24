import React, { useState } from "react";
import { useSelector } from "react-redux";
import AppUtilities from "../../helpers/AppUtilities";

// components
import UploadDocumentModal from "../../components/uploadDocument/UploadDocumentModal";

function UploadDocument() {
  // Local States
  const [showModal, setShowModal] = useState(true);

  // Reducer States
  const { user } = useSelector((state) => state.AuthenticationReducer);

  return (
    <>
      {/* TODO: add content here to display on the "Upload Documents page" */}

      <UploadDocumentModal
        showModal={showModal}
        setShowModal={setShowModal}
        documnetDefaultValue={AppUtilities.isAdmin(user) ? "p45" : "other"}
      />
    </>
  );
}

export default UploadDocument;
