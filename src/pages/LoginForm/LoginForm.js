import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import * as yup from "yup";
import Input from "../../common/Input/Input";
import Modal from "../../common/Modal/Modal";
import getUsers from "../../services/getUsers";
import style from "./LoginForm.module.css";

const LoginForm = () => {
  const [users, setUsers] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [search] = useSearchParams();

  useEffect(() => {
    document.title = "ورود";
    getUsers().then((res) => setUsers(res.data));
  }, []);

  const validateForm = () => {
    return yup.object({
      email: yup
        .string()
        .email("ایمیل معتبر نیست!")
        .required("این فیلد اجباری است!"),
      password: yup.string().required("این فیلد اجباری است!"),
    });
  };

  const submitForm = ({ email, password }) => {
    const user = users.find((user) => user.email === email);
    if (user) {
      if (user.password === password) {
        localStorage.setItem("loggedIn", JSON.stringify(user.id));
        const redirect = search.get("back");
        redirect ? navigate(`/${redirect}`) : navigate("/profile");
      } else {
        setError("رمز عبور اشتباه است!");
        setShowModal(true);
      }
    } else {
      setError("ایمیل اشتباه است!");
      setShowModal(true);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validateForm,
    onSubmit: submitForm,
    validateOnBlur: true,
    validateOnChange: true,
    validateOnMount: true,
  });

  const closelHandler = () => {
    setShowModal(false);
  };

  return (
    <div className={`footerWrapper ${style.mainFormContainer}`}>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <span>{error}</span>
        <button
          className={`${style.btn} ${style.cancelBtn}`}
          onClick={closelHandler}
        >
          بستن
        </button>
      </Modal>
      <div className={style.mainTitle}>فرم ورود شما</div>
      <form onSubmit={formik.handleSubmit} className={style.formContainer}>
        <Input formik={formik} type="email" name="email" label="ایمیل" />
        <Input formik={formik} type="text" name="password" label="رمز عبور" />
        <div className={style.btnsContainer}>
          <button
            type="submit"
            className={`${style.btn} ${formik.isValid && style.enable}`}
          >
            ورود
          </button>
          <Link
            replace={true}
            to={`/signup/?${search.toString()}`}
            className={style.hasNotAccount}
          >
            حسابی ندارید؟
          </Link>
        </div>
      </form>
    </div>
  );
};
export default LoginForm;
