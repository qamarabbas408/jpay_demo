import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SVGICON } from "../theme";
import { get } from "lodash";
import { toggleMenu } from "../redux/reducers/AuthenticationReducer";
import AppRoutes from "../helpers/AppRoutes";
import AppImages from "../helpers/AppImages";

const NavHeader = () => {
  const dispatch = useDispatch();

  const { toggle } = useSelector((state) => state.AuthenticationReducer);
  const { whiteLabelling } = useSelector((state) => state.WhiteLabelingReducer);

  const handleToogle = () => {
    dispatch(toggleMenu(!toggle));
  };
  const companyLogo = get(whiteLabelling, "company.company_logo_url", "");

  return (
    <div className="nav-header d-flex">
      <a href={AppRoutes.dashboard}>
        <img
          className="brand-logo"
          src={companyLogo ? companyLogo : AppImages.logo}
        />
      </a>
      <div
        className="nav-control"
        style={{ backgroundColor: "var(--primary-btn-color)", color: "black" }}
        onClick={() => {
          handleToogle();
        }}
      >
        <div className={`hamburger ${toggle ? "is-active" : ""}`}>
          <span className="line bg-white"></span>
          <span className="line bg-white"></span>
          <span className="line bg-white"></span>
        </div>
      </div>
    </div>
  );
};

export default NavHeader;
