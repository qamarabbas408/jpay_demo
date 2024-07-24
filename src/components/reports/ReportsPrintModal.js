import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Modal } from "antd";
import { get } from "lodash";
import { useReactToPrint } from "react-to-print";
import { showFaliureToast } from "../../helpers/AppToasts";
import Reports from "../../pages/reports/Reports";
import AppImages from "../../helpers/AppImages";
import useLocalizedConstants from "../../hooks/useLocalizedConstants";
import moment from "moment";
import AppConstants from "../../helpers/AppConstants";

function ReportsPrintModal({ showModal, setShowModal }) {
  // Ref
  const componentRef = useRef();

  const { whiteLabelling } = useSelector((state) => state.WhiteLabelingReducer);
  const { analytics } = useSelector((state) => state.ReportsReducer);

  const companyLogo = get(whiteLabelling, "company.company_logo_url", "");

  // Localization and Constants
  const appConstants = useLocalizedConstants();

  const handleExport = useReactToPrint({
    content: () => componentRef.current,
    copyStyles: true,
    onAfterPrint: () => setShowModal(false),
    onPrintError: (error) =>
      showFaliureToast(
        get(error, "message", "Could not complete te operation")
      ),
  });

  useEffect(() => {
    if (showModal) {
      setTimeout(() => {
        handleExport();
      }, 1000);
    }
  }, [showModal]);

  return (
    <Modal
      centered={true}
      width={"75%"}
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
      <div ref={componentRef}>
        <div className="p-3">
          <div className="container-fluid mb-3">
            <img
              className="reports-logo"
              src={companyLogo ? companyLogo : AppImages.logo}
            />
          </div>
          <Reports exportAllowed={false} />
          <div className="container-fluid">
            <div>
              <h4 className="heading mb-0 font-w700 ">{appConstants.titles.dateGenerated} </h4>
              <p className="text-black-50 fw-bold fs-14 text-start">
                {moment().format(AppConstants.dateTimeFormat)}
              </p>
            </div>
            <div>
              <h4 className="heading mb-0 font-w700 ">{appConstants.titles.Period} </h4>
              <p className="text-black-50 fw-bold fs-14 text-start">
                {`${moment(get(analytics, "start_date", "")).format(
                  AppConstants.dateTimeFormat
                )} - ${moment(get(analytics, "end_date", "")).format(
                  AppConstants.dateTimeFormat
                )}`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ReportsPrintModal;
