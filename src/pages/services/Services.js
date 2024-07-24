import React from "react";
import useLocalizedConstants from "../../hooks/useLocalizedConstants";
import useLocalizedPageTitle from "../../hooks/useLocalizedPageTitle";
import GreetingMessagebox from "../../components/dashboard/GreetingMessagebox";

function Services() {
  // Localization and Constants
  const appConstants = useLocalizedConstants();

  // Custom Hooks
  useLocalizedPageTitle(appConstants.pageTitles.services);

  // Local States
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="d-flex justify-content-between text-wrap align-items-center">
          <div className="dashboard-text">
            {appConstants.pageTitles.services}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-12 mt-5">
          <GreetingMessagebox message={appConstants.pleaseSelectServiceType} />
        </div>
      </div>
    </div>
  );
}

export default Services;
