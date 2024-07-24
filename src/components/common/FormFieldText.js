import React from "react";
import useLocalizedConstants from "../../hooks/useLocalizedConstants";
function FormFieldText({
  title = "",
  placeholder = "",
  isRequired = false,
  customClass = "",
  onChange = () => { },
  value = "",
  name = "",
  disabled = false,
}) {
  const appConstants = useLocalizedConstants()
  return (
    <div className={`form-group ${customClass}`}>
      {isRequired ? (
        <label
          className="text-secondary mb-0"
          title="Required"
          style={{ fontSize: 12 }}
        >
          {title}
          <span className="text-danger"> {appConstants.titles.asterisk}</span>
        </label>
      ) : (
        <label
          className="text-secondary text-sm  mb-0"
          style={{ fontSize: 12 }}
        >
          {title}
        </label>
      )}

      <input
        type="text"
        className="form-control p-0 border-0 border-bottom border-black rounded-0"
        placeholder={placeholder}
        required={isRequired}
        onChange={onChange}
        value={value}
        name={name}
        disabled={disabled}
      />
    </div>
  );
}

export default FormFieldText;
