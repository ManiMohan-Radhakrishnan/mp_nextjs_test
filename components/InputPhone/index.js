import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";

import style from "./style.module.scss";

const InputPhone = ({
  defaultCountry = "in",
  onChange = () => {},
  value,
  required = false,
  className = "",
  onEnterKeyPress = () => {},
  title,
}) => {
  let classInput = "w-100";
  classInput += className;
  classInput += required ? " border-danger" : "";

  return (
    <>
      <label className={style["input-title"]}>
        {title}
        {required && (
          <small className={`${style["error-text"]} mx-2`}>(Required)</small>
        )}
      </label>
      <PhoneInput
        country={defaultCountry}
        onEnterKeyPress={onEnterKeyPress}
        value={value}
        onChange={onChange}
        inputClass={classInput}
      />
    </>
  );
};

export default InputPhone;
