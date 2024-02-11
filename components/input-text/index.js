import { useId, useState } from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import style from "./style.module.scss";

const InputText = ({
  tooltip,
  title,
  name = "",
  type = "text",
  className = "",
  grpClassName = "",
  required = false,
  strictLength = false,
  boxRequired = false,
  requiredBottom = false,
  restrictChar = false,
  scrollIncrese = false,
  placeholder = " ",
  onChange = () => {},
  value,
  isPop = false,
  lengthValue = 100,
  popText,
  error,
  errorMessage,
  ...props
}) => {
  const x = useId();
  const [showPassword, setShowPassword] = useState(false);
  const popover = (
    <Popover>
      <Popover.Body>
        <p className="password-terms">{popText}</p>
      </Popover.Body>
    </Popover>
  );
  return (
    <>
      <div className={`${style["input-field"]} ${grpClassName}`}>
        <label htmlFor={`floatingInput${x}`} className={style["input-title"]}>
          {title} {tooltip && tooltip}{" "}
          {!error && !requiredBottom && required && (
            <small className={`text-danger`}>(Required)</small>
          )}
        </label>{" "}
        <div className={style["input-box"]}>
          {isPop ? (
            <OverlayTrigger trigger="focus" placement="top" overlay={popover}>
              <input
                {...props}
                id={`floatingInput${x}`}
                type={showPassword ? "text" : type}
                name={name}
                className={`form-control ${
                  (required || boxRequired || error) && "border-danger"
                }
            ${className}`}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                maxLength={strictLength ? "10" : lengthValue}
                onKeyDown={(e) => {
                  if (restrictChar) {
                    blockInvalidChar(e);
                  }
                }}
                autoComplete="off"
                onWheel={(event) => {
                  if (scrollIncrese) {
                    event.currentTarget.blur();
                  }
                }}
              />
            </OverlayTrigger>
          ) : (
            <input
              {...props}
              id={`floatingInput${x}`}
              type={showPassword ? "text" : type}
              name={name}
              className={`form-control ${
                (required || boxRequired || error) && "border-danger"
              }
            ${className}`}
              placeholder={placeholder}
              onChange={onChange}
              value={value}
              maxLength={strictLength ? "10" : lengthValue}
              onKeyDown={(e) => {
                if (restrictChar) {
                  blockInvalidChar(e);
                }
              }}
              autoComplete="off"
              onWheel={(event) => {
                if (scrollIncrese) {
                  event.currentTarget.blur();
                }
              }}
            />
          )}
          {type === "password" &&
            (!showPassword ? (
              <FaEye
                role="button"
                onClick={() => setShowPassword(!showPassword)}
                className={style["eye"]}
              />
            ) : (
              <FaEyeSlash
                className={style["eye"]}
                role="button"
                onClick={() => setShowPassword(!showPassword)}
              />
            ))}
        </div>
        {!error && requiredBottom && (
          <small className={`text-danger`}>(Required)</small>
        )}
        {error && errorMessage && (
          <p className={`${style["error-text"]} text-danger`}>{errorMessage}</p>
        )}
      </div>
    </>
  );
};

export default InputText;
