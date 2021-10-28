import React, { forwardRef } from "react";
import "./Button.css";

const Button = forwardRef((props, ref) => {
  const { className, buttonName, handleClick, type } = props;

  return (
    <button type={type} className={`${className || ""} button`} onClick={handleClick}>
      {buttonName || ""}
    </button>
  );
});

export default Button;
