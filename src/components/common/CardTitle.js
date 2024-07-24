import React from "react";
import PropTypes from "prop-types";

function CardTitle(props) {
  const { text, styles } = props;
  const style = styles ? styles : "text-center mt-2";
  return <h2 className={style}>{text}</h2>;
}

CardTitle.propTypes = {
  text: PropTypes.string,
  styles: PropTypes.string,
};

export default CardTitle;
