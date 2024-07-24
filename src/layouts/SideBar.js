import React, { useEffect, useContext, useReducer, useState } from "react";
import { get } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link, useLocation } from "react-router-dom";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { ThemeContext } from "../context/ThemeContext";
import { toggleMenu } from "../redux/reducers/AuthenticationReducer";
import Collapse from "react-bootstrap/Collapse";
import useLocalizedMenuList from "../hooks/useLocalizedMenuList";
import useLocalizedConstants from "../hooks/useLocalizedConstants";
import "./style.css";

const reducer = (previousState, updatedState) => ({
  ...previousState,
  ...updatedState,
});

const initialState = {
  active: "",
  activeSubmenu: "",
};

const SideBar = () => {
  const { iconHover, sidebarposition, headerposition, sidebarLayout } =
    useContext(ThemeContext);

  // Reducers
  const dispatch = useDispatch();
  const { toggle } = useSelector((state) => state.AuthenticationReducer);
  // navigation
  const navigate = useNavigate();

  const location = useLocation();
  const menuList = useLocalizedMenuList();
  const appConstants = useLocalizedConstants()
  //Local States
  const [state, setState] = useReducer(reducer, initialState);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
  });
  const [hideOnScroll, setHideOnScroll] = useState(true);
  const [selectedSubItem, setSelectedSubItem] = useState(null);

  useEffect(() => {
    /// Path
    let path = location.pathname;
    path = path.split("/");
    // path = path[1];
    setState({
      active: get(path, "[1]", ""),
      activeSubmenu: get(path, "[2]", ""),
    });
  }, [location]);

  // Width event listerns
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //For scroll
  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isShow = currPos.y > prevPos.y;
      if (isShow !== hideOnScroll) setHideOnScroll(isShow);
    },
    [hideOnScroll]
  );

  const handleMenuActive = (menuItem) => {

    const { title, content, to } = menuItem;
    if (!(title === "Employees" || title === "Services")) {
      if (windowSize.width < 768) {
        handleToogle();
      }
    }
    if (content && content.length > 0) {
      if (title == appConstants.pageTitles.employees) {
        setSelectedSubItem(0)
        navigate(get(content, "[0].to", ""));
      } else {
        setSelectedSubItem(null)
      }

      setState({
        active: title,
        activeSubmenu: get(content, "[0].title", ""),
      });

    } else {
      setSelectedSubItem(null);
      setState({ active: title, activeSubmenu: "" });
      if (state.active.toLowerCase() === title.toLowerCase()) {
        setState({ active: "" });
      }
    }
  };

  // Handle sub items
  const handleSubItemClick = (index) => {

    if (windowSize.width < 768) {
      handleToogle();
    }
    setSelectedSubItem(index);
  };

  const handleToogle = () => {
    dispatch(toggleMenu(!toggle));
  };

  return (
    <div
      className={`deznav  border-right ${iconHover} ${sidebarposition.value === "fixed" &&
        sidebarLayout.value === "horizontal" &&
        headerposition.value === "static"
        ? hideOnScroll > 120
          ? "fixed"
          : ""
        : ""
        }`}
    >
      <div className="deznav-scroll" style={{ height: "90%" }}>
        <ul className="metismenu" id="menu">
          {menuList.map((data, index) => {
            let menuClass = data.classsChange;
            if (data.isAuthorized) {
              if (menuClass === "menu-title") {
                return (
                  <li className={`${menuClass}`} key={index}>
                    {data.title}
                  </li>
                );
              } else {
                return (
                  <li
                    className={`${state.active.toLowerCase() === data.title.toLowerCase()
                      ? "mm-active"
                      : ""
                      }`}
                    key={index}
                  >
                    {data.content && data.content.length > 0 ? (
                      <>
                        <a
                          className="has-arrow pointer"
                          onClick={() => {
                            handleMenuActive(data);
                            // navigate(data.to);
                          }}
                        >
                          <div className="menu-icon">{data.iconStyle}</div>{" "}
                          <span className="nav-text">
                            {data.title}
                            {data.update && data.update.length > 0 ? (
                              <span className="badge badge-xs badge-danger ms-2">
                                {data.update}
                              </span>
                            ) : (
                              ""
                            )}
                          </span>
                        </a>
                        <Collapse
                          in={
                            state.active.toLowerCase() ===
                              data.title.toLowerCase()
                              ? true
                              : false
                          }
                        >
                          <ul
                            className={`${menuClass === "mm-collapse" ? "mm-show" : ""
                              }`}
                          >
                            {data.content &&
                              data.content.map((data, index) => {
                                return (
                                  <li
                                    key={index}
                                    className={`${state.activeSubmenu.toLowerCase() ===
                                      data.title.toLowerCase()
                                      ? "mm-active"
                                      : ""
                                      }`}
                                  >
                                    <Link
                                      hidden={data.title == appConstants.pageTitles.pensions && !data.to}
                                      style={{
                                        backgroundColor:
                                          selectedSubItem === index
                                            ? "#E0E0E0"
                                            : "white",
                                      }}
                                      onClick={() => handleSubItemClick(index)}
                                      to={data.to}
                                      target={data.title == appConstants.pageTitles.pensions ? "_blank" : "_self"}
                                    >
                                      {data.title}
                                    </Link>
                                  </li>
                                );
                              })}
                          </ul>
                        </Collapse>
                      </>
                    ) : (
                      <Link
                        style={{
                          backgroundColor:
                            state.active.toLowerCase() ===
                              data.title.toLowerCase()
                              ? "#E0E0E0"
                              : "white",
                        }}
                        onClick={() => handleMenuActive(data)}
                        key={index}
                        to={data.to}
                      >
                        <div className="menu-icon">{data.iconStyle}</div>{" "}
                        <span className="nav-text">{data.title}</span>
                        {data.update && data.update.length > 0 ? (
                          <span className="badge badge-xs badge-danger ms-2">
                            {data.update}
                          </span>
                        ) : (
                          ""
                        )}
                      </Link>
                    )}
                  </li>
                );
              }
            }
          })}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
