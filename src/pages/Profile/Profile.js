import { tab } from "@testing-library/user-event/dist/tab";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../../common/Modal/Modal";
import getUser from "./../../services/getUser";
import style from "./Profile.module.css";
const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("loggedIn"));

  useEffect(() => {
    if (!userId) navigate("/signup");
    else {
      const userData = getUser(userId);
      const getUserData = async () => {
        const { data } = await userData;
        setUserData(data);
      };
      getUserData();
      document.title = "پروفایل";
    }
  }, []);

  // handlers
  const showModalHandler = () => {
    setShowModal(true);
  };

  const cancelHandler = () => {
    setShowModal(false);
  };

  const logoutHandler = () => {
    setShowModal(false);
    navigate("/");
    localStorage.removeItem("loggedIn");
  };

  if (userData) {
    return (
      <section className={`footerWrapper ${style.mainContainer}`}>
        <Modal showModal={showModal} setShowModal={setShowModal}>
          <span>آیا واقعا قصد خروج دارید؟</span>
          <div className={style.btnBox}>
            <button
              className={`${style.btn} ${style.logoutBtn}`}
              onClick={logoutHandler}
            >
              خروج
            </button>
            <button
              className={`${style.btn} ${style.cancelBtn}`}
              onClick={cancelHandler}
            >
              لغو
            </button>
          </div>
        </Modal>
        <div className={style.mainTitle}>پروفایل شما</div>
        <div className={`container ${style.tableBox}`}>
          <table>
            <thead>
              <tr>
                <th>نام</th>
                <th>ایمیل</th>
                <th>شماره همراه</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{userData.name}</td>
                <td>{userData.email}</td>
                <td>{userData.phone}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={style.profileFooter}>
          <Link to="/">رفتن به صفحه اصلی</Link>
          <button
            className={`${style.btn} ${style.logoutBtn}`}
            onClick={showModalHandler}
          >
            خروج از حساب
          </button>
        </div>
      </section>
    );
  } else return <div></div>;
};

export default Profile;
