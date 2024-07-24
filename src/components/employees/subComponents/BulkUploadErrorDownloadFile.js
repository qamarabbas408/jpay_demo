import { useEffect, useRef } from "react";
import { showFaliureToast } from "../../../helpers/AppToasts";
import { useReactToPrint } from "react-to-print";
import { useSelector } from "react-redux";
import _, { get } from "lodash";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AppLogger from "../../../helpers/AppLogger";
import PayslipCSVErrorListComp from "./PayslipCSVErrorListComp";
import AppImages from "../../../helpers/AppImages";
import moment from "moment";
import AppConstants from "../../../helpers/AppConstants";
import useLocalizedConstants from "../../../hooks/useLocalizedConstants";

function BulkUploadErrorDownloadFile({
  uploadError = null,
  show = false,
  onHide,
  showModal,
  setShowModal,
}) {
  const { whiteLabelling } = useSelector((state) => state.WhiteLabelingReducer);
  const { analytics } = useSelector((state) => state.ReportsReducer);
  const componentRef = useRef();
  const appConstants = useLocalizedConstants();
  const companyLogo = get(whiteLabelling, "company.company_logo_url", "");

  const handleExport = useReactToPrint({
    content: () => componentRef.current,
    copyStyles: true,
    onAfterPrint: () => setShowModal(false),
    onPrintError: (error) =>
      showFaliureToast(
        get(error, "message", "Could not complete te operation")
      ),
  });

  useEffect(() => {
    if (showModal) {
      setTimeout(() => {
        handleExport();
      }, 1000);
    }
  }, [showModal]);

  return (
    <Modal
      show={true}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {/* <span className="p-0 m-0 fs-3">Errors Summary</span> */}
      <Modal.Header closeButton>
        <Modal.Title className="fs-3">Users Upload Summary</Modal.Title>
      </Modal.Header>
      <Modal.Body className="error-modal-body">
        <div ref={componentRef} className="p-5">
          <div className="">
            <img
              className="reports-logo"
              src={companyLogo ? companyLogo : AppImages.logo}
            />
            {/* showing errors start */}
            <div>
              {/* Error handling When uploadError has files array*/}
              <div
                hidden={
                  uploadError == null ||
                  get(uploadError, "files", []).length == 0
                    ? true
                    : false
                }
              >
                <p className="text-dnager fs-5 fw-bold">Errors Summary</p>
                <div>
                  {uploadError != null &&
                    get(uploadError, "files", []).length > 0 && (
                      <p className="py-0 mb-1 fs-5 text-danger">
                        &#9737; {uploadError.files}
                      </p>
                    )}
                </div>
              </div>

              {/* Error handling When uploadError has tags array inside */}
              <div
                hidden={
                  uploadError == null ||
                  get(uploadError, "tags", []).length == 0
                    ? true
                    : false
                }
              >
                <p className="text-dnager fs-5 fw-bold">Errors Summary</p>
                <div>
                  {uploadError != null &&
                    get(uploadError, "tags", []).length > 0 && (
                      <p className="py-0 mb-1 fs-5 text-danger">
                        &#9737; {uploadError.tags}
                      </p>
                    )}
                </div>
              </div>

              {/* Error handling When uploadError has error Array inside */}
              <div
                hidden={
                  uploadError == null ||
                  get(uploadError, "error", []).length == 0
                    ? true
                    : false
                }
              >
                <p className="text-dnager fs-5 fw-bold">Errors Summary</p>
                <div>
                  {uploadError != null &&
                    get(uploadError, "error", []).length > 0 && (
                      <p className="py-0 mb-1 fs-5 text-danger">
                        &#9737; {uploadError.error}
                      </p>
                    )}
                </div>
              </div>

              {/* Error handling  when uploadError itself is  Array  */}
              <div
                hidden={
                  uploadError == null || !Array.isArray(uploadError)
                    ? true
                    : false
                }
              >
                <p className="text-dnager fs-5 fw-bold">Errors Summary</p>
                <div>
                  <PayslipCSVErrorListComp uploadError={uploadError} />
                </div>
              </div>

              {/* Handling Success whn uploadError has success Array  */}
              <div
                hidden={
                  uploadError == null ||
                  get(uploadError, "success", []).length == 0
                    ? true
                    : false
                }
              >
                <p className="text-success fs-5 fw-bold">Success Summary</p>
                <div>
                  {uploadError != null &&
                    get(uploadError, "errors", []).length > 0 &&
                    uploadError.success.map((values, index) => (
                      <div>
                        {values.page && (
                          <p
                            className="py-0 mb-1 fs-5 text-success "
                            key={index}
                          >
                            &#9737; User with ni number
                            <span className="fw-bold">
                              {" "}
                              {values.ni_number}{" "}
                            </span>
                            on page
                            <span className="fw-bold"> {values.page} </span>
                            successfully added.
                          </p>
                        )}

                        {values.file_index && (
                          <p
                            className="py-0 mb-1 fs-5 text-success "
                            key={index}
                          >
                            &#9737; User with ni number
                            <span className="fw-bold">
                              {" "}
                              {values.ni_number}{" "}
                            </span>
                            in file
                            <span className="fw-bold">
                              {" "}
                              {values.file_name}{" "}
                            </span>
                            successfully added.
                          </p>
                        )}
                      </div>
                    ))}
                </div>
              </div>

              {/* Handling Error when uploadError has errors array  */}
              <div
                hidden={
                  uploadError == null ||
                  get(uploadError, "errors", []).length == 0
                    ? true
                    : false
                }
              >
                <p className="text-danger fs-5 fw-bold">Errors Summary</p>
                <div>
                  {uploadError != null &&
                    get(uploadError, "errors", []).length > 0 &&
                    uploadError.errors.map((values, index) => (
                      <div>
                        {values.page && (
                          <p className="py-0 my-0 fs-5" key={index}>
                            &#9737; Error in Page
                            <span className="fw-bold"> {values.page}</span>
                          </p>
                        )}

                        {values.file_index && (
                          <p className="py-0 my-0 fs-5" key={index}>
                            &#9737; Error in File
                            <span className="fw-bold"> {values.file_name}</span>
                          </p>
                        )}

                        <ul>
                          {values.error.map((error, index) => (
                            <li className="text-danger fs-6" key={index}>
                              &nbsp; &nbsp; {error}
                            </li>
                          ))}
                        </ul>
                      </div>
                      // )
                    ))}
                </div>
              </div>
            </div>
            {/* showing errors end */}
            <div className="mt-3">
              <div>
                <h4 className="heading mb-0 font-w700 ">
                  {appConstants.titles.dateGenerated}{" "}
                </h4>
                <p className="text-black-50 fw-bold fs-14 text-start">
                  {moment().format(AppConstants.dateTimeFormat)}
                </p>
              </div>
              <div>
                <h4 className="heading mb-0 font-w700 ">
                  {appConstants.titles.Period}{" "}
                </h4>
                <p className="text-black-50 fw-bold fs-14 text-start">
                  {`${moment(get(analytics, "start_date", "")).format(
                    AppConstants.dateTimeFormat
                  )} - ${moment(get(analytics, "end_date", "")).format(
                    AppConstants.dateTimeFormat
                  )}`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className="fs-5 border-0" onClick={() => handleExport()}>
          Export
        </Button>
        <Button
          onClick={onHide}
          className="fs-5 border-0"
          style={{
            backgroundColor: "#D3D3D9",
            color: "var(--primary-btn-color)",
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default BulkUploadErrorDownloadFile;
