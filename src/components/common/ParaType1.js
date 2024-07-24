import React from "react";
import PropTypes from "prop-types";

function ParaType1(props) {
  const { text, styles } = props;

  return <p className={styles}>{text}</p>;
}

ParaType1.propTypes = {
  text: PropTypes.string,
};

export default ParaType1;
