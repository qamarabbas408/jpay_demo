import React from "react";
import AppImages from "../helpers/AppImages";

export default function BackButton({ navigate }) {
  return (
    <button onClick={() => navigate(-1)} className="back-btn">
      <img src={AppImages.backIcon} className="icon" />
    </button>
  );
}
