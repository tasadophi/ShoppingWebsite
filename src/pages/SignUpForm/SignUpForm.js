import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import * as yup from "yup";
import Input from "../../common/Input/Input";
import Modal from "../../common/Modal/Modal";
import getUsers from "../../services/getUsers";
import postUser from "../../services/postUser";
import style from "./SignUpForm.module.css";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [search] = useSearchParams();

  useEffect(() => {
    document.title = "ثبت نام";
    if (localStorage.getItem("loggedIn")) navigate("/profile");
    getUsers().then((res) => setUsers(res.data));
  }, []);

  const validateForm = () => {
    return yup.object({
      name: yup.string().required("این فیلد اجباری  است!"),
      email: yup
        .string()
        .email("ایمیل معتبر نیست!")
        .required("این فیلد اجباری است!"),
      phone: yup
        .string()
        .matches(/^09/, "با 09 شروع کنید!")
        .matches(/[0-9]{11}/, "لطفا ۱۱ رقم وارد کنید!")
        .required("این فیلد اجباری است!"),
      password: yup
        .string()
        .required("این فیلد اجباری است!")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "رمز عبور باید شامل حداقل ۸ حرف شامل حروف بزرگ ٫حروف کوچک٫ اعداد و کاراکتر خاص باشد!"
        ),
      passwordConfirm: yup
        .string()
        .required("این فیلد اجباری است!")
        .oneOf(
          [yup.ref("password"), null],
          "تکرار رمز عبور با رمز عبور یکی نیست!"
        ),
    });
  };

  const submitForm = (values) => {
    const user = users.find(
      (user) => user.email === values.email || user.phone === values.phone
    );
    if (user && user.email && user.email === values.email) {
      setError("این ایمیل قبلا ثبت شده است!");
      setShowModal(true);
    } else if (user && user.phone && user.phone === values.phone) {
      setError("این شماره قبلا ثبت شده است!");
      setShowModal(true);
    } else {
      const id = Math.floor(Math.random() * 1000);
      postUser({ ...values, id });
      localStorage.setItem("loggedIn", JSON.stringify(id));
      const redirect = search.get("back");
      redirect ? navigate(`/${redirect}`) : navigate("/profile");
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      passwordConfirm: "",
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
    <div className={style.mainFormContainer}>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <span>{error}</span>
        <button
          className={`${style.btn} ${style.cancelBtn}`}
          onClick={closelHandler}
        >
          بستن
        </button>
      </Modal>
      <div className={style.mainTitle}>فرم ثبت نام شما</div>
      <form onSubmit={formik.handleSubmit} className={style.formContainer}>
        <Input
          formik={formik}
          type="text"
          name="name"
          label="نام و نام خانوادگی"
        />
        <Input formik={formik} type="email" name="email" label="ایمیل" />
        <Input formik={formik} type="tel" name="phone" label="شماره همراه" />
        <Input formik={formik} type="text" name="password" label="رمز عبور" />
        <Input
          formik={formik}
          type="text"
          name="passwordConfirm"
          label="تکرار رمز عبور"
        />
        <div className={style.btnsContainer}>
          <button
            type="submit"
            className={`${style.btn} ${formik.isValid && style.enable}`}
          >
            ثبت نام
          </button>
          <Link
            replace={true}
            to={`/login/?${search.toString()}`}
            className={style.hasAccount}
          >
            آیا قبلا ثبت نام کردید؟
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
