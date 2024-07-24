import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ButtonGroup, Stack } from "react-bootstrap";
import _, { get } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  showFaliureToast,
  showInfoToast,
  showSuccessToast,
  showWarningToast,
} from "../../../helpers/AppToasts";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  allEmployeesRequest,
  bulkUploadUserRequest,
} from "../../../redux/reducers/EmployeesReducer";
import {
  bulkUploadDocumentRequest,
  expportEmployeeSampleCsvRequest,
  payslipsListRequest,
  addP45DocumentRequest,
  addP60DocumentRequest,
} from "../../../redux/reducers/ProfileReducer";
import { getNotificationsRequest } from "../../../redux/reducers/AuthenticationReducer";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { saveAs } from "file-saver";
import PropTypes from "prop-types";
import Papa from "papaparse";
import MIMETYPES from "../../../hooks/mimetypes";
import useLocalizedConstants from "../../../hooks/useLocalizedConstants";
import FormFieldUploadFile from "../../common/FormFieldUploadFile";
import AppLogger from "../../../helpers/AppLogger";
import AppRoutes from "../../../helpers/AppRoutes";
import AppUtilities from "../../../helpers/AppUtilities";
import DuplicatedUsers from "./DuplicatedUsers";
import InvalidUsers from "./InvalidUsers";
import EmployeesErrorSummary from "../EmployeesErrorSummary";
import AppConstants from "../../../helpers/AppConstants";
import PaySlipTabButton from "./PaySlipTabButtons";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { Button, Modal, Input, Select } from "antd";
import {
  getRolesListRequest,
  getTagsListRequest,
  addTagRequest,
  updateTagRequest,
  deleteTagRequest,
} from "../../../redux/reducers/ProfileReducer";
import useLocalizedToast from "../../../hooks/useLocalizedToast";
const { Option } = Select;

function BulkUploadModal(props) {
  const { t } = useTranslation();

  // Dispatchers
  const dispatch = useDispatch();

  // Navigation
  const navigate = useNavigate();
  const [params] = useSearchParams();
  // References
  const resetFileInputField = useRef(null);

  // Props
  const { showModal, setShowModal, navigationRequired, setUploadError } = props;
  // const { uploadError,  } = props;
  // Local States
  const [bulkFile, setBulkFile] = useState(null);
  const [isPayslip, setIsPayslip] = useState(true);
  const [isEmployee, setIsEmployee] = useState(false);
  const [isDoc, setIsDoc] = useState(false);
  const [isP60, setIsP60] = useState(true);
  const [isPdf, setIsPdf] = useState(false);
  const [csvUsersList, setCsvUsersList] = useState([]);
  const [finalUsersList, setFinalUsersList] = useState([]);
  // const [invalidUsersList, setInvalidUsersList] = useState([]);
  const [duplicatedUsersList, setDuplicatedUsersList] = useState([]);
  const [employeeBulkError, setEmployeeBulkError] = useState([]);
  // const [validUsersForServer, setValidUsersForServer] = useState([]);

  // Localization and Constants
  const appConstants = useLocalizedConstants();

  // Reducer States
  const { user, token } = useSelector((state) => state.AuthenticationReducer);
  const { allEmployees } = useSelector((state) => state.EmployeesReducer);
  const [openSelectView, setOpenSelectView] = useState(false);

  // useEffect(() => {
  //   handleAllEmployeesRequest();
  // }, []);

  useEffect(() => {
    if (csvUsersList.length > 0 && isPayslip) manageCsvUsersList();
  }, [csvUsersList]);

  const handleAllEmployeesRequest = () => {
    dispatch(
      allEmployeesRequest({ companyId: get(user, "company_id", ""), token })
    )
      .then(unwrapResult)
      .then((res) => {
        AppLogger("Response at allEmployeesRequest", res);
      })
      .catch((err) => {
        AppLogger("Error at allEmployeesRequest", err);
        AppUtilities.isSessionTimedOut(err, navigate, dispatch);
      });
  };

  const changeKeyAsPerRequirement = (keyToChange = "") => {
    return keyToChange
      .replace(/[^a-zA-Z ]/g, "")
      .replace(/[ ]/g, "_")
      .replace("__", "_")
      .replace(/^_/, "")
      .toLowerCase();
  };

  function checkObjectKeys(object) {
    return AppConstants.validPaySlipCSVFields.every(
      {}.hasOwnProperty.bind(object)
    );
  }

  const manageCsvUsersList = () => {
    // Change object Keys based on server requirments
    const parsedUsersList = csvUsersList.map((userObjc) => {
      const objectEntries = Object.keys(userObjc).map((key) => {
        const newKey = changeKeyAsPerRequirement(key);
        return { [newKey]: userObjc[key] };
      });
      return Object.assign({}, ...objectEntries);
    });

    if (parsedUsersList.length > 0) {
      var finalStr = "";
      if (!checkObjectKeys(parsedUsersList[0])) {
        if (get(resetFileInputField, "current.value", "")) {
          resetFileInputField.current.value = null;
        }
        setBulkFile(null);
        AppConstants.validPaySlipCSVFields.forEach((item, index) => {
          if (!parsedUsersList[0].hasOwnProperty(item)) {
            finalStr +=
              item +
              (index + 1 != AppConstants.validPaySlipCSVFields.length
                ? ", "
                : ".");
            finalStr = finalStr.toUpperCase().replace(/_/g, " ");
          }
        });

        showInfoToast(
          appConstants.the_following_fields_are_missing_in_the_csv +
            " " +
            finalStr
        );
        return;
      }
    }

    // csv ========
    var singleValidUsersCSV = [];
    var duplicateUsersCSV = [];

    parsedUsersList.forEach((element) => {
      // AppLogger(" ======= parsedUsersList itemm  ===== ",)
      const dummyArray = parsedUsersList.filter(
        (item) => item.employee == element.employee
      );
      if (dummyArray.length == 1) {
        singleValidUsersCSV = [...singleValidUsersCSV, ...dummyArray];
      } else {
        if (
          duplicateUsersCSV.find(
            (ite) => ite.employee == dummyArray[0].employee
          ) == undefined
        ) {
          duplicateUsersCSV = [...duplicateUsersCSV, ...dummyArray];
        }
      }
    });

    //  server  ========
    var singleUsersServer = [];
    var duplicateUsersServer = [];

    allEmployees.forEach((element) => {
      const dummyArray = allEmployees.filter(
        (item) => item.full_name == element.full_name
      );
      if (dummyArray.length == 1) {
        singleUsersServer = [...singleUsersServer, ...dummyArray];
      } else {
        if (
          duplicateUsersServer.find(
            (ite) => ite.full_name == dummyArray[0].full_name
          ) == undefined
        ) {
          duplicateUsersServer = [...duplicateUsersServer, ...dummyArray];
        }
      }
    });

    // separating csv invalid users from server
    var invalidListCSV = [];
    var validListCSV = [];
    //  handle duplicate list
    var finalArrayForDuplicates = [];

    singleValidUsersCSV.forEach((ite) => {
      var findUserInServerList = singleUsersServer.find(
        (item) => item.full_name.toLowerCase() == ite.employee.toLowerCase()
      );
      if (findUserInServerList) {
        validListCSV.push({
          ...ite,
          user_id: findUserInServerList.id,
        });
      } else {
        invalidListCSV.push(ite);
      }

      var currentName = ite.employee;
      var arrayCsv = [],
        arrayServer = [];
      const duplicateUsersAtServer = duplicateUsersServer.filter(
        (item) => item.full_name.toLowerCase() == ite.employee.toLowerCase()
      );

      if (duplicateUsersAtServer.length > 0) {
        if (currentName.toLowerCase() == ite.employee.toLowerCase()) {
          arrayCsv = singleValidUsersCSV.filter(
            (item) => item.employee == ite.employee
          );
          arrayServer = duplicateUsersAtServer;

          if (
            finalArrayForDuplicates.find((itee) => currentName in itee) ==
            undefined
          ) {
            finalArrayForDuplicates.push({
              [currentName]: {
                arrayCsv,
                arrayServer,
              },
            });
          }
        } else {
          currentName = ite.employee;
        }
      }
    });
    // setValidUsersForServer([...validListCSV])
    AppLogger("valid ListCSV user list final", validListCSV);
    AppLogger("invalid ListCSV user list final", invalidListCSV);

    setFinalUsersList(validListCSV);
    // setInvalidUsersList(invalidListCSV);

    //  handle duplicate list
    duplicateUsersCSV.forEach((ite) => {
      var currentName = ite.employee;
      var arrayCsv = [],
        arrayServer = [];

      if (currentName == ite.employee) {
        arrayCsv = duplicateUsersCSV.filter(
          (item) => item.employee.toLowerCase() == ite.employee.toLowerCase()
        );
        arrayServer = duplicateUsersServer.filter(
          (item) => item.full_name.toLowerCase() == ite.employee.toLowerCase()
        );
        if (arrayServer.length == 0) {
          arrayServer = singleUsersServer.filter(
            (item) => item.full_name.toLowerCase() == ite.employee.toLowerCase()
          );
        }

        if (
          finalArrayForDuplicates.find((itee) => currentName in itee) ==
          undefined
        ) {
          finalArrayForDuplicates.push({
            [currentName]: {
              arrayCsv,
              arrayServer,
            },
          });
        }
      } else {
        currentName = ite.employee;
      }
    });

    AppLogger(
      "\n\n\n\n\n finally done finalArrayForDuplicates ",
      finalArrayForDuplicates
    );
    setDuplicatedUsersList(finalArrayForDuplicates);

    if (validListCSV.length == 0 && finalArrayForDuplicates.length == 0) {
      showInfoToast(
        appConstants.we_could_not_find_any_registered_user_in_the_csv
      );
      resetAllData();
    }
  };

  // const handlePaylipBulkUpload = (finalUsersList) => { // commenting this code because of client request
  const handlePaylipBulkUpload = () => {
    // if (duplicatedUsersList.length == 0) {
    // const finalList = finalUsersList.map((item) => {
    //   const {
    //     deds_before_tax,
    //     ee_ni,
    //     gross_pay,
    //     net_pay,
    //     nontax_payments,
    //     paye_tax,
    //     stat_pay,
    //     student_loan_aeos,
    //     vol_deds,
    //   } = item;
    //   return {
    //     ...item,
    //     deds_before_tax: Number(deds_before_tax.replace(/\D/g, "")),
    //     ee_ni: Number(ee_ni.replace(/\D/g, "")),
    //     gross_pay: Number(gross_pay.replace(/\D/g, "")),
    //     net_pay: Number(net_pay.replace(/\D/g, "")),
    //     nontax_payments: Number(nontax_payments.replace(/\D/g, "")),
    //     paye_tax: Number(paye_tax.replace(/\D/g, "")),
    //     stat_pay: Number(stat_pay.replace(/\D/g, "")),
    //     student_loan_aeos: Number(student_loan_aeos.replace(/\D/g, "")),
    //     vol_deds: Number(vol_deds.replace(/\D/g, "")),
    //   };
    // });
    dispatch(
      bulkUploadDocumentRequest({
        company_id: get(user, "company_id", ""),
        // pay_slips: finalList,
        file: bulkFile,
        token,
      })
    )
      .then(unwrapResult)
      .then((res) => {
        handlePaySlipSuccessCall(res);
      })
      .catch((err) => {
        AppLogger("Error Array ===", err);
        showFaliureToast(err.message);
        setUploadErrorHideModal(get(err, "data", []));
        AppUtilities.isSessionTimedOut(err, navigate, dispatch);
      });
    // } else {
    //   showInfoToast(appConstants.please_resolve_the_duplciated_user_conflicts);
    // }
  };

  function setUploadErrorHideModal(error) {
    if (error) {
      setUploadError(error);
      setShowModal(false);
    }
    setShowModal(true);
  }

  const handlePDfPaySlipUpload = () => {
    dispatch(
      bulkUploadDocumentRequest({
        company_id: get(user, "company_id", ""),
        file: bulkFile,
        token,
        isPdf,
      })
    )
      .then(unwrapResult)
      .then((res) => {
        handlePaySlipSuccessCall(res);
      })
      .catch((err) => {
        showFaliureToast(err.message);
        setUploadErrorHideModal(get(err, "data", null));
        AppLogger("Error at bulkUploadDocumentRequest===", err);
        AppUtilities.isSessionTimedOut(err, navigate, dispatch);
      });
  };

  const handlePDfP60Upload = () => {
    dispatch(
      addP60DocumentRequest({
        userId: get(user, "company_id", ""),
        file: bulkFile,
        token,
      })
    )
      .then(unwrapResult)
      .then((res) => {
        handlePaySlipSuccessCall(res);
      })
      .catch((err) => {
        showFaliureToast(err.message);
        // if (!err.data.success) {
        setUploadErrorHideModal(get(err, "data", null));
        // }
        AppLogger("Error at bulkUploadP60DocumentRequest", err);
        AppUtilities.isSessionTimedOut(err, navigate, dispatch);
      });
  };

  const handlePDfP45Upload = () => {
    AppLogger(" bulk files p45 ==== ", Array.from(bulkFile));
    dispatch(
      addP45DocumentRequest({
        userId: get(user, "company_id", ""),
        files: Array.from(bulkFile),
        token,
      })
    )
      .then(unwrapResult)
      .then((res) => {
        handlePaySlipSuccessCall(res);
      })
      .catch((err) => {
        showFaliureToast(err.message);
        AppLogger("Error at bulkUploadP45DocumentRequest", err);
        setUploadErrorHideModal(get(err, "data", null));
        AppUtilities.isSessionTimedOut(err, navigate, dispatch);
      });
  };
  const handleDownloadSampleCsvEmp = () => {
    dispatch(
      expportEmployeeSampleCsvRequest({
        token,
      })
    )
      .then(unwrapResult)
      .then((res) => {
        AppLogger("handleDownloadSampleCsvEmp ==== ", res);
        var strr = get(res, "data", "").split("/");
        if (strr) {
          saveAs(get(res, "data", ""), strr[strr.length - 1]);
          // showSuccessToast("")
        }
      })
      .catch((err) => {
        AppLogger("Error at handleDownloadSampleCsvEmp", err);
        showFaliureToast(get(err, "message", ""));
        AppUtilities.isSessionTimedOut(err, navigate, dispatch);
      });
  };

  const handlePaySlipSuccessCall = (res) => {
    AppLogger("Response at bulkUploadDocumentRequest", res);
    // handlePDfP45Upload();
    // handlePDfP60Upload();
    handlePayslipsListRequest();
    handleGetNotificationsRequest();
    showSuccessToast(res.message);
    resetAllData();
    if (resetFileInputField.current) {
      resetFileInputField.current.value = null;
    }
  };

  const handleUserBulkUpload = () => {
    AppLogger("Tags ", requestBody.tags);
    const bulkUserTags = get(requestBody, "tags", []);
    AppLogger("bulkUserTags", bulkUserTags);

    dispatch(
      bulkUploadUserRequest({
        company_id: get(user, "company_id", ""),
        file: bulkFile,
        token,
        tags: bulkUserTags,
      })
    )
      .then(unwrapResult)
      .then((res) => {
        AppLogger("Response at handleUserBulkUpload", res);
        showSuccessToast(res.message);
        setBulkFile(null);
        resetFileInputField.current.value = null;
      })
      .catch((err) => {
        // if (Array.isArray(err.data)) {
        //   setEmployeeBulkError(get(err, "data", []));
        // } else {
        showFaliureToast(err.message);
        setUploadErrorHideModal(get(err, "data", null));
        // }
        AppLogger("Error at handleUserBulkUpload", err);
        AppUtilities.isSessionTimedOut(err, navigate, dispatch);
      });
  };

  //main Handler for Uploading Files
  const handleBulkUploadDocumentRequest = () => {
    if (isPayslip) {
      if (isPdf) {
        handlePDfPaySlipUpload();
      } else {
        handlePaylipBulkUpload();
        // commenting this because of client request
        // code for parsing csv is already there its not getting used because of this request
        // setShowModal(false);
      }
    } else if (isDoc) {
      if (isP60) {
        handlePDfP60Upload();
      } else {
        handlePDfP45Upload();
      }
    } else {
      handleUserBulkUpload();
    }
  };

  const handlePayslipsListRequest = () => {
    if (params.get("user_id")) {
      dispatch(payslipsListRequest({ token, userId: params.get("user_id") }))
        .then(unwrapResult)
        .then((res) => {
          AppLogger("Response at payslipsListRequest", res);
        })
        .catch((err) => {
          AppLogger("Error at payslipsListRequest", err);
          AppUtilities.isSessionTimedOut(err, navigate, dispatch);
        });
    }
  };

  const handleGetNotificationsRequest = () => {
    dispatch(
      getNotificationsRequest({
        user_id: get(user, "company_user_id", ""),
        token,
      })
    )
      .then(unwrapResult)
      .then((res) => {
        AppLogger("Response at getNotificationsRequest", res);
      })
      .catch((err) => {
        AppLogger("Error at getNotificationsRequest", err);
      });
  };

  const resetAllData = () => {
    if (get(resetFileInputField, "current.value", "")) {
      resetFileInputField.current.value = null;
    }
    setBulkFile(null);
    setCsvUsersList([]);
    setFinalUsersList([]);
    setDuplicatedUsersList([]);
    setEmployeeBulkError([]);
  };

  const handleHideModal = () => {
    if (navigationRequired) {
      setShowModal(false);
      resetAllData();
    } else {
      navigate(AppRoutes.employeesAll);
    }
  };

  // TAGS FUNCTIONS
  const localizedToastMsg = useLocalizedToast();

  const { rolesList, tagsList } = useSelector((state) => state.ProfileReducer);
  const { Option } = Select;
  const requestTypes = {
    roles: "roles",
    tags: "tags",
  };
  const [roleToUpdate, setRoleToUpdate] = useState(null);
  const [tagToUpdate, setTagToUpdate] = useState(null);
  const [roleName, setRoleName] = useState("");
  const [tagName, setTagName] = useState("");
  const [requestBody, setRequestBody] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    ni_number: "",
    roles: [],
    tags: [],
    email: "",
    user_id: "",
  });

  const handleGetTagsRequest = () => {
    dispatch(
      getTagsListRequest({ companyId: get(user, "company_id", ""), token })
    )
      .then(unwrapResult)
      .then((res) => {
        AppLogger("Response at getTagsListRequest", res);
      })
      .catch((err) => {
        AppLogger("Error at getTagsListRequest", err);
        AppUtilities.isSessionTimedOut(err, navigate, dispatch);
      });
  };

  const handleGetRolesRequest = () => {
    dispatch(
      getRolesListRequest({ companyId: get(user, "company_id", ""), token })
    )
      .then(unwrapResult)
      .then((res) => {
        AppLogger("Response at getRolesListRequest", res);
      })
      .catch((err) => {
        AppLogger("Error at getRolesListRequest", err);
        AppUtilities.isSessionTimedOut(err, navigate, dispatch);
      });
  };

  const getUpdatedData = (refreshType) => {
    if (refreshType == requestTypes.roles) {
      handleGetRolesRequest();
    }
    if (refreshType == requestTypes.tags) {
      handleGetTagsRequest();
    }
    // handleAllEmployeesRequest();
  };

  const handleAddTagRequest = () => {
    dispatch(
      addTagRequest({
        companyId: get(user, "company_id", ""),
        token,
        name: tagName,
      })
    )
      .then(unwrapResult)
      .then((res) => {
        getUpdatedData(requestTypes.tags);
        AppLogger("Response at addTagRequest", res);
        showSuccessToast(res.message);
      })
      .catch((err) => {
        AppLogger("Error at addTagRequest", err);
        showFaliureToast(err.message);
        AppUtilities.isSessionTimedOut(err, navigate, dispatch);
      });
    setTagName("");
  };

  const handleAddUpdateTag = () => {
    if (!tagName) {
      showWarningToast(localizedToastMsg.pleaseEnterTagName);
      return;
    }
    if (tagToUpdate) {
      handleUpdateTagRequest();
    } else {
      handleAddTagRequest();
    }
  };

  const handleUpdateTagRequest = () => {
    dispatch(
      updateTagRequest({
        tag_id: get(tagToUpdate, "id", ""),
        token,
        name: tagName,
      })
    )
      .then(unwrapResult)
      .then((res) => {
        getUpdatedData(requestTypes.tags);
        AppLogger("Response at updateTagRequest", res);
        setTagToUpdate(null);
        showSuccessToast(res.message);
      })
      .catch((err) => {
        setTagToUpdate(null);
        AppLogger("Error at updateTagRequest", err);
        showFaliureToast(err.message);
        AppUtilities.isSessionTimedOut(err, navigate, dispatch);
      });
    setTagName("");
  };

  const handleDeleteTagRequest = (tag_id) => {
    dispatch(deleteTagRequest({ tag_id: tag_id, token }))
      .then(unwrapResult)
      .then((res) => {
        getUpdatedData(requestTypes.tags);
        AppLogger("Response at deleteTagRequest", res);
        showSuccessToast(res.message);
      })
      .catch((err) => {
        AppLogger("Error at deleteTagRequest", err);
        showFaliureToast(err.message);
        AppUtilities.isSessionTimedOut(err, navigate, dispatch);
      });
  };

  return (
    <div>
      {!showModal && !bulkFile && (
        <div className="m-3 d-flex justify-content-end ">
          <Button
            style={{
              backgroundColor: "var(--primary-btn-color)",
              color: "#fff",
            }}
            className="fs-5 border-0 align-content-end "
            variant="secondary"
            onClick={() => setShowModal(true)}
          >
            {appConstants.bulkUpload}
          </Button>
        </div>
      )}
      {showModal && (
        <Modal
          // destroyOnClose={true}
          // onClose={() => handleHideModal()}
          title={appConstants.bulkUpload}
          centered={true}
          open={showModal}
          closeIcon={null}
          // onOk={() => handleHideModal()}

          onOk={() => {
            handleHideModal();
            // setShowModal(false);
          }}
          // onCancel={() => {
          //   handleHideModal();
          // }}
          okButtonProps={{ hidden: true }}
          cancelButtonProps={{ hidden: true }}
        >
          <ButtonGroup className="mb-3 w-100">
            <PaySlipTabButton
              onClick={() => {
                setIsPayslip(true);
                setIsDoc(false);
                setIsEmployee(false);
                setBulkFile(null);
                resetFileInputField.current.value = null;
                setEmployeeBulkError([]);
              }}
              isPaySlip={isPayslip}
              title={appConstants.payslip}
            />
            {/* Employee B */}
            <PaySlipTabButton
              onClick={() => {
                setIsEmployee(true);
                setIsPayslip(false);
                setIsPdf(false);
                setIsDoc(false);
                resetAllData();
              }}
              isPaySlip={isEmployee}
              title={appConstants.employee}
            />
            <PaySlipTabButton
              onClick={() => {
                setIsPayslip(false);
                setIsPdf(true);
                setIsEmployee(false);
                setIsDoc(true);
                resetAllData();
              }}
              isPaySlip={isDoc}
              title={appConstants.document}
            />
          </ButtonGroup>
          {isPayslip && (
            <ButtonGroup className="mb-3 w-100">
              <PaySlipTabButton
                onClick={() => {
                  setIsPdf(false);
                  resetAllData();
                }}
                isPaySlip={!isPdf}
                title={appConstants.csv}
              />
              <PaySlipTabButton
                onClick={() => {
                  setIsPdf(true);
                  resetAllData();
                }}
                isPaySlip={isPdf}
                title={appConstants.pdf}
              />
            </ButtonGroup>
          )}

          {isDoc && (
            <ButtonGroup className="mb-3 w-100">
              <PaySlipTabButton
                onClick={() => {
                  // setIsPdf(true);
                  setIsP60(true);
                  resetAllData();
                }}
                isPaySlip={isP60}
                title={appConstants.p60}
              />
              <PaySlipTabButton
                onClick={() => {
                  // setIsPdf(true);
                  setIsP60(false);
                  resetAllData();
                }}
                isPaySlip={!isP60}
                title={appConstants.p45}
              />
            </ButtonGroup>
          )}
          <FormFieldUploadFile
            accept={isPdf ? ".pdf" : ".csv"}
            multiple={!isP60}
            title={isPdf ? appConstants.pdf : appConstants.csv}
            maxFilenameLength={30} // characters
            maxFileSize={AppConstants.maxBulkFileSize} // bytes
            validFileTypeList={[
              MIMETYPES.jpeg,
              MIMETYPES.png,
              MIMETYPES.pdf,
              MIMETYPES.epub,
              MIMETYPES.doc,
              MIMETYPES.docx,
            ]}
            typesRequired={false}
            setSelectedFile={(file) => {
              if (file) {
                if (!isPdf) {
                  setEmployeeBulkError([]);
                  setBulkFile(file);
                  // Papa.parse(file, {
                  //   header: true,
                  //   skipEmptyLines: true,
                  //   complete: function (results) {
                  //     setCsvUsersList(get(results, "data", []));
                  //     AppLogger("Uplaoded File Data", results.data);
                  //   },
                  // });
                } else {
                  setEmployeeBulkError([]);
                  setBulkFile(file);
                }
              }
            }}
            resetFileInputField={resetFileInputField}
          />

          {isEmployee && (
            <div className="my-2">
              <p className="mb-2 fs-6 p-0 txtInp-title">
                {appConstants.selectTags}
              </p>
              <div>
                <Select
                  className="p-1 w-100 h-auto form-control "
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  mode="multiple"
                  value={requestBody.tags}
                  onChange={(value, option) => {
                    AppLogger("Tags value: ", value);
                    AppLogger("Tags option: ", option);
                    setRequestBody({ ...requestBody, tags: value });
                  }}
                  optionLabelProp="label"
                  dropdownRender={(menu) => (
                    <div>
                      {menu}
                      <Input
                        className="mt-2"
                        placeholder={appConstants.enterTagName}
                        value={tagName}
                        onChange={(e) => {
                          setTagName(e.target.value);
                        }}
                      />

                      <Button
                        className="mt-2 w-100 mr-0 primary-bg-color"
                        type="primary"
                        onClick={() => handleAddUpdateTag()}
                      >
                        {tagToUpdate
                          ? appConstants.buttons.updateTag
                          : appConstants.buttons.addTag}
                      </Button>
                    </div>
                  )}
                >
                  {tagsList.map((item) => (
                    <Option key={item.id} value={item.id} label={item.name}>
                      <span>{item.name}</span>
                      <span className="ml-2 float-end">
                        <>
                          <EditOutlined
                            className="me-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              setTagToUpdate(item);
                              setTagName(item.name);
                            }}
                          />
                          <DeleteOutlined
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteTagRequest(item.id);
                            }}
                          />
                        </>
                      </span>
                    </Option>
                  ))}
                </Select>
              </div>
            </div>
          )}

          {!isPayslip && !isDoc && (
            <div>
              <Link
                className="color pointer"
                onClick={() => handleDownloadSampleCsvEmp()}
              >
                {appConstants.downloadSampleCsv}
              </Link>
            </div>
          )}
          <Stack direction="horizontal" gap={2} className="mt-2">
            <Button
              disabled={!bulkFile}
              style={{
                backgroundColor: "var(--primary-btn-color)",
                color: "#fff",
              }}
              className="fs-5 border-0"
              variant="secondary"
              onClick={handleBulkUploadDocumentRequest}
            >
              {appConstants.buttons.save}
            </Button>
            <Button
              style={{
                backgroundColor: "#D3D3D9",
                color: "var(--primary-btn-color)",
              }}
              className="fs-5 border-0"
              onClick={() => handleHideModal()}
            >
              {appConstants.buttons.cancel}
            </Button>
          </Stack>
        </Modal>
      )}
    </div>
  );

  // return (
  //   <div>
  //     {!showModal && !bulkFile && (
  //       <div className="m-3 d-flex justify-content-end ">
  //         <Button
  //           style={{
  //             backgroundColor: "var(--primary-btn-color)",
  //             color: "#fff",
  //           }}
  //           className="fs-5 border-0 align-content-end "
  //           variant="secondary"
  //           onClick={() => setShowModal(true)}
  //         >
  //           {appConstants.bulkUpload}
  //         </Button>
  //       </div>
  //     )}
  //     {showModal && (
  //       <Modal
  //         className="fade"
  //         show={showModal}
  //         centered={true}
  //         onHide={() => handleHideModal()}
  //       >
  //         <Modal.Header>
  //           <Modal.Title>{appConstants.bulkUpload}</Modal.Title>
  //         </Modal.Header>
  //         <Modal.Body>
  //           <ButtonGroup className="mb-3 w-100">
  //             <PaySlipTabButton
  //               onClick={() => {
  //                 setIsPayslip(true);
  //                 setIsDoc(false);
  //                 setIsEmployee(false);
  //                 setBulkFile(null);
  //                 resetFileInputField.current.value = null;
  //                 setEmployeeBulkError([]);
  //               }}
  //               isPaySlip={isPayslip}
  //               title={appConstants.payslip}
  //             />
  //             {/* Employee B */}
  //             <PaySlipTabButton
  //               onClick={() => {
  //                 setIsEmployee(true);
  //                 setIsPayslip(false);
  //                 setIsPdf(false);
  //                 setIsDoc(false);
  //                 resetAllData();
  //               }}
  //               isPaySlip={isEmployee}
  //               title={appConstants.employee}
  //             />
  //             <PaySlipTabButton
  //               onClick={() => {
  //                 setIsPayslip(false);
  //                 setIsPdf(true);
  //                 setIsEmployee(false);
  //                 setIsDoc(true);
  //                 resetAllData();
  //               }}
  //               isPaySlip={isDoc}
  //               title={appConstants.document}
  //             />
  //           </ButtonGroup>
  //           {isPayslip && (
  //             <ButtonGroup className="mb-3 w-100">
  //               <PaySlipTabButton
  //                 onClick={() => {
  //                   setIsPdf(false);
  //                   resetAllData();
  //                 }}
  //                 isPaySlip={!isPdf}
  //                 title={appConstants.csv}
  //               />
  //               <PaySlipTabButton
  //                 onClick={() => {
  //                   setIsPdf(true);
  //                   resetAllData();
  //                 }}
  //                 isPaySlip={isPdf}
  //                 title={appConstants.pdf}
  //               />
  //             </ButtonGroup>
  //           )}
  //           {isDoc && (
  //             <ButtonGroup className="mb-3 w-100">
  //               <PaySlipTabButton
  //                 onClick={() => {
  //                   // setIsPdf(true);
  //                   setIsP60(true);
  //                   resetAllData();
  //                 }}
  //                 isPaySlip={isP60}
  //                 title={appConstants.p60}
  //               />
  //               <PaySlipTabButton
  //                 onClick={() => {
  //                   // setIsPdf(true);
  //                   setIsP60(false);
  //                   resetAllData();
  //                 }}
  //                 isPaySlip={!isP60}
  //                 title={appConstants.p45}
  //               />
  //             </ButtonGroup>
  //           )}
  //           <FormFieldUploadFile
  //             accept={isPdf ? ".pdf" : ".csv"}
  //             multiple={!isP60}
  //             title={isPdf ? appConstants.pdf : appConstants.csv}
  //             maxFilenameLength={30} // characters
  //             maxFileSize={11000000} // bytes
  //             validFileTypeList={[
  //               MIMETYPES.jpeg,
  //               MIMETYPES.png,
  //               MIMETYPES.pdf,
  //               MIMETYPES.epub,
  //               MIMETYPES.doc,
  //               MIMETYPES.docx,
  //             ]}
  //             typesRequired={false}
  //             setSelectedFile={(file) => {
  //               if (file) {
  //                 if (!isPdf) {
  //                   setEmployeeBulkError([]);
  //                   setBulkFile(file);
  //                   // Papa.parse(file, {
  //                   //   header: true,
  //                   //   skipEmptyLines: true,
  //                   //   complete: function (results) {
  //                   //     setCsvUsersList(get(results, "data", []));
  //                   //     AppLogger("Uplaoded File Data", results.data);
  //                   //   },
  //                   // });
  //                 } else {
  //                   setEmployeeBulkError([]);
  //                   setBulkFile(file);
  //                 }
  //               }
  //             }}
  //             resetFileInputField={resetFileInputField}
  //           />

  //           {!isPayslip && !isDoc && (
  //             <div>
  //               <Link
  //                 className="color pointer"
  //                 onClick={() => handleDownloadSampleCsvEmp()}
  //               >
  //                 {appConstants.downloadSampleCsv}
  //               </Link>
  //             </div>
  //           )}

  //           {/* Tags Dropdown */}
  //           {
  //             isEmployee && (
  //               <Stack direction="horizontal">
  //                 <Select
  //                   defaultValue="Please select a tag"
  //                   className="p-0 w-100 inputField d-flex align-items-center h-auto "
  //                   showSearch
  //                   open={openSelectView}
  //                   onDropdownVisibleChange={(visible) => setOpenSelectView(visible)}
  //                   optionFilterProp="children"
  //                   filterOption={(input, option) =>
  //                     (option?.label ?? "")
  //                       .toLowerCase()
  //                       .includes(input.toLowerCase())
  //                   }
  //                   mode="multiple"
  //                   value={requestBody.tags}
  //                   onChange={(value, option) => {
  //                     AppLogger("Tags value: ", value);
  //                     AppLogger("Tags option: ", option);
  //                     setRequestBody({ ...requestBody, tags: value });
  //                   }}
  //                   optionLabelProp="label"
  //                   dropdownRender={(menu) => (
  //                     <div
  //                       onMouseDown={(e) => {
  //                         e.preventDefault();
  //                         e.stopPropagation();
  //                       }}
  //                     >
  //                       {menu}
  //                       <div>
  //                         <Input
  //                           className="mt-2"
  //                           placeholder={appConstants.enterTagName}
  //                           value={tagName}
  //                           onChange={(e) => {
  //                             setTagName(e.target.value);
  //                           }}
  //                           onFocus={(e) => {
  //                             e.preventDefault()
  //                           }}

  //                         />
  //                       </div>
  //                       <div className="mt-4 w-100">
  //                         <Button
  //                           className=""
  //                           type="primary"
  //                           onClick={() => handleAddUpdateTag()}
  //                         >
  //                           {tagToUpdate
  //                             ? appConstants.buttons.updateTag
  //                             : appConstants.buttons.addTag}
  //                         </Button>
  //                       </div>
  //                     </div>
  //                   )}
  //                 >
  //                   {tagsList.map((item) => (
  //                     <Option key={item.id} value={item.id} label={item.name}>
  //                       <span>{item.name}</span>
  //                       <span className="ml-2 float-end">
  //                         <>
  //                           <EditOutlined
  //                             className="me-1"
  //                             onClick={(e) => {
  //                               e.stopPropagation();
  //                               setTagToUpdate(item);
  //                               setTagName(item.name);
  //                             }}
  //                           />
  //                           <DeleteOutlined
  //                             onClick={(e) => {
  //                               e.stopPropagation();
  //                               handleDeleteTagRequest(item.id);
  //                             }}
  //                           />
  //                         </>
  //                       </span>
  //                     </Option>
  //                   ))}
  //                 </Select>
  //               </Stack>
  //             )
  //           }

  //           {/* {employeeBulkError.length > 0 && (
  //             <EmployeesErrorSummary summary={employeeBulkError} />
  //           )} */}
  //         </Modal.Body>
  //         <Modal.Footer className="justify-content-start">
  //           <Button
  //             disabled={!bulkFile}
  //             style={{
  //               backgroundColor: "var(--primary-btn-color)",
  //               color: "#fff",
  //             }}
  //             className="fs-5 border-0"
  //             variant="secondary"
  //             onClick={handleBulkUploadDocumentRequest}
  //           >
  //             {appConstants.buttons.save}
  //           </Button>
  //           <Button
  //             style={{
  //               backgroundColor: "#D3D3D9",
  //               color: "var(--primary-btn-color)",
  //             }}
  //             className="fs-5 border-0"
  //             onClick={() => handleHideModal()}
  //           >
  //             {appConstants.buttons.cancel}
  //           </Button>
  //         </Modal.Footer>
  //       </Modal>
  //     )}
  //     {finalUsersList.length > 0 && (
  //       <InvalidUsers
  //         usersList={finalUsersList}
  //         setFinalUsersList={setFinalUsersList}
  //         title={"Valid Users"}
  //         isDisabled={!bulkFile}
  //         handleBulkUploadDocumentRequest={handlePaylipBulkUpload}
  //         handleCancel={resetAllData}
  //       />
  //     )}
  //     {duplicatedUsersList.length > 0 && (
  //       <DuplicatedUsers
  //         usersList={duplicatedUsersList}
  //         setUserList={setDuplicatedUsersList}
  //         title={appConstants.duplicatedUsers}
  //         finalUsersList={finalUsersList}
  //         setFinalUsersList={setFinalUsersList}
  //         handleCancel={resetAllData}
  //       />
  //     )}
  //   </div>
  // );
}

BulkUploadModal.propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
};

export default BulkUploadModal;
