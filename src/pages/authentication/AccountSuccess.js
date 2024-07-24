import React from "react";
import { PrimaryButton } from "../../components/AppButtons";
import { useSearchParams } from "react-router-dom";
import useLocalizedConstants from "../../hooks/useLocalizedConstants";
import useLocalizedPageTitle from "../../hooks/useLocalizedPageTitle";
import AppImages from "../../helpers/AppImages";
import H1 from "../../components/Headings";
import AppRoutes from "../../helpers/AppRoutes";
import AppConstants from "../../helpers/AppConstants";

const AccountSuccess = () => {
  // Dispatchers
  const [params] = useSearchParams();

  // Localization and Constants
  const appConstants = useLocalizedConstants();

  // Custom Hooks
  useLocalizedPageTitle(appConstants.pageTitles.accountCreated);
  return (
    <div className="container-fluid bg-image">
      <div className="row">
        <div
          className="col bg-image login-mainCont"
          style={{ backgroundImage: `url(${AppImages.loginbg1})` }}
        >
          <div className="twofacCon">
            <div
              className="d-flex align-items-center flex-column"
              style={{ marginTop: "12px" }}
            >
              <img
                src={AppImages.successImage}
                style={{ height: 90, width: 85 }}
                alt="success-icon"
              />
              <div className="headingWithText">
                <H1
                  title={appConstants.titles.success}
                  titleStyl={{ marginBottom: 10, color: "blue" }}
                  subTitle={appConstants.accountCreatedMsg}
                />
              </div>
            </div>
            <a
              className="d-flex justify-content-center mt-5"
              style={{ marginBottom: "12px" }}
              href={
                AppRoutes.login +
                `?verify_otp=true&user_id=${params.get("user_id")}`
              }
            >
              <PrimaryButton title={appConstants.buttons.verify} />
            </a>
          </div>
        </div>
        <div
          className="col-12 col-lg-6 col-md col-sm-0 bg-image2"
          style={{ backgroundImage: `url(${AppImages.lockbg})` }}
        />
      </div>
    </div>
  );
};

export default AccountSuccess;
