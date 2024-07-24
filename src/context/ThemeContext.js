import React, { createContext, useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { get } from "lodash";
import AppUtilities from "../helpers/AppUtilities";

export const ThemeContext = createContext();
const reducer = (previousState, updatedState) => ({
  ...previousState,
  ...updatedState,
});

const initialState = {
  sideBarStyle: { value: "full", label: "Full" },
  sidebarposition: { value: "fixed", label: "Fixed" },
  sidebarLayout: { value: "vertical", label: "Vertical" },
  primaryColor: "color_1",
  containerPositionSize: { value: "wide-boxed", label: "Wide Boxed" },
  iconHover: false,
  menuToggle: false,
  windowWidth: 0,
  windowHeight: 0,
};

const ThemeContextProvider = (props) => {
  const { whiteLabelling } = useSelector((state) => state.WhiteLabelingReducer);

  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    sideBarStyle,
    sidebarposition,
    sidebarLayout,
    primaryColor,
    containerPositionSize,
    iconHover,
    menuToggle,
    windowWidth,
    windowHeight,
  } = state;

  useEffect(() => {
    handleWhiteLabeling();
  }, [whiteLabelling]);

  const handleWhiteLabeling = () => {
    if (document) {
      const root = document.documentElement;
      const priamryColor = root.style.getPropertyValue("--primary");
      const secondaryColor = root.style.getPropertyValue("--secondary");
      const backgroundColor = root.style.getPropertyValue("--bs-body-bg");
      const priamryBtnColor = root.style.getPropertyValue(
        "--primary-btn-color"
      );
      const authBtnColor = root.style.getPropertyValue(
        "--primary-auth-btn-color"
      );
      const secondaryBtnColor = root.style.getPropertyValue("--primary");

      const defaultAuthPrimaryColor = AppUtilities.hex2rgb(
        get(whiteLabelling, "auth_btn_colour", authBtnColor)
      );
      const defaultPrimaryColor = AppUtilities.hex2rgb(
        get(whiteLabelling, "primary_colour", priamryColor)
      );
      const defaultSecondaryColor = AppUtilities.hex2rgb(
        get(whiteLabelling, "secondary_colour", secondaryColor)
      );
      const defaultBackgroundColor = AppUtilities.hex2rgb(
        get(whiteLabelling, "background_color", backgroundColor)
      );
      const defaultPrimaryBtnColor = AppUtilities.hex2rgb(
        get(whiteLabelling, "primary_btn_colour", priamryBtnColor)
      );
      const defaultSecondaryBtnColor = AppUtilities.hex2rgb(
        get(whiteLabelling, "secondary_btn_colour", secondaryBtnColor)
      );

      root.style.setProperty(
        "--primary-auth-btn-color",
        AppUtilities.getRgbaWithAlpha(defaultAuthPrimaryColor)
      );
      root.style.setProperty(
        "--primary",
        AppUtilities.getRgbaWithAlpha(defaultPrimaryColor)
      );
      root.style.setProperty(
        "--secondary",
        AppUtilities.getRgbaWithAlpha(defaultSecondaryColor)
      );
      root.style.setProperty(
        "--bs-body-bg",
        AppUtilities.getRgbaWithAlpha(defaultBackgroundColor)
      );
      root.style.setProperty(
        "--primary-btn-color",
        AppUtilities.getRgbaWithAlpha(defaultPrimaryBtnColor)
      );
      root.style.setProperty(
        "--primary-btn-color",
        AppUtilities.getRgbaWithAlpha(defaultSecondaryBtnColor)
      );
    }
  };

  const body = document.querySelector("body");

  const openMenuToggle = () => {
    sideBarStyle.value === "overly"
      ? dispatch({ menuToggle: true })
      : dispatch({ menuToggle: false });
  };

  const changeBackground = (name) => {
    body.setAttribute("data-theme-version", name.value);
    dispatch({ background: name });
  };

  useEffect(() => {
    const body = document.querySelector("body");
    let resizeWindow = () => {
      dispatch({ windowWidth: window.innerWidth });
      dispatch({ windowHeight: window.innerHeight });
      window.innerWidth >= 768 && window.innerWidth < 1024
        ? body.setAttribute("data-sidebar-style", "mini")
        : window.innerWidth <= 768
        ? body.setAttribute("data-sidebar-style", "overlay")
        : body.setAttribute("data-sidebar-style", "full");
    };
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        body,
        sidebarposition,
        primaryColor,
        windowWidth,
        windowHeight,
        sideBarStyle,
        sidebarLayout,
        iconHover,
        menuToggle,
        openMenuToggle,
        changeBackground,

        containerPositionSize,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
