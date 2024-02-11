import React from "react";
import OtpInput from "react-otp-input";

import style from "./style.module.scss";

const InputOTP = ({
  numInputs = 6,
  value = "",
  title,
  onChange,
  hideLabel = false,
}) => {
  return (
    <div className={style["otp-input-container"]}>
      {!hideLabel && <label>{title}</label>}
      <OtpInput
        className={style["otp-input"]}
        containerStyle={{ justifyContent: "center" }}
        value={value}
        onChange={onChange}
        numInputs={numInputs}
        isInputNum={true}
        separator={<span className="text-dark fs-4">-</span>}
      />
    </div>
  );
};

export default InputOTP;
