import React from "react";
import PropTypes from "prop-types";
import "../style.css";

function GreetingMessagebox(props) {
  const { message } = props;
  return (
    <div className="greeting-message-box-card greeting">
      <div className="card-body p-50 greeting-message-box">{message}</div>
    </div>
  );
}

GreetingMessagebox.propTypes = {
  user: PropTypes.string,
};
export default GreetingMessagebox;
