import React from "react";
import "../../src/styles/Message.css";

const ErrorMessage = ({ message }) => {
  return (
    <div className="errorMessageBox">
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
