import React, { useState } from "react";
import { Pagination } from "antd";
import { useSelector } from "react-redux";
import useLocalizedConstants from "../../hooks/useLocalizedConstants";

export const EmployeePagination = ({
  currentPage,
  setCurrentPage,
  size = 10,
  handlePageChange,
  setPageSize,
}) => {
  // Local States

  // Reducer States
  const { employeesCount } = useSelector((state) => state.EmployeesReducer);

  // Localised Constants
  const appConstants = useLocalizedConstants();

  // Constants
  const recordsPage = size;
  const lastIndex = currentPage * recordsPage;

  return (
    <div className="d-sm-flex text-center mt-2-5 justify-content-between align-items-center">
      <div className="dataTables_info">
        {appConstants.start} {lastIndex - recordsPage + 1} {appConstants.to}{" "}
        {employeesCount < lastIndex ? employeesCount : lastIndex}{" "}
        {appConstants.of} {employeesCount} {appConstants.end}
      </div>
      <Pagination
        pageSize={recordsPage}
        total={employeesCount}
        current={currentPage}
        onChange={(page, pageSize) => {
          setCurrentPage(page);
          setPageSize(pageSize);
          handlePageChange(page);
        }}
      />
    </div>
  );
};
