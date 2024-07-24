import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { get, isArray } from "lodash";
import { unwrapResult } from "@reduxjs/toolkit";
import { Row, Col, Nav, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { GlobalFilter } from "../../components/employees/subComponents/GlobalFilter";
import { showSuccessToast, showFaliureToast } from "../../helpers/AppToasts";
import { EmployeePagination } from "./EmployeePagination";
import {
  allEmployeesRequest,
  deleteEmployeeRequest,
  addUpdateEmployeeRequest,
  exportEmployeesListRequest,
  archiveBulkEmployeeRequest,
} from "../../redux/reducers/EmployeesReducer";
import { saveAs } from "file-saver";
import AppRoutes from "../../helpers/AppRoutes";
import AppLogger from "../../helpers/AppLogger";
import AppUtilities from "../../helpers/AppUtilities";
import AppConstants from "../../helpers/AppConstants";
import useLocalizedConstants from "../../hooks/useLocalizedConstants";
import useLocalizedPageTitle from "../../hooks/useLocalizedPageTitle";
import DeleteModel from "../../components/employees/subComponents/DeleteModel";
import AddEmployeeModal from "../../components/employees/subComponents/AddEmployeeModal";
import AdminNotFound from "../pageNotFound/AdminNotFound";
import "../../pages/style.css";
import { toast } from "react-toastify";
function AllEmployees({ employeeType = AppConstants.employeeTypes.all }) {
  // Dispatchers
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Localization and Constants
  const appConstants = useLocalizedConstants();

  // Reducer States
  const { allEmployees } = useSelector((state) => state.EmployeesReducer);
  const { user, token } = useSelector((state) => state.AuthenticationReducer);
  // Custom Hooks
  useLocalizedPageTitle(appConstants.pageTitles.employees);

  // Local States
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModel, setShowDeleteModel] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [employeeToUpdate, setEmployeeToUpdate] = useState(null);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [searchs, setSearch] = useState("");
  const [isSingleDelete, setIsSingleDelete] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isArchaive, setIsArchaive] = useState(true);
  // Constants
  useEffect(() => {
    setSelectedEmployees([]);
    setCurrentPage(1);
    setSearch("");
    handleAllEmployeesRequest(0, "");
  }, [employeeType]);

  const handleAllEmployeesRequest = (
    offset = currentPage,
    search = searchs
  ) => {
    // console.log("Zzzzzzz", searchs);
    dispatch(
      allEmployeesRequest({
        companyId: get(user, "company_id", ""),
        token,
        offset,
        search,
        pageSize,
        archive: employeeType == AppConstants.employeeTypes.archive ? 1 : 0,
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

  // Handle delete user api
  const handleDeleteEmployeeRequest = () => {
    if (!isSingleDelete && selectedEmployees.length > 0) {
      dispatch(
        archiveBulkEmployeeRequest({
          id: get(user, "company_id", 0),
          token,
          // userid: get(employeeToDelete, "id", 0),
          company_user_ids: selectedEmployees,
          isToArchive: isArchaive,
        })
      )
        .then(unwrapResult)
        .then((res) => {
          setShowDeleteModel(false);
          showSuccessToast(res.message);
          setIsSingleDelete(false);
          setSelectedEmployees([]);
          handleAllEmployeesRequest(currentPage * pageSize - pageSize);
        })
        .catch((err) => {
          showFaliureToast(err.message);
        });
      // return
    }

    if (isSingleDelete) {
      AppLogger("Deleting Single Employee");
      dispatch(
        deleteEmployeeRequest({
          id: get(employeeToDelete, "company_user_id", 0),
          token,
          userid: get(employeeToDelete, "id", 0),
        })
      )
        .then(unwrapResult)
        .then((res) => {
          setShowDeleteModel(false);
          showSuccessToast(res.message);
          setIsSingleDelete(false);
        })
        .catch((err) => {
          showFaliureToast(err.message);
        });
    }
  };

  const handleExportEmployeesList = () => {
    dispatch(
      exportEmployeesListRequest({
        token: token,
        companyId: get(user, "company_id", ""),
      })
    )
      .then(unwrapResult)
      .then((res) => {
        showSuccessToast(res.message);
        // downloading csv file
        var strr = res.data.split("/");
        saveAs(res.data, strr[strr.length - 1]);
      })
      .catch((err) => {
        showFaliureToast(err.message);
        AppUtilities.isSessionTimedOut(err, navigate, dispatch);
      });
  };

  const handleAddUpdateEmployeeRequest = (requestBody) => {
    var body = { ...requestBody };

    if (body.email) {
      if (!AppConstants.validateEmail.test(body.email)) {
        showFaliureToast(appConstants.InValidEmailFormat);
        return;
      }
    }

    if (
      body.email &&
      (!body.phone_number || get(body, "phone_number", "").length <= 1)
    ) {
      delete body.phone_number;
      handleAddEmployeeRequest(body);
    }

    if (!body.email && body.phone_number) {
      delete body.email;
      handleAddEmployeeRequest(body);
    }

    if (body.email && body.phone_number) {
      handleAddEmployeeRequest(body);
    }
  };

  const handleAddEmployeeRequest = (body) => {
    dispatch(
      addUpdateEmployeeRequest({
        userdata: body,
        companyId: get(user, "company_id", ""),
        token,
        id: get(employeeToUpdate, "company_user_id", null),
      })
    )
      .then(unwrapResult)
      .then((res) => {
        // console.log("offsettttt ==== ", currentPage);
        handleAllEmployeesRequest(currentPage * pageSize - pageSize);
        AppLogger("Response at addUpdateEmployeeRequest", res);

        showSuccessToast(res.message);
        setShowModal(false);
      })
      .catch((err) => {
        AppLogger("Error at addUpdateEmployeeRequest", err);
        showFaliureToast(err.message);
      });
  };

  function handleAddEmployeeClick() {
    setEmployeeToUpdate(null);
    setShowModal(true);
  }

  // Pagination Functions
  const handlePageChange = (pageNumber, limit) => {
    handleAllEmployeesRequest(pageNumber * pageSize - pageSize, searchs, limit);
  };

  const handleUpdateUser = (employee) => {
    setShowModal(true);
    setEmployeeToUpdate(employee);
  };

  function handleDeleteUser(userDetails) {
    setEmployeeToDelete(userDetails);
    setShowDeleteModel(true);
    setIsSingleDelete(true);
  }

  function handleArchiveUnarchiveEmployees(archive) {
    setIsArchaive(archive);
    setShowDeleteModel(true);
  }

  //checkbox handler
  const handleCheckboxChange = (checkboxValue, id) => {
    // console.log("checkboxValue === ", checkboxValue);
    // console.log("id === ", id);
    var selectArray = [...selectedEmployees];

    if (checkboxValue) {
      if (!selectArray.find((item) => item == id)) {
        selectArray.push(id);
      }
    } else {
      selectArray = [...selectArray.filter((item) => item != id)];
    }
    AppLogger("Selected Array ", selectArray);
    // console.log("select arrayyy ", selectArray);
    setSelectedEmployees(selectArray);
  };

  // Table headers
  const tableHeaders = [
    appConstants.profile,
    appConstants.national_ni_number,
    appConstants.tags,
    appConstants.role,
    appConstants.joiningDate,
    appConstants.select,
    appConstants.actions,
  ];

  if (AppUtilities.isAdmin(user)) {
    return (
      <div className="container-fluid">
        <div className="d-flex gap-2">
          <div>
            {employeeType == AppConstants.employeeTypes.all
              ? appConstants.employees
              : appConstants.archive}
          </div>
          {employeeType != AppConstants.employeeTypes.archive && (
            <>
              {" > "}
              <div className="primary-color">{appConstants.allEmployees}</div>
            </>
          )}
        </div>
        <div className="d-flex card-header flex-wrap pb-0 px-0">
          <h2 className="font-w600">
            {employeeType == AppConstants.employeeTypes.all
              ? appConstants.allEmployees
              : appConstants.archiveEmployees}
          </h2>
          {employeeType == AppConstants.employeeTypes.all && (
            <div>
              <button
                type="button"
                className="primary-bg-color"
                onClick={() => handleExportEmployeesList()}
              >
                {/* <i className="fa-solid fa-plus pr-1 "></i> */}
                {appConstants.export_employees}
              </button>
              <button
                type="button"
                className="primary-bg-color ml-1"
                onClick={handleAddEmployeeClick}
              >
                <i className="fa-solid fa-plus pr-1 "></i>{" "}
                {appConstants.buttons.addEmployee}
              </button>
              {selectedEmployees.length > 0 && (
                <button
                  type="button"
                  className="primary-bg-color ml-1 "
                  onClick={() => handleArchiveUnarchiveEmployees(true)}
                >
                  <i className="fa-solid fa-trash pr-1 "></i>
                  {`${appConstants.archiveSelectedUsers}${
                    selectedEmployees.length > 1 ? "s" : ""
                  }`}
                </button>
              )}
            </div>
          )}

          {employeeType == AppConstants.employeeTypes.archive && (
            <div>
              {selectedEmployees.length > 0 && (
                <button
                  type="button"
                  className="primary-bg-color ml-1 "
                  onClick={() => handleArchiveUnarchiveEmployees(false)}
                >
                  <i class="fa-solid fa-archive pr-1" aria-hidden="true"></i>
                  {`${appConstants.unarchiveSelectedUsers}${
                    selectedEmployees.length > 1 ? "s" : ""
                  }`}
                </button>
              )}
            </div>
          )}
        </div>

        <div className="container-fluid px-0">
          <Row>
            <Col lg="12">
              <div className="card">
                <div className="card-body">
                  <GlobalFilter
                    setCurrentPage={setCurrentPage}
                    Search={handleAllEmployeesRequest}
                    set={setSearch}
                    searchh={searchs}
                  />
                  <h4 className="font-w700 my-3">
                    {AppConstants.allEmployees}
                  </h4>
                  <div className="col-xl-12">
                    <div className="table-responsive ">
                      <table className="table dataTable emp-table allEmpHead">
                        <thead className="table-bg-header">
                          <tr>
                            {tableHeaders.map((headings, index) => {
                              return (
                                <th
                                  className="col-2 align-items-center  table-heading-text "
                                  key={index}
                                >
                                  {headings}
                                </th>
                              );
                            })}
                          </tr>
                        </thead>
                        <tbody>
                          {allEmployees.length > 0 ? (
                            allEmployees.map((item) => {
                              {
                                /* const {
                                full_name,
                                ni_number,
                                created_at,
                                company_user_id,
                                tags,
                                roles,
                              } = item; */
                              }
                              return (
                                <tr
                                  className="color-black"
                                  key={item.company_user_id}
                                >
                                  <td>
                                    <div className="overflow-class">
                                      {item.full_name}
                                    </div>
                                  </td>
                                  <td>
                                    <div className="overflow-class">
                                      {item.ni_number}
                                    </div>
                                  </td>
                                  <td>
                                    <div className="text-center overflow-class">
                                      {get(item, "company_user.tags", [])
                                        .length > 0 ? (
                                        <Stack
                                          direction="horizontal"
                                          gap="1"
                                          className={`${
                                            get(item, "company_user.tags")
                                              .length > 0
                                              ? ""
                                              : "justify-content-center"
                                          }`}
                                        >
                                          {get(item, "company_user.tags").map(
                                            (tag, index) => {
                                              return (
                                                <span
                                                  key={index}
                                                  className="bg-body rounded-pill py-3 px-3 "
                                                >
                                                  {get(tag, "name", "")}
                                                </span>
                                              );
                                            }
                                          )}
                                        </Stack>
                                      ) : (
                                        <Stack
                                          direction="horizontal"
                                          className=""
                                        >
                                          <span className="bg-body rounded-pill py-3 px-3 ">
                                            {appConstants.na}
                                          </span>
                                        </Stack>
                                      )}
                                    </div>
                                  </td>
                                  <td>
                                    {/* item.company_user.roles */}
                                    <div className="overflow-class">
                                      {get(item, "company_user.roles", []).map(
                                        (role, index) => {
                                          return (
                                            <span key={index}>
                                              {get(role, "name", "")}{" "}
                                            </span>
                                          );
                                        }
                                      )}
                                    </div>
                                  </td>
                                  <td>
                                    {AppUtilities.formattedDate(
                                      item.created_at
                                    )}
                                  </td>
                                  <td>
                                    {!item.is_admin && (
                                      <input
                                        style={{
                                          borderColor: "color(srgb 0 0 0)",
                                        }}
                                        className="form-check-input"
                                        type="checkbox"
                                        value={selectedEmployees.filter(
                                          (empItem) =>
                                            empItem.company_user_id ==
                                            item.company_user_id
                                        )}
                                        onChange={(e) => {
                                          handleCheckboxChange(
                                            e.target.checked,
                                            item.company_user_id
                                          );
                                        }}
                                      />
                                    )}
                                  </td>
                                  <td>
                                    <span>
                                      <Link
                                        to={
                                          AppRoutes.profile +
                                          `?user_id=${item.company_user_id}`
                                        }
                                        className="me-4"
                                        title="View"
                                      >
                                        <i className="fa fa-eye text-black"></i>
                                      </Link>
                                      <span
                                        title="Edit"
                                        className="me-4 pointer"
                                        onClick={() => handleUpdateUser(item)}
                                      >
                                        <i className="fas fa-pencil-alt color-muted"></i>{" "}
                                      </span>
                                      {employeeType ==
                                        AppConstants.employeeTypes.all &&
                                        !item.is_admin && (
                                          <span
                                            className="pointer"
                                            onClick={() =>
                                              handleDeleteUser(item)
                                            }
                                            title="Delete"
                                          >
                                            <i className="fa fa-close text-danger"></i>
                                          </span>
                                        )}
                                    </span>
                                  </td>
                                </tr>
                              );
                            })
                          ) : (
                            <td>{appConstants.foundEmployees}</td>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {allEmployees.length > 0 && (
                    <EmployeePagination
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      size={pageSize}
                      handlePageChange={handlePageChange}
                      setPageSize={setPageSize}
                    />
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </div>

        <AddEmployeeModal
          showModal={showModal}
          setShowModal={setShowModal}
          employeeToUpdate={employeeToUpdate}
          handleSubmit={(requestBody) =>
            handleAddUpdateEmployeeRequest(requestBody)
          }
        />

        <DeleteModel
          title={
            !isSingleDelete && selectedEmployees.length > 0
              ? isArchaive
                ? `${appConstants.titles.deleteEmployee}s`
                : appConstants.titles.restoreEmployees
              : appConstants.titles.deleteEmployee
          }
          employeeType={employeeType}
          archive={isArchaive}
          showdeleteModel={showDeleteModel}
          setShowDeleteModel={(value) => {
            setShowDeleteModel(value);
            setIsSingleDelete(false);
          }}
          handleDelete={handleDeleteEmployeeRequest}
          multi={!isSingleDelete && selectedEmployees.length > 0}
        />
      </div>
    );
  } else {
    return <AdminNotFound />;
  }
}

export default AllEmployees;
