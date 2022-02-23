import style from "./Header.module.css";
import {
  BiCart,
  BiDownArrowAlt,
  BiMenu,
  BiUpArrowAlt,
  BiX,
} from "react-icons/bi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const initial = {
    digital: false,
    clothes: false,
    toys: false,
    health: false,
    book: false,
    car: false,
  };
  const [showSub, setShowSub] = useState(initial);

  const showMenuHandler = () => setShowMenu(true);
  const closeMenuHandler = () => setShowMenu(false);
  const showSubHandler = (property) =>
    window.innerWidth < 1024
      ? setShowSub({
          ...initial,
          [property]: !showSub[property],
        })
      : navigate("/digital");

  const arrow = () => {
    return showSub.digital ? (
      <BiUpArrowAlt className={style.hidden} />
    ) : (
      <BiDownArrowAlt className={style.hidden} />
    );
  };

  return (
    <header className={style.mainHeader}>
      <div className="container">
        <div className={style.topHeader}>
          <div className={style.topHeaders}>
            <span className={style.title}>فروشگاه</span>
            <div className={style.searchBox}>
              <input type="text" placeholder="جستجو ..."></input>
            </div>
          </div>
          <div className={style.bottomHeader}>
            <BiMenu className={style.menuBtn} onClick={showMenuHandler} />
            <div className={style.topHeaders}>
              <button className={style.btn}>ورود | ثبت نام</button>
              <BiCart className={style.icon} />
            </div>
          </div>
        </div>

        <ul
          className={`${style.headerMenu} ${
            showMenu ? style.showMobileMenu : ""
          }`}
        >
          <BiX className={style.closeBtn} onClick={closeMenuHandler} />
          <li className={style.menuItem}>
            <span
              className={showSub.digital ? style.active : ""}
              onClick={() => showSubHandler("digital")}
            >
              کالای دیجیتال
              {arrow()}
            </span>
            <ul
              className={`${style.hide} ${
                showSub.digital ? style.subMenu : ""
              }`}
            >
              <li className={style.subMenuItem}>گوشی موبایل</li>
              <li className={style.subMenuItem}>لپتاپ</li>
              <li className={style.subMenuItem}>تبلت</li>
              <li className={style.subMenuItem}>دوربین</li>
              <li className={style.subMenuItem}>هدفون و هندزفری</li>
            </ul>
          </li>
          <li className={style.menuItem}>
            <span
              className={showSub.clothes ? style.active : ""}
              onClick={() => showSubHandler("clothes")}
            >
              مد و پوشاک
              {arrow()}
            </span>
            <ul
              className={`${style.hide} ${
                showSub.clothes ? style.subMenu : ""
              }`}
            >
              <li className={style.subMenuItem}>مردانه</li>
              <li className={style.subMenuItem}>زنانه</li>
              <li className={style.subMenuItem}>بچه گانه</li>
            </ul>
          </li>
          <li className={style.menuItem}>
            <span
              className={showSub.toys ? style.active : ""}
              onClick={() => showSubHandler("toys")}
            >
              اسباب بازی
              {arrow()}
            </span>
            <ul
              className={`${style.hide} ${showSub.toys ? style.subMenu : ""}`}
            >
              <li className={style.subMenuItem}>فکری آموزشی</li>
              <li className={style.subMenuItem}>لگو و ساختنی</li>
              <li className={style.subMenuItem}>عروسک و فیگور</li>
              <li className={style.subMenuItem}>اسپینر و سرگرمی</li>
              <li className={style.subMenuItem}>تفنگ</li>
            </ul>
          </li>
          <li className={style.menuItem}>
            <span
              className={showSub.health ? style.active : ""}
              onClick={() => showSubHandler("health")}
            >
              زیبایی و سلامت
              {arrow()}
            </span>
            <ul
              className={`${style.hide} ${showSub.health ? style.subMenu : ""}`}
            >
              <li className={style.subMenuItem}>لوازم آرایشی</li>
              <li className={style.subMenuItem}>لوازم بهداشتی</li>
              <li className={style.subMenuItem}>طلا و زیورآلات زنانه</li>
            </ul>
          </li>
          <li className={style.menuItem}>
            <span
              className={showSub.book ? style.active : ""}
              onClick={() => showSubHandler("book")}
            >
              کتاب
              {arrow()}
            </span>
            <ul
              className={`${style.hide} ${showSub.book ? style.subMenu : ""}`}
            >
              <li className={style.subMenuItem}>کتاب چاپی</li>
              <li className={style.subMenuItem}>کتاب صوتی</li>
              <li className={style.subMenuItem}>مجلات داخلی و خارجی</li>
            </ul>
          </li>
          <li className={style.menuItem}>
            <span
              className={showSub.car ? style.active : ""}
              onClick={() => showSubHandler("car")}
            >
              لوازم خودرو
              {arrow()}
            </span>
            <ul className={`${style.hide} ${showSub.car ? style.subMenu : ""}`}>
              <li className={style.subMenuItem}>لوازم جانبی</li>
              <li className={style.subMenuItem}>لوازم یدکی</li>
              <li className={style.subMenuItem}>لوازم مصرفی</li>
            </ul>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
