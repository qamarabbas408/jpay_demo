import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import { changeAppLanguage } from "../redux/reducers/LanguageReducer";
import { get } from "lodash";
import RoutesList from "./Routes";
import Navigation from "../layouts/Navigation";
import ScrollToTop from "../layouts/ScrollToTop";
import AppLanguages from "../helpers/AppLanguages";
import Login from "../pages/authentication/Login";
import SignUp from "../pages/authentication/SignUp";
import PageNotFound from "../pages/pageNotFound/PageNotFound";
import AdminNotFound from "../pages/pageNotFound/AdminNotFound";
import ForgotPassword from "../pages/authentication/ForgotPassword";
import ChangePassword from "../pages/authentication/ChangePassword";
import AccountSuccess from "../pages/authentication/AccountSuccess";
import AppRoutes from "../helpers/AppRoutes";
import AppSpinner from "../components/AppSpinner";
import "../step.css";
import "../index.css";
import Services from "../pages/services/Services";
import Vivup from "../components/services/Vivup";

export default function AppRouters() {
  const { i18n } = useTranslation();

  const dispatch = useDispatch();

  const searchParams = new URLSearchParams(window.location.search);
  const lang = searchParams.get("lang");

  const { whiteLabelling } = useSelector((state) => state.WhiteLabelingReducer);
  const { lng } = useSelector((state) => state.LanguageReducer);
  const { user } = useSelector((state) => state.AuthenticationReducer);
  const attributes = { lang: lng, dir: i18n.dir() };
  const isArchive = get(user, "is_archive", "");
  useEffect(() => {
    i18n.changeLanguage(lang ?? AppLanguages.english);
    dispatch(changeAppLanguage(lang ?? AppLanguages.english));
  }, [lang]);

  const NotFound = () => {
    const url = RoutesList.map((route) => route.path);
    let path = window.location.pathname;
    path = path.split("/");
    path = path[path.length - 1];

    if (url.indexOf(path) <= 0) {
      return <PageNotFound />;
    }
  };

  return (
    <HelmetProvider
      htmlAttributes={attributes}
      title={get(whiteLabelling, "company.name", "")}
    >
      <AppSpinner />
      <BrowserRouter basename="/">
        <Routes>
          <Route path={AppRoutes.main} element={<Login />} />
          <Route path={AppRoutes.login} element={<Login />} />
          {/* <Route path={AppRoutes.signUp} element={<SignUp />} /> */}
          <Route path={AppRoutes.forgotPassword} element={<ForgotPassword />} />
          <Route path={AppRoutes.changePassword} element={<ChangePassword />} />
          <Route path={AppRoutes.accountSuccess} element={<AccountSuccess />} />
          <Route path={AppRoutes.notFound} element={<NotFound />} />
          <Route element={<MainLayout />}>
            {RoutesList.map((route, index) => {
              const { path, component } = route;

              return (
                <Route key={index} path={path} index element={component} />
              );
            })}
            {isArchive == 0 && (
              <Route path={AppRoutes.services} index element={<Services />} />
            )}
            {isArchive == 0 && (
              <Route path={AppRoutes.vivup} index element={<Vivup />} />
            )}
          </Route>
        </Routes>
        <ScrollToTop />
      </BrowserRouter>
    </HelmetProvider>
  );
}

function MainLayout() {
  const { toggle } = useSelector((state) => state.AuthenticationReducer);

  return (
    <div id="main-wrapper" className={`show ${toggle ? "menu-toggle" : ""}`}>
      <Navigation />
      <div
        className="content-body"
        // style={{ minHeight: window.screen.height - 45 }}
        style={{ minHeight: 940 }}
      >
        <Outlet />
      </div>
    </div>
  );
}
