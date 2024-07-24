import React from "react";
import PropTypes from "prop-types";

function CardSubHeading(props) {
  const { text, styles } = props;
  const style = styles ? styles : "";
  return <h3 className={style}>{text}</h3>;
}

CardSubHeading.propTypes = {
  text: PropTypes.string,
  styles: PropTypes.string,
};

export default CardSubHeading;
