import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { Dropdown } from "react-bootstrap";
import { IMAGES, SVGICON } from "../theme";
import { get } from "lodash";
import {
  logoutRequest,
  getNotificationsRequest,
  readNotificationsRequest,
} from "../redux/reducers/AuthenticationReducer";
import AppLogger from "../helpers/AppLogger";
import AppImages from "../helpers/AppImages";
import AppRoutes from "../helpers/AppRoutes";
import useLocalizedConstants from "../hooks/useLocalizedConstants";
import AppUtilities from "../helpers/AppUtilities";
import AppConstants from "../helpers/AppConstants";

const Header = ({ onNote }) => {
  // Dispatchers
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Localization and Constants
  const appConstants = useLocalizedConstants();

  // Reducer States
  const { token, user, notifications, unreadCount } = useSelector(
    (state) => state.AuthenticationReducer
  );

  // Constants
  const notificationThreshold = 10;

  // Custom Hooks

  // Local States
  const [headerFix, setheaderFix] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setheaderFix(window.scrollY > 50);
    });
  }, []);

  useEffect(() => {
    // if (!user && !token) {
    //   navigate(AppRoutes.login);
    // } else {
    //   handleGetNotificationsRequest();
    // }
    handleGetNotificationsRequest();
  }, []);

  const handleDropdownItemClick = () => {
    setDropdownOpen(false);
  };

  const onLogout = () => {
    dispatch(logoutRequest({ token }))
      .then(unwrapResult)
      .then((res) => {
        navigate(AppRoutes.login);
        AppLogger("Response at logoutRequest", res);
      })
      .catch((err) => {
        AppLogger("Error at logoutRequest", err);
        AppUtilities.isSessionTimedOut(err, navigate, dispatch);
        navigate(AppRoutes.login);
      });
  };

  const handleGetNotificationsRequest = () => {
    dispatch(
      getNotificationsRequest({
        user_id: get(user, "company_user_id", ""),
        token,
      })
    )
      .then(unwrapResult)
      .then((res) => {
        AppLogger("Response at getNotificationsRequest", res);
      })
      .catch((err) => {
        AppLogger("Error at getNotificationsRequest", err);
      });
  };

  const handleReadNotificationsRequest = () => {
    dispatch(
      readNotificationsRequest({
        user_id: get(user, "company_user_id", ""),
        token,
      })
    )
      .then(unwrapResult)
      .then((res) => {
        AppLogger("Response at readNotificationsRequest", res);
        handleGetNotificationsRequest();
      })
      .catch((err) => {
        AppLogger("Error at readNotificationsRequest", err);
      });
  };

  return (
    <div className={`header ${headerFix ? "is-fixed" : ""}`}>
      <div className="header-content">
        <nav className="navbar navbar-expand">
          <div className="collapse navbar-collapse justify-content-between">
            <div className="header-left"></div>
            <ul className="navbar-nav header-right">
              <Dropdown
                as="li"
                className="nav-item dropdown notification_dropdown"
              >
                <Dropdown.Toggle
                  className="i-false c-pointer"
                  variant=""
                  as="a"
                >
                  <div
                    className="nav-link c-pointer d-flex"
                    onClick={() => handleReadNotificationsRequest()}
                  >
                    {unreadCount > 0 && (
                      <div
                        className="rounded-circle"
                        style={{
                          width: 8,
                          height: 8,
                          backgroundColor: "red",
                          marginRight: -4,
                        }}
                      />
                    )}
                    <img
                      src={AppImages.bell}
                      style={{ width: 20, height: 20 }}
                    />
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu
                  align="end"
                  className="mt-2 dropdown-menu dropdown-menu-end"
                >
                  {notifications && notifications.length > 0 ? (
                    <>
                      <div className="widget-media dz-scroll p-3 height380">
                        <ul className="timeline">
                          {notifications
                            .slice(0, notificationThreshold)
                            .map((notification, index) => {
                              const { created_at, data, read_at } =
                                notification;
                              const { description, title } = data;
                              return (
                                <li key={index}>
                                  <div className="timeline-panel">
                                    <div className="media-body">
                                      <h6 className="mb-1">{title}</h6>
                                      <p className="mb-1">{description}</p>
                                      <small className="d-block font-w700">
                                        {AppUtilities.formattedDate(
                                          created_at,
                                          AppConstants.dateTimeFormat
                                        )}
                                      </small>
                                    </div>
                                    {!read_at && (
                                      <div
                                        className="rounded-circle "
                                        style={{
                                          width: 8,
                                          height: 8,
                                          backgroundColor: "red",
                                        }}
                                      />
                                    )}
                                  </div>
                                </li>
                              );
                            })}
                        </ul>
                      </div>
                      {notifications.length > notificationThreshold && (
                        <Link
                          to={`${AppRoutes.dashboard}#notifications`}
                          className="all-notification font-w700"
                        >
                          {appConstants.allNotifications}
                          <i className="ti-arrow-right" />
                        </Link>
                      )}
                    </>
                  ) : (
                    <div className="all-notification">
                      <h6 className="mb-1 text-center">
                        {appConstants.noNotifications}
                      </h6>
                    </div>
                  )}
                </Dropdown.Menu>
              </Dropdown>

              <li className="nav-item ps-3">
                <Dropdown
                  className="header-profile2"
                  show={dropdownOpen}
                  onToggle={(isOpen) => setDropdownOpen(isOpen)}
                >
                  <Dropdown.Toggle
                    className="nav-link i-false c-pointer"
                    as="div"
                  >
                    <img
                      src={IMAGES.SampleAvatar}
                      style={{ width: 20, height: 20 }}
                    />
                  </Dropdown.Toggle>
                  <Dropdown.Menu align="end">
                    <div className="card border-0 mb-0">
                      <div className="card-header py-2">
                        <div className="products">
                          <img
                            src={IMAGES.SampleAvatar}
                            className="avatar avatar-md"
                            alt=""
                          />
                          <div>
                            <h6>{get(user, "full_name", "")}</h6>
                          </div>
                        </div>
                      </div>
                      <div className="card-body px-0 py-2">
                        <Link
                          onClick={handleDropdownItemClick}
                          to={
                            AppRoutes.profile +
                            `?user_id=${get(user, "company_user_id", "")}`
                          }
                          className="dropdown-item ai-icon "
                        >
                          {SVGICON.Profile}
                          <span className="ms-2">
                            {appConstants.pageTitles.profile}
                          </span>
                        </Link>
                      </div>
                      <div className="card-footer px-0 py-2">
                        <button
                          className="dropdown-item ai-icon ms-1 logout-btn"
                          onClick={onLogout}
                        >
                          {SVGICON.Logout}
                          <span className="ms-2">
                            {appConstants.buttons.logout}
                          </span>
                        </button>
                      </div>
                    </div>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
