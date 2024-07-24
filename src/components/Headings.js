import React from "react";
import "./style.css";

export default function H1({
  title = "",
  addCss = "",
  subTitle = "",
  span = "",
  titleStyl = {},
}) {
  return (
    <div className={`text-center ${addCss}`}>
      <h3 className="headings" style={titleStyl}>
        {title}
      </h3>
      {subTitle && (
        <p className="mt-2 txtInp-title">
          {subTitle}
          {span && <span>{span}</span>}
        </p>
      )}
    </div>
  );
}
