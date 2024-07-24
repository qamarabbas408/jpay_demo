import React from "react";
import PropTypes from "prop-types";

function ContactDetailsPhoneInfo({
  title = "",
  value = "",
  onChange = () => { },
  isUpdating = false,
  icon = true,
  inputStyle = {},
  disabled = false,
}) {
  return (
    <div className="d-flex flex-row justify-content-between align-items-center">
      <div className="col-5 col-sm-3 d-flex">
        <i class={`${icon ? "fa fa-phone" : "fa fa-house p-3"} p-3`} />
        <span className=" d-flex align-items-center"> {title} </span>
      </div>
      <input
        className={`col-7  ${isUpdating ? "inputField" : "border-0"}`}
        style={{ width: 170, ...inputStyle }}
        onChange={onChange}
        value={value}
        disabled={disabled}
      />
    </div>
  );
}

ContactDetailsPhoneInfo.propTypes = {
  title: PropTypes.string,
  phone: PropTypes.string,
};

export default ContactDetailsPhoneInfo;
