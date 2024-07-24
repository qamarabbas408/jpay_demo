import React from "react";
import { useSelector } from "react-redux";
import { SVGICON } from "../../theme";
import { get } from "lodash";
import useLocalizedConstants from "../../hooks/useLocalizedConstants";
// import { Dropdown, Space } from 'antd';
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import Dropdown from "react-bootstrap/Dropdown";

const CardWidget = ({ loggedInUsers = [], loggedOutUsers = [] }) => {
  // console.log("loggedInUsers ==== ", loggedInUsers);

  // console.log(
  //   "object of objects into array of objects ==== ",
  //   Object.keys(loggedInUsers).map((key) => {
  //     return loggedInUsers[key];
  //   })
  // );

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <div
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </div>
  ));

  const userList = [
    {
      username: "user1",
      logged_in: true,
    },
    {
      username: "user1",
      logged_in: true,
    },
    {
      username: "user1",
      logged_in: false,
    },
    {
      username: "user1",
      logged_in: false,
    },
    {
      username: "user1",
      logged_in: false,
    },
    {
      username: "user1",
      logged_in: true,
    },
    {
      username: "user1",
      logged_in: true,
    },
    {
      username: "user1",
      logged_in: false,
    },
  ];

  const { analytics } = useSelector((state) => state.ReportsReducer);
  const increase_unique_login = get(analytics, "increase_unique_login", false);
  const increase_total_login = get(analytics, "increase_unique_login", false);
  const appConstants = useLocalizedConstants();
  return (
    <>
      <div className="col-xl-4 col-sm-6 same-card">
        {/* <Dropdown menu={{ items }} trigger={['click']} overlayClassName="userlist-dropdown"> */}
        <div className="card rounded-4 border-0">
          <div
            className="card-body depostit-card rounded-4 border-0 shadow-sm"
            style={{ background: "white" }}
            onClick={(e) => e.preventDefault()}
          >
            <Dropdown>
              <Dropdown.Toggle
                id="dropdown-autoclose-true"
                className="w-100"
                as={CustomToggle}
              >
                <p className="text-center">{appConstants.titles.uniqueLogin}</p>
                <div className="depostit-card-media d-flex justify-content-between style-1">
                  <div>
                    <h3>{get(analytics, "unique_login", "")}</h3>
                    <p className="mb-0">
                      {get(analytics, "unique_login_percentage", "") + "%"}
                    </p>
                  </div>
                  <div>
                    {increase_unique_login
                      ? SVGICON.GreenBGUpArrow
                      : SVGICON.RedBgArrowUp}
                  </div>
                </div>
                <div className="progress-box mt-0 mb-2 mt-3">
                  <div
                    className="progress"
                    style={{
                      backgroundColor: increase_unique_login
                        ? "rgba(26, 160, 63, 0.2)"
                        : "rgba(192, 50, 33, 0.2)",
                    }}
                  >
                    <div
                      className="progress-bar"
                      style={{
                        width: `${get(
                          analytics,
                          "unique_login_percentage",
                          ""
                        )}%`,
                        height: "5px",
                        borderRadius: "4px",
                        backgroundColor: increase_unique_login
                          ? "#17904B"
                          : "#C03221",
                      }}
                    />
                  </div>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu
                className="w-100 userList"
                as="ul"
                style={{
                  maxHeight: "320px",
                  overflow: "scroll",
                  // position: "absolute",
                  // zIndex: 999,
                }}
              >
                {loggedInUsers.length > 0 &&
                  loggedInUsers.map((user, index) => (
                    <UserLogsDropDownList
                      index={index}
                      full_name={get(user, "full_name", "")}
                      logged_in={true}
                    />
                  ))}
                {loggedOutUsers.length > 0 &&
                  loggedOutUsers.map((user, index) => (
                    <UserLogsDropDownList
                      index={index}
                      full_name={get(user, "full_name", "")}
                      logged_in={false}
                    />
                  ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        {/* </Dropdown> */}
      </div>
      <div className="col-xl-4 col-sm-6 same-card">
        <div className="card rounded-4 border-0">
          <div className="card-body depostit-card rounded-4 border-0 shadow-sm">
            <p className="text-center">
              {appConstants.titles.totalPortalLogin}
            </p>
            <div className="depostit-card-media d-flex justify-content-between style-1">
              <div>
                <h3>{get(analytics, "total_login", "")}</h3>
                <p className="mb-0">
                  {get(analytics, "total_login_percentage", "") + "%"}
                </p>
              </div>
              <div>
                {increase_total_login
                  ? SVGICON.BlueBGUpArrow
                  : SVGICON.RedBgArrowUp}
              </div>
            </div>
            <div className="progress-box mt-0 mb-2 mt-3">
              <div
                className="progress"
                style={{
                  backgroundColor: increase_total_login
                    ? "rgba(7, 154, 162, 0.2)"
                    : "rgba(192, 50, 33, 0.2)",
                }}
              >
                <div
                  className="progress-bar "
                  style={{
                    width: `${get(analytics, "total_login_percentage", "")}%`,
                    height: "5px",
                    borderRadius: "4px",
                    backgroundColor: increase_total_login
                      ? "#068B92"
                      : "#C03221",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const UserLogsDropDownList = ({
  index = 0,
  full_name = "",
  logged_in = false,
}) => {
  return (
    <Dropdown.Item key={index} as={"li"}>
      <div className="d-flex flex-row justify-content-between ">
        <span>{full_name}</span>
        {logged_in ? (
          <span className="ml-2 float-end" style={{ color: "green" }}>
            <CheckOutlined />
          </span>
        ) : (
          <span className="ml-2 float-end" style={{ color: "red" }}>
            <CloseOutlined />
          </span>
        )}
      </div>
    </Dropdown.Item>
  );
};

export default CardWidget;
