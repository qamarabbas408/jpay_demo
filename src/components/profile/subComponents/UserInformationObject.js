import React from "react";
import PropTypes from "prop-types";

function UserInformationObject({
  icon = "",
  title = "",
  onChange = () => {},
  value = "",
  inputStyle = {},
  isUpdating = false,
}) {
  return (
    <div class="d-flex align-items-center ">
      <img style={{ width: 24, height: 24 }} src={icon} />

      <div className="d-flex flex-column ml-2">
        <span className="d-flex align-items-center">{title}</span>
        <input
          style={{ ...inputStyle }}
          className={`${isUpdating ? "inputField" : "border-0"}`}
          onChange={onChange}
          value={value}
          disabled={!isUpdating}
          maxLength={48}
        />
      </div>
    </div>
  );
}

UserInformationObject.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  detail: PropTypes.string,
};

export default UserInformationObject;
