import React from "react";

export default function PayslipCSVErrorListComp({ uploadError = null }) {
  return (
    uploadError != null &&
    Array.isArray(uploadError) &&
    uploadError.map((item, index) => (
      <div>
        <p className="py-0 mb-1 fs-5 " key={index}>
          &#9737; Error in {Object.keys(item)[0]}
          <span className="fw-bold">{item.row}</span>
        </p>
        <ul>
          {item.error.map((error, index) => (
            <li className="text-danger fs-6" key={index}>
              &nbsp; &nbsp; {error}
            </li>
          ))}
        </ul>
      </div>
    ))
  );
}
