import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AppRoutes from "../../helpers/AppRoutes";
import useLocalizedConstants from "../../hooks/useLocalizedConstants";
import useLocalizedPageTitle from "../../hooks/useLocalizedPageTitle";

const AdminNotFound = () => {
  // Localization and Constants
  const appConstants = useLocalizedConstants();

  // Custom Hooks
  useLocalizedPageTitle(appConstants.pageTitles.pageNotFound);

  // Reducer States
  const { user } = useSelector((state) => state.AuthenticationReducer);

  return (
    <div className="authincation h-100">
      <div className="container h-100">
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-md-6">
            <div className="error-page">
              <div className="error-inner text-center">
                <div className="dz-error" data-text="401">
                  {appConstants.titles.adminErrNo}
                </div>
                <h4 className="error-head">
                  <i className="fa fa-exclamation-triangle text-warning"></i>{" "}
                  {appConstants.descriptions.adminNotFoundDesc}
                </h4>
                <div>
                  <Link
                    to={user ? AppRoutes.dashboard : AppRoutes.login}
                    className="btn btn-secondary"
                  >
                    {user
                      ? appConstants.buttons.goToDashboard
                      : appConstants.buttons.signin}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNotFound;
