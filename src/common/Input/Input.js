import style from "./Input.module.css";
const Input = ({ formik, type, name, label }) => {
  return (
    <div className={style.formInputsContainer}>
      <label>{label}:</label>
      <input
        type={type}
        name={name}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
      />
      <span className={style.error}>
        {formik.touched[name] && formik.errors[name]}
      </span>
    </div>
  );
};

export default Input;
