import React from "react";
import PropTypes from "prop-types";

function ListItem(props) {

  const { styles, fillColor, text } = props;

  const classNames = `mb-0 ${styles}`;

  return (

      <p className={classNames}>
        <svg
          class="me-2"
          width="12"
          height="13"
          viewBox="0 0 12 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect y="0.5" width="12" height="12" rx="10" fill={fillColor}></rect>
        </svg>{" "}
        {text}
      </p>

  );
}

ListItem.propTypes = {
  styles: PropTypes.string,
  fillColor: PropTypes.string,
  text: PropTypes.string,
};

export default ListItem;
