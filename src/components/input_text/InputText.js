import React, { useState, forwardRef } from "react";
import "./InputText.css";

const InputText = forwardRef((props, ref) => {
  const {
    className,
    type,
    label,
    name,
    placeholder,
    handleError,
    handleInputChanging,
  } = props;

  const [error, setError] = useState("");
  const [value, setValue] = useState("");

  const handleInputValue = (e) => {
    if (handleError) {
      setError(handleError(e.target.value));
    }
    setValue(e.target.value);
  };

  return (
    <div className={`${className || ""} input-field`}>
      {label && <div className="input-label">{label}</div>}
      <input
        spellCheck="false"
        className={`input-value`}
        name={name || ""}
        type={type || "text"}
        placeholder={placeholder || ""}
        onChange={(e) => {
          handleInputValue(e);
          if (handleInputChanging) {
            handleInputChanging(e);
          }
        }}
        value={value}
        ref={ref}
      />
      <div className="error-field">{error}</div>
    </div>
  );
});

export default InputText;
