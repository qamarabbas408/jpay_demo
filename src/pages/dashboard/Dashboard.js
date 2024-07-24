import React from "react";
import { useSelector } from "react-redux";
import { get } from "lodash";
import GreetingMessagebox from "../../components/dashboard/GreetingMessagebox";
import useLocalizedConstants from "../../hooks/useLocalizedConstants";
import useLocalizedPageTitle from "../../hooks/useLocalizedPageTitle";
import AppUtilities from "../../helpers/AppUtilities";
import Tasks from "../../components/dashboard/Tasks";
import "../style.css";

function Dashboard() {
  // Localization and Constants
  const appConstants = useLocalizedConstants();

  // Custom Hooks
  useLocalizedPageTitle(appConstants.pageTitles.dashboard);

  // Reducer States
  const { user } = useSelector((state) => state.AuthenticationReducer);

  const isAdmin = AppUtilities.isAdmin(user);

  return (
    <div className="table-responsive active-projects style-1 ItemsCheckboxSec shorting">
      <div className="container-fluid">
        <div className="row">
          <div className="d-flex justify-content-between text-wrap align-items-center">
            <div className="dashboard-text">{appConstants.pageTitles.dashboard}</div>
            <div className="bg-white border rounded color-black fs-16 py-2 px-3 font-w500">
              {isAdmin ? appConstants.titles.adminAcc : appConstants.titles.staffAcc}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-12 mt-5">
            {!isAdmin && (
              <GreetingMessagebox
                message={
                  appConstants.goodToSeeYou +
                  get(user, "full_name", "") +
                  appConstants.handIcon
                }
              />
            )}
            <div className="col-xl-12 ">
              <Tasks />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
