import React from "react";
import PropTypes from "prop-types";

function InteractiveSection({
  title,
  subtitle,
  description,
  onClick,
  dateRequired,
}) {
  return (
    <div className="interactive-section ">
      <h3 className="interactive-section-title">{title}</h3>
      <div
        className="interactive-section-box mt-3 cursor-pointer"
        onClick={onClick}
      >
        <h4 className="interactive-section-subtitle pt-3">{subtitle}</h4>
        <p className="interactive-section-description">{description}</p>
      </div>
    </div>
  );
}

InteractiveSection.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  description: PropTypes.string,
};

export default InteractiveSection;
