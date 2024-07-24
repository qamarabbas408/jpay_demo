import React from "react";
import { Button } from "react-bootstrap";
import "./style.css";

export const PrimaryButton = ({
  title = "",
  addCss = "",
  onClick = () => {},
  isDisabled = false,
}) => {
  return (
    <button
      disabled={isDisabled}
      style={{ backgroundColor: isDisabled ? "lightgray" : "" }}
      className={`primary-btn-cont primary-btn-text  ${addCss}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export const SecondaryButton = ({
  title = "",
  addCss = "",
  onClick = () => {},
}) => {
  return (
    <Button
      variant="outline-light text-black fs-16"
      className={`seconday-btn-cont seconday-btn-text ${addCss}`}
      onClick={onClick}
    >
      {title}
    </Button>
  );
};
