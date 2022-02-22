import style from "./Header.module.css";
import { BiArrowBack, BiCart } from "react-icons/bi";
const Header = () => {
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
          <div className={style.topHeaders}>
            <button className={style.btn}>ورود | ثبت نام</button>
            <BiCart className={style.icon} />
          </div>
        </div>
        <ul className={style.headerMenu}>
          <li className={style.menuItem}>
            کالای دیجیتال
            <ul className={style.subMenu}>
              <li className={style.subMenuItem}>گوشی موبایل</li>
              <li className={style.subMenuItem}>لپتاپ</li>
              <li className={style.subMenuItem}>تبلت</li>
              <li className={style.subMenuItem}>دوربین</li>
              <li className={style.subMenuItem}>هدفون و هندزفری</li>
            </ul>
          </li>
          <li className={style.menuItem}>
            مد و پوشاک
            <ul className={style.subMenu}>
              <li className={style.subMenuItem}>مردانه</li>
              <li className={style.subMenuItem}>زنانه</li>
              <li className={style.subMenuItem}>بچه گانه</li>
            </ul>
          </li>
          <li className={style.menuItem}>
            اسباب بازی
            <ul className={style.subMenu}>
              <li className={style.subMenuItem}>فکری آموزشی</li>
              <li className={style.subMenuItem}>لگو و ساختنی</li>
              <li className={style.subMenuItem}>عروسک و فیگور</li>
              <li className={style.subMenuItem}>اسپینر و سرگرمی</li>
              <li className={style.subMenuItem}>تفنگ</li>
            </ul>
          </li>
          <li className={style.menuItem}>
            زیبایی و سلامت
            <ul className={style.subMenu}>
              <li className={style.subMenuItem}>لوازم آرایشی</li>
              <li className={style.subMenuItem}>لوازم بهداشتی</li>
              <li className={style.subMenuItem}>طلا و زیورآلات زنانه</li>
            </ul>
          </li>
          <li className={style.menuItem}>
            کتاب
            <ul className={style.subMenu}>
              <li className={style.subMenuItem}>کتاب چاپی</li>
              <li className={style.subMenuItem}>کتاب صوتی</li>
              <li className={style.subMenuItem}>مجلات داخلی و خارجی</li>
            </ul>
          </li>
          <li className={style.menuItem}>
            لوازم خودرو
            <ul className={style.subMenu}>
              <li className={style.subMenuItem}>
                لوازم جانبی
                <ul className={style.subMenu2}>
                  <li className={style.subMenuItem}>کتاب چاپی</li>
                  <li className={style.subMenuItem}>کتاب صوتی</li>
                  <li className={style.subMenuItem}>مجلات داخلی و خارجی</li>
                </ul>
              </li>
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
