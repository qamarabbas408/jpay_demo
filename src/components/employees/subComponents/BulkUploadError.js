import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Accordion } from "react-bootstrap";
import _, { get } from "lodash";
import PayslipCSVErrorListComp from "./PayslipCSVErrorListComp";

function BulkUploadError({
  uploadError = null,
  show = false,
  onHide,
  setShowExport,
}) {
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
        <Accordion defaultActiveKey="1">
          {/* Error handling When uploadError has files array*/}
          <Accordion.Item
            eventKey="1"
            hidden={
              uploadError == null || get(uploadError, "files", []).length == 0
                ? true
                : false
            }
          >
            <Accordion.Header className="text-dnager fs-5 fw-bold">
              Errors Summary
            </Accordion.Header>
            <Accordion.Body>
              {uploadError != null &&
                get(uploadError, "files", []).length > 0 && (
                  <p className="py-0 mb-1 fs-5 text-danger">
                    &#9737; {uploadError.files}
                  </p>
                )}
            </Accordion.Body>
          </Accordion.Item>

          {/* Error handling When uploadError has tags array inside */}
          <Accordion.Item
            eventKey="1"
            hidden={
              uploadError == null || get(uploadError, "tags", []).length == 0
                ? true
                : false
            }
          >
            <Accordion.Header className="text-dnager fs-5 fw-bold">
              Errors Summary
            </Accordion.Header>
            <Accordion.Body>
              {uploadError != null &&
                get(uploadError, "tags", []).length > 0 && (
                  <p className="py-0 mb-1 fs-5 text-danger">
                    &#9737; {uploadError.tags}
                  </p>
                )}
            </Accordion.Body>
          </Accordion.Item>

          {/* Error handling When uploadError has error Array inside */}
          <Accordion.Item
            eventKey="1"
            hidden={
              uploadError == null || get(uploadError, "error", []).length == 0
                ? true
                : false
            }
          >
            <Accordion.Header className="text-dnager fs-5 fw-bold">
              Errors Summary
            </Accordion.Header>
            <Accordion.Body>
              {uploadError != null &&
                get(uploadError, "error", []).length > 0 && (
                  <p className="py-0 mb-1 fs-5 text-danger">
                    &#9737; {uploadError.error}
                  </p>
                )}
            </Accordion.Body>
          </Accordion.Item>

          {/* Error handling  when uploadError itself is  Array  */}
          <Accordion.Item
            eventKey="1"
            hidden={
              uploadError == null || !Array.isArray(uploadError) ? true : false
            }
          >
            <Accordion.Header className="text-dnager fs-5 fw-bold">
              Errors Summary
            </Accordion.Header>
            <Accordion.Body>
              <PayslipCSVErrorListComp uploadError={uploadError} />
              {/* {uploadError != null &&
                  Array.isArray(uploadError) &&
                  uploadError.map((item, index) => (
                    <div>
                      <p className="py-0 mb-1 fs-5 " key={index}>
                        &#9737; Error in {Object.keys(item)[0]}
                        <span className="fw-bold">{item.row}</span>
                      </p>
                      <ul>
                        {item.error.map((error, index) => (
                          <li className="text-danger fs-6" key={index}>
                            &nbsp; &nbsp; {error}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))} */}
            </Accordion.Body>
          </Accordion.Item>

          {/* Handling Success whn uploadError has success Array  */}
          <Accordion.Item
            eventKey="0"
            hidden={
              uploadError == null || get(uploadError, "success", []).length == 0
                ? true
                : false
            }
          >
            <Accordion.Header className="text-success fs-5 fw-bold">
              Success Summary
            </Accordion.Header>
            <Accordion.Body>
              {uploadError != null &&
                get(uploadError, "errors", []).length > 0 &&
                uploadError.success.map((values, index) => (
                  <div>
                    {values.page && (
                      <p className="py-0 mb-1 fs-5 text-success " key={index}>
                        &#9737; User with ni number
                        <span className="fw-bold"> {values.ni_number} </span>
                        on page <span className="fw-bold"> {values.page} </span>
                        successfully added.
                      </p>
                    )}

                    {values.file_index && (
                      <p className="py-0 mb-1 fs-5 text-success " key={index}>
                        &#9737; User with ni number
                        <span className="fw-bold"> {values.ni_number} </span>
                        in file
                        <span className="fw-bold"> {values.file_name} </span>
                        successfully added.
                      </p>
                    )}
                  </div>
                  // <p className="py-0 mb-1 fs-5 text-success " key={index}>
                  //   &#9737; User with ni number <span className="fw-bold">{values.ni_number} </span> on page <span className="fw-bold">{values.page}</span> successfully added.
                  // </p>
                ))}
            </Accordion.Body>
          </Accordion.Item>

          {/* Handling Error when uploadError has errors array  */}
          <Accordion.Item
            eventKey="1"
            hidden={
              uploadError == null || get(uploadError, "errors", []).length == 0
                ? true
                : false
            }
          >
            <Accordion.Header className="text-danger fs-5 fw-bold">
              Errors Summary
            </Accordion.Header>
            <Accordion.Body>
              {uploadError != null &&
                get(uploadError, "errors", []).length > 0 &&
                uploadError.errors.map((values, index) => (
                  // Object.keys(values).length == 4 ? (<>
                  //   <div>
                  //     <p className="py-0 my-0 fs-5" key={index}>
                  //       &#9737;File Insertion Failed :  <span className="fw-bold"> {values.file_name}</span>
                  //     </p>
                  //     <ul>
                  //       {/* <li className="text-danger fs-6">&nbsp;NI Number :{values.ni_number}</li> */}
                  //       {values.error.map((error, index) => (
                  //         <li className="text-danger fs-6" key={index}>
                  //           &nbsp;Error: {error}
                  //         </li>
                  //       ))}
                  //     </ul>
                  //   </div>

                  // </>) : (

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
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Modal.Body>
      <Modal.Footer>
        <Button className="fs-5 border-0" onClick={() => setShowExport(true)}>
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

export default BulkUploadError;
