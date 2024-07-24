import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { useNavigate } from "react-router";
import { Button } from "react-bootstrap";
import { Select, Input, Modal } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { PrimaryTextField } from "../../AppTextFields";
import { get } from "lodash";
import {
  showFaliureToast,
  showSuccessToast,
  showWarningToast,
} from "../../../helpers/AppToasts";
import { allEmployeesRequest } from "../../../redux/reducers/EmployeesReducer";
import {
  getRolesListRequest,
  addRoleRequest,
  updateRoleRequest,
  deleteRoleRequest,
  getTagsListRequest,
  addTagRequest,
  updateTagRequest,
  deleteTagRequest,
} from "../../../redux/reducers/ProfileReducer";
import parsePhoneNumber from "libphonenumber-js";
import useLocalizedConstants from "../../../hooks/useLocalizedConstants";
import useLocalizedToast from "../../../hooks/useLocalizedToast";
import AppLogger from "../../../helpers/AppLogger";
import AppUtilities from "../../../helpers/AppUtilities";
import AppConstants from "../../../helpers/AppConstants";

function AddEmployeeModal({
  showModal,
  setShowModal,
  handleSubmit,
  employeeToUpdate,
}) {
  // UI Elements
  const { Option } = Select;

  // Dispatchers
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Reducer States
  const { rolesList, tagsList } = useSelector((state) => state.ProfileReducer);
  const { user, token } = useSelector((state) => state.AuthenticationReducer);
  // Localization and Constants
  const appConstants = useLocalizedConstants();
  const localizedToastMsg = useLocalizedToast();

  // Local States
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

  // Constants
  const requestTypes = {
    roles: "roles",
    tags: "tags",
  };

  useEffect(() => {
    if (employeeToUpdate) {
      handleInitialValues();
    }
    return () => {
      setRequestBody({
        first_name: "",
        last_name: "",
        phone_number: "",
        ni_number: "",
        roles: [],
        tags: [],
        email: "",
        user_id: "",
      });
    };
  }, [showModal, employeeToUpdate]);

  const handleInitialValues = () => {
    setRequestBody({
      first_name: employeeToUpdate.first_name,
      last_name: employeeToUpdate.last_name,
      phone_number: employeeToUpdate.phone_number,
      ni_number: employeeToUpdate.ni_number,
      roles: getInitialArray(get(employeeToUpdate, "company_user.roles", [])),
      tags: getInitialArray(get(employeeToUpdate, "company_user.tags", [])),
      email: employeeToUpdate.email,
      user_id: get(employeeToUpdate, "company_user.user_id", 0),
    });
  };

  const getInitialArray = (array) => {
    let finalArray = [];
    array.map((item) => {
      finalArray.push(item.id);
    });
    return finalArray;
  };

  // Get input values
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == "phone_number") {
      setRequestBody((previousData) => ({
        ...previousData,
        phone_number: AppUtilities.format_phone_number(e),
      }));
    } else {
      setRequestBody((previousData) => ({
        ...previousData,
        [name]: value,
      }));
    }
  };

  // When all input fields are empty so button will be disable
  const isDisabled = () => {
    const {
      first_name,
      last_name,
      phone_number,
      ni_number,
      // roles,
      // tags,
      email,
    } = requestBody;

    var check = true;

    if (email) {
      check = false;
    } else if (phone_number && parsePhoneNumber(phone_number)?.isValid()) {
      check = false;
    }
    return (
      !first_name ||
      !last_name ||
      !ni_number ||
      // !roles.length > 0 ||
      // !tags.length > 0 ||
      check
    );
  };

  const handleAllEmployeesRequest = () => {
    dispatch(
      allEmployeesRequest({
        companyId: get(user, "company_id", ""),
        token,
      })
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

  const getUpdatedData = (refreshType) => {
    if (refreshType == requestTypes.roles) {
      handleGetRolesRequest();
    }
    if (refreshType == requestTypes.tags) {
      handleGetTagsRequest();
    }
    handleAllEmployeesRequest();
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

  const handleAddRoleRequest = () => {
    dispatch(
      addRoleRequest({
        companyId: get(user, "company_id", ""),
        token,
        name: roleName,
      })
    )
      .then(unwrapResult)
      .then((res) => {
        getUpdatedData(requestTypes.roles);
        AppLogger("Response at addRoleRequest", res);
        showSuccessToast(res.message);
      })
      .catch((err) => {
        AppLogger("Error at addRoleRequest", err);
        showFaliureToast(err.message);
        AppUtilities.isSessionTimedOut(err, navigate, dispatch);
      });
    setRoleName("");
  };

  const handleUpdateRoleRequest = () => {
    dispatch(
      updateRoleRequest({
        role_id: get(roleToUpdate, "id", ""),
        token,
        name: roleName,
      })
    )
      .then(unwrapResult)
      .then((res) => {
        getUpdatedData(requestTypes.roles);
        AppLogger("Response at updateRoleRequest", res);
        showSuccessToast(res.message);
      })
      .catch((err) => {
        AppLogger("Error at updateRoleRequest", err);
        showFaliureToast(err.message);
        AppUtilities.isSessionTimedOut(err, navigate, dispatch);
      });
    setRoleName("");
  };

  const handleDeleteRoleRequest = (role_id) => {
    dispatch(deleteRoleRequest({ role_id: role_id, token }))
      .then(unwrapResult)
      .then((res) => {
        getUpdatedData(requestTypes.roles);
        AppLogger("Response at deleteRoleRequest", res);
        showSuccessToast(res.message);
      })
      .catch((err) => {
        AppLogger("Error at deleteRoleRequest", err);
        showFaliureToast(err.message);
        AppUtilities.isSessionTimedOut(err, navigate, dispatch);
      });
  };

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
        showSuccessToast(res.message);
      })
      .catch((err) => {
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

  const handleAddUpdateRole = () => {
    if (!roleName) {
      showWarningToast(localizedToastMsg.pleaseEnterRoleName);
      return;
    }
    if (roleToUpdate) {
      handleUpdateRoleRequest();
    } else {
      handleAddRoleRequest();
    }
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

  return (
    <Modal
      centered={true}
      destroyOnClose={true}
      open={showModal}
      onOk={() => {
        setShowModal(false);
      }}
      onCancel={() => {
        setShowModal(false);
        setRoleToUpdate(null);
        setTagToUpdate(null);
      }}
      okButtonProps={{ hidden: true }}
      cancelButtonProps={{ hidden: true }}
    >
      <div className="add-emp-modal-form gap-3">
        <div>
          <h2 className="heading-add-update">
            {employeeToUpdate
              ? appConstants.buttons.updateEmployee
              : appConstants.buttons.addEmployee}
          </h2>
        </div>
        <div className="add-emp-modal-innerCon gap-3">
          <PrimaryTextField
            title={appConstants.firstName + appConstants.titles.asterisk}
            placeholder={""}
            isRequired={true}
            onChange={(e) => handleChange(e)}
            value={requestBody.first_name}
            name={appConstants.first_name}
            addInputCss="height40"
          />
          <PrimaryTextField
            title={appConstants.lastName + appConstants.titles.asterisk}
            placeholder={""}
            isRequired={false}
            onChange={(e) => handleChange(e)}
            value={requestBody.last_name}
            name={appConstants.last_name}
            addInputCss="height40"
          />
        </div>
        <div className="add-emp-modal-innerCon gap-3">
          <PrimaryTextField
            title={
              appConstants.titles.phoneNumber
              // + appConstants.titles.asterisk
            }
            placeholder={""}
            isRequired={true}
            onChange={(e) => handleChange(e)}
            value={requestBody.phone_number}
            name={appConstants.phone_number}
            addInputCss="height40"
            inputStyle={
              requestBody.phone_number &&
              !parsePhoneNumber(requestBody.phone_number)?.isValid()
                ? { border: "1px solid red" }
                : {}
            }
          />
          <PrimaryTextField
            title={appConstants.titles.NINumber + appConstants.titles.asterisk}
            placeholder={""}
            isRequired={true}
            onChange={(e) => handleChange(e)}
            value={requestBody.ni_number}
            name={appConstants.ni_number}
            addInputCss="height40"
          />
        </div>
        <div className="add-emp-modal-innerCon gap-3">
          <div className="container">
            <div className="row">
              <p className="mb-2 fs-6 p-0 txtInp-title">
                {
                  appConstants.selectRole //  + appConstants.titles.asterisk
                }
              </p>
              <Select
                className="p-0 w-100 height40 inputField d-flex align-items-center max-width-227"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                value={requestBody.roles}
                onChange={(value, option) => {
                  setRequestBody({ ...requestBody, roles: [value] });
                }}
                optionLabelProp="label"
                dropdownRender={(menu) => (
                  <div>
                    {menu}
                    <Input
                      maxLength={AppConstants.maxInputLength}
                      className="mt-2"
                      placeholder={appConstants.enterRoleName}
                      value={roleName}
                      onChange={(e) => {
                        setRoleName(e.target.value);
                      }}
                    />
                    <Button
                      className="mt-2 w-100 me-0"
                      type="primary"
                      onClick={() => handleAddUpdateRole()}
                    >
                      {roleToUpdate
                        ? appConstants.buttons.updateRole
                        : appConstants.buttons.addRole}
                    </Button>
                  </div>
                )}
              >
                {rolesList.map((item) => (
                  <Option key={item.id} value={item.id} label={item.name}>
                    <span>
                      {item.name}
                      <span className="ml-2 float-end">
                        <>
                          <EditOutlined
                            className="me-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              setRoleToUpdate(item);
                              setRoleName(item.name);
                            }}
                          />
                          <DeleteOutlined
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteRoleRequest(item.id);
                            }}
                          />
                        </>
                      </span>
                    </span>
                  </Option>
                ))}
              </Select>
            </div>
          </div>

          <div className="container">
            <div className="row">
              <p className="mb-2 fs-6 p-0 txtInp-title">
                {
                  appConstants.selectTags // + appConstants.titles.asterisk
                }
              </p>
              <Select
                style={{ maxHeight: "70px" }}
                className="p-0 w-100 inputField d-flex align-items-center h-auto max-width-227 overflow-scroll "
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
                      className="mt-2 w-100 mr-0"
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
        </div>
        <PrimaryTextField
          title={
            appConstants.emailTitle
            // + appConstants.titles.asterisk
          }
          placeholder={""}
          isRequired={true}
          onChange={(e) => handleChange(e)}
          value={requestBody.email}
          name={appConstants.email}
          addInputCss="height40"
          // inputStyle={
          //   requestBody.email &&
          //     !AppConstants.validateEmail.test(requestBody.email)
          //     ? { border: "1px solid red" }
          //     : {}
          // }
        />
        <div>
          <p
            style={{ color: "#0f4d0f" }}
            className="mb-2 fs-6 p-0 txtInp-title font-weight-bolder "
          >
            {appConstants.emailOrPhoneIsRequired}
          </p>
        </div>
        <div className="add-emp-save-btnCon ">
          {employeeToUpdate ? (
            <Button
              disabled={isDisabled()}
              style={{
                borderWidth: 0,
                backgroundColor: isDisabled()
                  ? "lightgray"
                  : "var(--primary-btn-color)",
              }}
              onClick={() => handleSubmit(requestBody)}
            >
              {appConstants.buttons.update.toUpperCase()}
            </Button>
          ) : (
            <Button
              disabled={isDisabled()}
              style={{
                borderWidth: 0,
                backgroundColor: isDisabled()
                  ? "lightgray"
                  : "var(--primary-btn-color)",
              }}
              onClick={() => handleSubmit(requestBody)}
            >
              {appConstants.buttons.save.toUpperCase()}
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default AddEmployeeModal;
