import style from "./../input-text/style.module.scss";

const TextArea = ({
  title,
  onChange = () => {},
  value,
  name,
  required = false,
  ...props
}) => {
  return (
    <>
      <div className={style["input-field"]}>
        <label className={style["input-title"]}>{title}{ " "}
        {required && <small className={`text-danger`}>(Required)</small>}
        </label>

        <textarea
          {...props}
          className="form-control"
          name={name}
          onChange={onChange}
          value={value}
          rows="4"
          cols="55"
        />
      </div>
    </>
  );
};

export default TextArea;
