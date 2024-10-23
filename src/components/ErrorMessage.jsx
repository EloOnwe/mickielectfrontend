import React from "react";
import "../styles/errorMessage.css";

const ErrorMessage = ({ message }) => {
  return (
    <div className="errorMessageBox">
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
