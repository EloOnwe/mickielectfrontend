import React from "react";
import "../../src/styles/errorMessage.css";

const ErrorMessage = ({ message }) => {
  return (
    <div className="errorMessageBox">
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
