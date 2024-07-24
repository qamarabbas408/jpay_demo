import React from "react";
import useLocalizedConstants from "../../hooks/useLocalizedConstants";
import { useSelector } from "react-redux";
import { get } from "lodash";

export default function EmployeeBenifits() {
  const { analytics } = useSelector((state) => state.ReportsReducer);

  const appConstants = useLocalizedConstants();
  const records = [
    {
      benifit_ype: appConstants.pageTitles.pensions,
      total_ctr: get(analytics, "click_through_rate_count.pay_and_pension", 0),
      unique_ctr: get(
        analytics,
        "click_through_rate_unique_count.pay_and_pension",
        0
      ),
      staff_usage: get(
        analytics,
        "click_through_rate_staff_usage_percentage.pay_and_pension",
        0
      ),
    },
    {
      benifit_ype: appConstants.pageTitles.employeeSupport,
      total_ctr: get(analytics, "click_through_rate_count.employee_support", 0),
      unique_ctr: get(
        analytics,
        "click_through_rate_unique_count.employee_support",
        0
      ),
      staff_usage: get(
        analytics,
        "click_through_rate_staff_usage_percentage.employee_support",
        0
      ),
    },
    {
      benifit_ype: appConstants.pageTitles.twentyFourSevenGP,
      total_ctr: get(analytics, "click_through_rate_count.24_7_gp", 0),
      unique_ctr: get(analytics, "click_through_rate_unique_count.24_7_gp", 0),
      staff_usage: get(
        analytics,
        "click_through_rate_staff_usage_percentage.24_7_gp",
        0
      ),
    },
    {
      benifit_ype: appConstants.pageTitles.retailDiscounts,
      total_ctr: get(analytics, "click_through_rate_count.pay_and_pension", 0),
      unique_ctr: get(
        analytics,
        "click_through_rate_unique_count.pay_and_pension",
        0
      ),
      staff_usage: get(
        analytics,
        "click_through_rate_staff_usage_percentage.pay_and_pension",
        0
      ),
    },
    {
      benifit_ype: appConstants.pageTitles.healthAndWellbeing,
      total_ctr: get(
        analytics,
        "click_through_rate_count.health_and_wellbeing",
        0
      ),
      unique_ctr: get(
        analytics,
        "click_through_rate_unique_count.health_and_wellbeing",
        0
      ),
      staff_usage: get(
        analytics,
        "click_through_rate_staff_usage_percentage.health_and_wellbeing",
        0
      ),
    },
  ];

  return (
    <div className="col-xl-12">
      <div className="card border-0 shadow">
        <div className="card-body p-3">
          <div className="table-responsive active-projects manage-client ">
            <div className="mx-3 mt-3">
              <h4 className="heading mb-0 font-w700 ">
                {appConstants.allEmployees}
              </h4>
            </div>
            <div
              id="report-tblwrapper"
              className="dataTables_wrapper no-footer"
            >
              <table
                id="reports-tbl"
                className="table report-table  ItemsCheckboxSec dataTable no-footer mb-0"
              >
                <thead>
                  <tr>
                    <th className="col text-black-50 fw-bold fs-12 text-start">
                      {appConstants.titles.benifit_type}
                    </th>
                    <th className="col-3 text-black-50 fw-bold fs-12 text-start">
                      {appConstants.titles.total_ctr_click_through_rate}
                    </th>
                    <th className="col-3 text-black-50 fw-bold fs-12 text-start">
                      {appConstants.titles.unique_ctr}
                    </th>
                    <th className="col-3 text-black-50 fw-bold fs-12 text-start">
                      {appConstants.titles.staff_usage_overall}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((item, index) => (
                    <tr key={index}>
                      <td className="col">
                        <span className="text-black font-w600">
                          {item.benifit_ype}
                        </span>
                      </td>
                      <td className="col-3">
                        <span className="text-black font-w600">
                          {item.total_ctr}
                        </span>
                      </td>
                      <td className="col-3">
                        <span className="text-black font-w600">
                          {item.unique_ctr}
                        </span>
                      </td>
                      <td className="col-3 py-4">
                        <div>
                          <p
                            className="font-w600 mb-0 text-start"
                            style={{ color: "#4FD1C5" }}
                          >
                            {`${item.staff_usage}%`}
                          </p>
                          <div className="progress-box">
                            <div
                              className="progress"
                              style={{
                                backgroundColor: "lightgray",
                              }}
                            >
                              <div
                                className="progress-bar"
                                style={{
                                  width: `${item.staff_usage}%`,
                                  height: "5px",
                                  borderRadius: "4px",
                                  backgroundColor: "#4FD1C5",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
