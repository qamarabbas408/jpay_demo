import { Modal } from "react-bootstrap";
import useLocalizedConstants from "../../../hooks/useLocalizedConstants";
import AppImages from "../../../helpers/AppImages";
import AppConstants from "../../../helpers/AppConstants";

export default function DeleteModel({
  title = "",
  archive,
  showdeleteModel,
  setShowDeleteModel,
  handleDelete,
  multi = false,
  employeeType = AppConstants.employeeTypes.all,
}) {
  const appConstants = useLocalizedConstants();

  return (
    <Modal
      className="fade"
      show={showdeleteModel}
      onHide={() => setShowDeleteModel(false)}
      centered={true}
    >
      <Modal.Body className="px-5">
        <div className="d-flex gap-4 ">
          <div className="mt-2">
            <img
              className="delete-icon"
              src={
                employeeType == AppConstants.employeeTypes.all
                  ? AppImages.delete
                  : AppImages.restore
              }
            />
          </div>

          <div className="line-h-2">
            <div className="d-emp-text">{title}</div>
            <div className="f-16">{appConstants.deleteEmpMsg}</div>
            <div className="d-undo-text"></div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Body className="px-5">
        <div className="d-flex justify-content-end">
          <button
            className="mx-3 cancel-btn"
            onClick={() => setShowDeleteModel(false)}
          >
            {appConstants.buttons.cancel}
          </button>
          <button
            onClick={handleDelete}
            variant={"danger"}
            className={`delete-btn ${multi && !archive ? "restore-btn" : ""}`}
          >
            {multi
              ? archive
                ? "Delete"
                : "Restore"
              : appConstants.buttons.delete}
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
