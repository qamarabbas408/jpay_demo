import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Pagination } from "antd";
import useLocalizedConstants from "../../hooks/useLocalizedConstants";
import AppUtilities from "../../helpers/AppUtilities";
import AppConstants from "../../helpers/AppConstants";

function Notifications() {
  const appConstants = useLocalizedConstants();
  const tableName = "dashboard-notifications-table";

  // Reducer States
  const { notifications } = useSelector((state) => state.AuthenticationReducer);

  // Local States
  const [currentPage, setCurrentPage] = useState(1);

  // Constants
  const recordsPage = 10;
  const lastIndex = currentPage * recordsPage;
  const firstIndex = lastIndex - recordsPage;
  const records = notifications.slice(firstIndex, lastIndex);

  return (
    <div>
      <h4 className="task-notification-title">{appConstants.notification}</h4>
      <div
        className="table-responsive dataTables_wrapper no-footer"
        style={{ overflowY: "hidden" }}
      >
        <table
          id={tableName}
          className="display table color-black notifications-table dashboard-table "
        // text-align-last-start mt-4 "
        >
          <thead>
            <tr>
              <th className="text-left col-3">{appConstants.title}</th>
              <th className="text-left col-3">{appConstants.startDate}</th>
              <th className="text-start col-3">{appConstants.description}</th>
            </tr>
          </thead>
          <tbody>
            {records && records.length > 0 ? (
              records.map((notification, index) => {
                const { updated_at, data } = notification;
                const { description, title, tags } = data;
                return (
                  <tr key={index}>
                    <td>{title}</td>
                    <td>
                      {AppUtilities.formattedDate(
                        updated_at,
                        AppConstants.dateTimeFormat
                      )}
                    </td>
                    <td className="text-start">{description}</td>
                  </tr>
                );
              })
            ) : (
              <h6 className="mb-1 mt-3">{appConstants.noNotifications}</h6>
            )}
          </tbody>
        </table>
        {records.length > 0 && (
          <div className="d-sm-flex text-center justify-content-between align-items-center">
            <div className="dataTables_info">
              {appConstants.start} {lastIndex - recordsPage + 1}{" "}
              {appConstants.to}{" "}
              {notifications.length < lastIndex
                ? notifications.length
                : lastIndex}{" "}
              {appConstants.of} {notifications.length} {appConstants.end}
            </div>
            <Pagination
              total={notifications.length}
              current={currentPage}
              onChange={(page, _) => {
                setCurrentPage(page);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

Notifications.propTypes = {};

export default Notifications;
