import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import APIConstants from "../../helpers/APIConstants";
import useLocalizedConstants from "../../hooks/useLocalizedConstants";
export default function BottomButtons({
  title,
  color,
  href,
  vivupLink,
  samlReponse,
  isArchive,
}) {
  const appConstants = useLocalizedConstants();

  return vivupLink && !isArchive ? (
    samlReponse && (
      <form target="_blank" method="post" action={APIConstants.vivupACSURL}>
        <input type="hidden" name="SAMLResponse" value={samlReponse} />
        <input type="hidden" name="RelayState" value={href} />
        <input
          style={{ background: `${color}` }}
          className="bottom-buttons bottom-button-title"
          type="submit"
          value={title}
        />
      </form>
    )
  ) : (
    <>
      {!isArchive && (
        <Link
          hidden={title == appConstants.pageTitles.pensions && !href}
          target={title == "Payslip" ? "_self" : "_blank"}
          to={href}
          className="bottom-buttons"
          style={{ background: `${color}` }}
        >
          <p className="m-0 bottom-button-title">{title}</p>
        </Link>
      )}
    </>
  );
}

BottomButtons.propTypes = {
  title: PropTypes.string,
  color: PropTypes.string,
};
