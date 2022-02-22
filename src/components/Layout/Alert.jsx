import React from "react";
import "./Layout.css";

const Alert = ({ validationMessage }) => {
  return (
    <div className="alert">
      <ul>
        {validationMessage.map((ele, idx) => (
          <li key={idx}>{ele}</li>
        ))}
      </ul>
    </div>
  );
};

export default Alert;
