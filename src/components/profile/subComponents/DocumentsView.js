import React, { useEffect, useState } from "react";
import { SecondaryButton } from "../../AppButtons";
import { Pagination, Modal, App } from "antd";
import { Button, Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { get } from "lodash";
import {
  deleteMultipleDocumentsRequest,
  documentDeleteRequest,
  downloadPayslipsRequest,
  payslipsListRequest,
} from "../../../redux/reducers/ProfileReducer";
import {
  showFaliureToast,
  showInfoToast,
  showSuccessToast,
} from "../../../helpers/AppToasts";
import { Tooltip } from "react-tooltip";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router";
import useLocalizedConstants from "../../../hooks/useLocalizedConstants";
import useLocalizedToast from "../../../hooks/useLocalizedToast";
import AppUtilities from "../../../helpers/AppUtilities";
import DateRangePicker from "react-bootstrap-daterangepicker";
import AppLogger from "../../../helpers/AppLogger";
import AppConstants from "../../../helpers/AppConstants";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import "./style.css";
import DeleteModel from "../../employees/subComponents/DeleteModel";

function DocumentsView({
  handleUpload = () => {},
  docTitle = "",
  tableData = [],
  currentPage = 1,
  setCurrentPage = () => {},
  countSectionRequired = false,
  docType = "",
  nextPayslip = "",
  updateDocumentList = () => {},
}) {
  // Dispatchers
  const dispatch = useDispatch();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  // Localization and Constants
  const userId = params.get("user_id");
  const appConstants = useLocalizedConstants();
  const localizedToastMsg = useLocalizedToast();
  // Reducer States
  const { profileUser } = useSelector((state) => state.ProfileReducer);
  const { token, user } = useSelector((state) => state.AuthenticationReducer);
  // Local States

  const [recordsPage, setRecordsPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [dateRange, setDateRange] = useState({
    start_date: moment().format(AppConstants.apiDateFormat),
    end_date: moment().format(AppConstants.apiDateFormat),
  });
  const [modal2Open, setModal2Open] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState({
    itemID: 0,
    itemType: "",
  });
  const [selectedDocs, setSelectedDocs] = useState([]);
  const [showMultiDelete, setShowMultiDelete] = useState(false);

  // Constants

  const lastIndex = currentPage * recordsPage;
  const firstIndex = lastIndex - recordsPage;
  const records = tableData.slice(firstIndex, lastIndex);

  const PayslipCell = ({ value = "", title = "" }) => {
    return (
      <div className="m-4 fit-content">
        <h4 className="mr-2 text-center">{value}</h4>
        <div className="mr-2 text-center">{title}</div>
      </div>
    );
  };

  const handleDateEvent = (_, picker) => {
    const { startDate, endDate } = picker;
    setDateRange({
      start_date: moment(startDate).format(AppConstants.apiDateFormat),
      end_date: moment(endDate).format(AppConstants.apiDateFormat),
    });
  };

  const handleFilterDate = (_, picker) => {
    const { startDate, endDate } = picker;
    const body = {
      start_date: moment(startDate).format(AppConstants.apiDateFormat),
      end_date: moment(endDate).format(AppConstants.apiDateFormat),
    };

    handleGetPayslipApi(body);
  };

  const handleGetPayslipApi = (body = {}) => {
    dispatch(
      payslipsListRequest({
        token,
        userId: userId ?? get(profileUser, "company_user_id", ""),
        body,
      })
    )
      .then(unwrapResult)
      .then((res) => {
        AppLogger("Response at payslipsListRequest filter ", res);
      })
      .catch((err) => {
        AppLogger("Error at payslipsListRequest filter ", err);
      });
  };

  const dispatchDeleteDocumentReq = () => {
    const item = {
      itemID: documentToDelete.itemID,
      itemType: documentToDelete.itemType ?? null,
    };
    dispatch(documentDeleteRequest({ item, token }))
      .then(unwrapResult)
      .then((res) => {
        showSuccessToast(res.message);
        AppLogger("Response at documentDeleteRequest filter ", res);
        setModal2Open(false);
        handleGetPayslipApi({});
        setSelectedDocs([]);
      })
      .catch((err) => {
        showFaliureToast(err.message);
        AppLogger("Error at documentDeleteRequest filter ", err);
        setModal2Open(false);
      });
  };

  const handleDownload = () => {
    if (!dateRange.start_date || !dateRange.end_date) {
      showFaliureToast(localizedToastMsg.reselectDateRange);
      return;
    }
    const start_date = moment(dateRange.start_date).format(
      AppConstants.apiDateFormat
    );
    const end_date = moment(dateRange.end_date).format(
      AppConstants.apiDateFormat
    );
    const user_id = get(user, "company_user_id", "");

    dispatch(downloadPayslipsRequest({ token, user_id, start_date, end_date }))
      .then(unwrapResult)
      .then((res) => {
        showSuccessToast(res.message);
        AppLogger("Response at downloadPayslipsRequest", res);
        window.open(res.data, "_blank");
      })
      .catch((err) => {
        AppLogger("Error at downloadPayslipsRequest", err);
        showFaliureToast(err.message);
      });
  };

  const isFeatureRequired = () => {
    return docType == "payslip";
  };

  const handleDocCheckboxChange = (checkboxValue, id) => {
    var selectArray = [...selectedDocs];

    if (checkboxValue) {
      if (!selectArray.find((item) => item == id)) {
        selectArray.push(id);
      }
    } else {
      selectArray = [...selectArray.filter((item) => item != id)];
    }
    AppLogger("Selected Array ", selectArray);
    setSelectedDocs(selectArray);
  };

  const handleMultipleDocsDelete = () => {
    dispatch(
      deleteMultipleDocumentsRequest({
        token,
        type: docType,
        docsArray: selectedDocs,
        company_user_id: get(profileUser, "company_user_id", ""),
      })
    )
      .then(unwrapResult)
      .then((res) => {
        showSuccessToast(get(res, "message", ""));
        AppLogger("Response at deleteMultipleDocumentsRequest", res);
        setShowMultiDelete(false);
        setSelectedDocs([]);
        if (docType == AppConstants.documentTypes.payslip) {
          handleGetPayslipApi({});
        } else {
          updateDocumentList();
        }
      })
      .catch((err) => {
        AppLogger("Error at deleteMultipleDocumentsRequest", err);
        showFaliureToast(get(err, "message", ""));
        AppUtilities.isSessionTimedOut(err, navigate, dispatch);
      });
  };

  // useEffect(() => {
  //   // console.log("selected docs === ", selectedDocs);
  // }, [selectedDocs]);

  return (
    <div>
      <div className="profile-form-header mb-3">
        <h4>{docTitle}</h4>
        {isFeatureRequired() && (
          <SecondaryButton
            title={appConstants.download}
            onClick={() => setShowModal(true)}
            addCss="py-1 px-3"
          />
        )}
        {(AppUtilities.isAdmin(user) || docType == "other") && (
          <SecondaryButton
            title={appConstants.upload}
            onClick={handleUpload}
            addCss="py-1 px-3"
          />
        )}
      </div>
      {/* {isFeatureRequired() && (
        <div className="profile-form-header justify-content-end my-3 mt-0">
          <DateRangePicker
            initialSettings={{
              start: moment(),
              end: moment(),
              locale: { format: AppConstants.dateFormat },
            }}
            onApply={handleDateEvent}
          >
            <input
              type="text"
              placeholder="Select Date"
              className="btn fs-16 text-black btn-outline-light seconday-btn-cont seconday-btn-text"
            />
          </DateRangePicker>
        </div>
      )} */}
      {isFeatureRequired() && (
        <div className="d-flex justify-content-end align-items-center">
          {!showFilter && (
            <SecondaryButton
              title={appConstants.filterPayslips}
              onClick={() => setShowFilter(true)}
              addCss="py-1 px-3"
            />
          )}
          {showFilter && (
            <>
              <span
                onClick={() => {
                  handleGetPayslipApi({});
                  setShowFilter(false);
                }}
                className="clear-btn pointer bg-dark  rounded px-2"
              >
                {appConstants.buttons.clear}
              </span>
              <div className="date-container">
                <Tooltip anchorSelect=".date-container" place="left">
                  {appConstants.filterPayslips}
                </Tooltip>
                <DateRangePicker
                  initialSettings={{
                    start: moment(),
                    end: moment(),
                    locale: { format: AppConstants.dateFormat },
                    showDropdowns: true,
                  }}
                  onApply={handleFilterDate}
                >
                  <input
                    type="text"
                    placeholder="Select Date"
                    className="btn fs-16 text-black btn-outline-light seconday-btn-cont seconday-btn-text download-range"
                  />
                </DateRangePicker>
              </div>
            </>
          )}
        </div>
      )}
      <div className="profile-form-body ">
        {countSectionRequired && (
          <div className="d-flex justify-content-around border rounded-4 m-3 border-right-2 align-items-center mx-0 records">
            <PayslipCell
              value={tableData.length}
              title={appConstants.totalPayslips}
            />
            <div className="d-flex gap-4">
              <div className="border height60" />
              <div className="border height60" />
            </div>
            <PayslipCell
              value={
                nextPayslip
                  ? moment(nextPayslip).format(AppConstants.dateFormat)
                  : "N/A"
              }
              title={appConstants.nextPayslip}
            />
          </div>
        )}
        {selectedDocs.length > 0 && (
          <div className="mb-2 ">
            <button
              variant={"danger"}
              className={`delete-btn delete-btn2`}
              onClick={() => setShowMultiDelete(true)}
            >
              {appConstants.deleteSelected}
            </button>
          </div>
        )}
        <div id="payslip-tblwrapper" className="dataTables_wrapper no-footer">
          <table
            id="payslip-tbl1"
            className="display notifications-table ItemsCheckboxSec no-footer mb-0"
          >
            <thead>
              <tr>
                {/* <th className="col-3 p-2">{appConstants.file}</th> */}
                {AppUtilities.isAdmin(user) && (
                  <th className="col-1 p-2">{""}</th>
                )}
                <th className="col-4 p-2">{docTitle}</th>
                <th className="col-4 p-2">{appConstants.uploadDate}</th>
                <th
                  className={`${
                    AppUtilities.isAdmin(user) ? "col-3" : "col-4"
                  } p-2`}
                >
                  {appConstants.actions}
                </th>
              </tr>
            </thead>

            {/* Logic Implement */}
            <tbody className="tbody custom-height">
              {records.length > 0 ? (
                records.map((item, index) => (
                  <tr key={index}>
                    {AppUtilities.isAdmin(user) && (
                      <td className="col-1">
                        <input
                          key={get(item, "id", 0)}
                          style={{
                            borderColor: "color(srgb 0 0 0)",
                          }}
                          type="checkbox"
                          value={selectedDocs.filter(
                            (docs) => docs.id == item.id
                          )}
                          onChange={(e) => {
                            handleDocCheckboxChange(e.target.checked, item.id);
                          }}
                        />
                      </td>
                    )}
                    <td className="p-1 px-2 col-4">
                      <a
                        href={item.upload_url ?? item.pdf_url}
                        target="_blank"
                        className="pointer color-black"
                      >
                        {item.pay_date ? (
                          <span>
                            Payslip
                            {AppUtilities.formattedDate(
                              item.pay_date,
                              AppConstants.dateFormat3
                            )}
                          </span>
                        ) : (
                          <span>{item.name}</span>
                        )}
                      </a>
                    </td>
                    <td className="p-1 px-2 col-4">
                      <span>
                        {
                          // item.period ??
                          AppUtilities.formattedDate(item.updated_at)
                        }
                      </span>
                    </td>
                    <td className="p-1 px-2 ">
                      <Stack direction="horizontal" gap={3}>
                        <a
                          className="text-primary pointer"
                          href={
                            item.upload_url ? item.upload_url : item.pdf_url
                          }
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => {
                            if (!item.upload_url && !item.pdf_url) {
                              showInfoToast(
                                appConstants.payslipGenerationWarning
                              );
                            }
                          }}
                        >
                          {/* <i className="fa fa-eye text-black"></i>
                          &nbsp; */}
                          {appConstants.view}
                        </a>
                        {AppUtilities.isAdmin(user) && (
                          <Button
                            onClick={() => {
                              setDocumentToDelete({
                                itemID: item.id,
                                itemType: item.type ?? null,
                              });
                              setModal2Open(true);
                            }}
                            className="text-danger border-0 bg-transparent"
                          >
                            {/* <i className="fa fa-close text-danger"></i>
                          &nbsp; */}
                            <span style={{ fontSize: "13px" }}>
                              {appConstants.delete}
                            </span>
                          </Button>
                        )}
                      </Stack>
                    </td>
                  </tr>
                ))
              ) : (
                <div className="d-flex justify-content-center mt-2-5">
                  <strong>
                    {appConstants.descriptions.recordsNotFoundDesc}
                  </strong>
                </div>
              )}
            </tbody>
          </table>
          {records.length > 0 && (
            <div className="d-sm-flex text-center justify-content-between align-items-center mt-2">
              <div className="dataTables_info">
                {appConstants.start} {lastIndex - recordsPage + 1}{" "}
                {appConstants.to}{" "}
                {tableData.length < lastIndex ? tableData.length : lastIndex}{" "}
                {appConstants.of} {tableData.length} {appConstants.end}
              </div>
              <Pagination
                pageSize={recordsPage}
                total={tableData.length}
                current={currentPage}
                onChange={(page, pageSize) => {
                  setCurrentPage(page);
                  setRecordsPage(pageSize);
                }}
              />
            </div>
          )}
        </div>
      </div>
      <Modal
        centered={true}
        open={showModal}
        onOk={() => {
          setShowModal(false);
        }}
        onCancel={() => {
          setShowModal(false);
        }}
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
      >
        <div className="d-flex gap-4 ">
          <div className="line-h-2">
            <div className="d-emp-text">{appConstants.titles.downloadCSV}</div>
            <div className="f-16">
              {appConstants.descriptions.downloadCSVDesc}
            </div>
            <div className="d-flex gap-4 my-2">
              <p>
                <strong>{appConstants.startDate}: </strong>
                <span>
                  {moment(dateRange.start_date).format(
                    AppConstants.dateFormat2
                  )}
                </span>
              </p>
              <p>
                <strong>{appConstants.endDate}: </strong>
                <span>
                  {moment(dateRange.end_date).format(AppConstants.dateFormat2)}
                </span>
              </p>
            </div>
            <div className="date-container">
              <DateRangePicker
                initialSettings={{
                  start: moment(),
                  end: moment(),
                  locale: { format: AppConstants.dateFormat },
                  showDropdowns: true,
                }}
                onApply={handleDateEvent}
              >
                <input
                  type="text"
                  placeholder="Select Date"
                  className="btn fs-16 text-black btn-outline-light seconday-btn-cont seconday-btn-text download-range"
                />
              </DateRangePicker>
            </div>
          </div>
        </div>
        <div className="justify-content-start">
          <Button
            style={{
              backgroundColor: "var(--primary-btn-color)",
              color: "#fff",
            }}
            onClick={() => handleDownload(dateRange)}
            className="fs-5 border-0"
          >
            {appConstants.buttons.download}
          </Button>
          <Button
            style={{
              backgroundColor: "#D3D3D9",
              color: "var(--primary-btn-color)",
            }}
            className="ml-1 fs-5 border-0"
            onClick={() => setShowModal(false)}
          >
            {appConstants.buttons.cancel}
          </Button>
        </div>
      </Modal>

      {/* <Modal
        okType="danger"
        centered
        open={modal2Open}
        onOk={() => dispatchDeleteDocumentReq()}
        onCancel={() => setModal2Open(false)}
        okText={appConstants.delete}
      >
        <div className="d-flex gap-4 ">
          <div className="mt-2">
            <img className="delete-icon" src={deleteIcon} />
          </div>
          <div className="line-h-2">
            <div className="d-emp-text">{appConstants.titles.deleteFile}</div>
            <div className="f-16">{appConstants.deleteEmpMsg}</div>
            <div className="d-undo-text"></div>
          </div>
        </div>
      </Modal> */}
      <DeleteModel
        title={appConstants.titles.deleteFile}
        employeeType={AppConstants.employeeTypes.all}
        archive={false}
        showdeleteModel={modal2Open}
        setShowDeleteModel={(value) => {
          setModal2Open(value);
        }}
        handleDelete={() => dispatchDeleteDocumentReq()}
        multi={false}
      />
      <DeleteModel
        title={`${appConstants.titles.deleteFile}${
          selectedDocs.length > 1 ? "s" : ""
        }`}
        employeeType={AppConstants.employeeTypes.all}
        archive={false}
        showdeleteModel={showMultiDelete}
        setShowDeleteModel={(value) => {
          setShowMultiDelete(value);
        }}
        handleDelete={() => handleMultipleDocsDelete()}
        multi={false}
      />
    </div>
  );
}

export default DocumentsView;
