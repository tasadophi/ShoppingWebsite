import style from "./Header.module.css";
import {
  BiCart,
  BiDownArrowAlt,
  BiMenu,
  BiUpArrowAlt,
  BiX,
} from "react-icons/bi";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filteredProducts, setFilterProducts] = useState(null);
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
  const userId = JSON.parse(localStorage.getItem("loggedIn"));
  const { cart, allProducts } = useSelector((state) => state.products);
  const cartCount = cart.reduce((acc, curr) => {
    return acc + curr.count;
  }, 0);

  const showMenuHandler = () => {
    setShowMenu(true);
    document.querySelector("body").style.overflow = "hidden";
  };

  const closeMenuHandler = () => {
    setShowMenu(false);
    document.querySelector("body").style = null;
  };

  const showSubHandler = (property) =>
    window.innerWidth < 1024
      ? setShowSub({
          ...initial,
          [property]: !showSub[property],
        })
      : false;

  const loginSignupHandler = (userId) => {
    if (userId) navigate("/profile");
    else navigate("/signup");
  };

  const arrow = (type) => {
    return showSub[type] ? (
      <BiUpArrowAlt className={style.hidden} />
    ) : (
      <BiDownArrowAlt className={style.hidden} />
    );
  };

  const changeRoute = (route) => {
    setShowMenu(false);
    setShowSub(initial);
    navigate("/products/" + route);
    document.querySelector("body").style = null;
  };

  const searchProductsHandler = (e) => {
    const searchQuery = e.target.value;
    setSearchValue(searchQuery);
    if (searchQuery) {
      const filtered = allProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      filtered.length ? setFilterProducts(filtered) : setFilterProducts([""]);
    } else {
      setFilterProducts(null);
    }
  };

  return (
    <header className={style.mainHeader}>
      <div className="container">
        <div className={style.topHeader}>
          <div className={style.topHeaders}>
            <span className={style.title}>فروشگاه</span>
            <div className={style.searchBox}>
              <input
                type="text"
                value={searchValue}
                placeholder="جستجو ..."
                onChange={searchProductsHandler}
              ></input>
            </div>
          </div>
          <div className={style.bottomHeader}>
            <BiMenu className={style.menuBtn} onClick={showMenuHandler} />
            <div className={style.topHeaders}>
              <button
                className={style.btn}
                onClick={() => loginSignupHandler(userId)}
              >
                {userId ? "پروفایل" : "ورود | ثبت نام"}
              </button>
              <div className={style.cartIcon}>
                <Link to="/cart">
                  <BiCart className={style.icon} />
                </Link>
                <span className={style.cartCount}>{cartCount}</span>
              </div>
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
              {arrow("digital")}
            </span>
            <ul
              className={`${style.hide} ${
                showSub.digital ? style.subMenu : ""
              }`}
            >
              <li
                className={style.subMenuItem}
                onClick={() => changeRoute("digital")}
              >
                همه محصولات
              </li>
              <li
                className={style.subMenuItem}
                onClick={() => changeRoute("digital/mobiles")}
              >
                گوشی موبایل
              </li>
              <li
                className={style.subMenuItem}
                onClick={() => changeRoute("digital/laptops")}
              >
                لپتاپ
              </li>
              <li
                className={style.subMenuItem}
                onClick={() => changeRoute("digital/tablets")}
              >
                تبلت
              </li>
              <li
                className={style.subMenuItem}
                onClick={() => changeRoute("digital/cameras")}
              >
                دوربین
              </li>
              <li
                className={style.subMenuItem}
                onClick={() => changeRoute("digital/headphones")}
              >
                هدفون و هندزفری
              </li>
            </ul>
          </li>
          <li className={style.menuItem}>
            <span
              className={showSub.clothes ? style.active : ""}
              onClick={() => showSubHandler("clothes")}
            >
              مد و پوشاک
              {arrow("clothes")}
            </span>
            <ul
              className={`${style.hide} ${
                showSub.clothes ? style.subMenu : ""
              }`}
            >
              <li
                className={style.subMenuItem}
                onClick={() => changeRoute("clothes")}
              >
                همه محصولات
              </li>
              <li
                className={style.subMenuItem}
                onClick={() => changeRoute("clothes/men")}
              >
                مردانه
              </li>
              <li
                className={style.subMenuItem}
                onClick={() => changeRoute("clothes/women")}
              >
                زنانه
              </li>
              <li
                className={style.subMenuItem}
                onClick={() => changeRoute("clothes/children")}
              >
                بچه گانه
              </li>
            </ul>
          </li>
          <li className={style.menuItem}>
            <span
              className={showSub.toys ? style.active : ""}
              onClick={() => showSubHandler("toys")}
            >
              اسباب بازی
              {arrow("toys")}
            </span>
            <ul
              className={`${style.hide} ${showSub.toys ? style.subMenu : ""}`}
            >
              <li
                className={style.subMenuItem}
                onClick={() => changeRoute("toys")}
              >
                همه محصولات
              </li>
              <li
                className={style.subMenuItem}
                onClick={() => changeRoute("toys/fekri")}
              >
                فکری آموزشی
              </li>
              <li
                className={style.subMenuItem}
                onClick={() => changeRoute("toys/puzzle")}
              >
                پازل و ساختنی
              </li>
              <li
                className={style.subMenuItem}
                onClick={() => changeRoute("toys/figure")}
              >
                عروسک و فیگور
              </li>
              <li
                className={style.subMenuItem}
                onClick={() => changeRoute("toys/speener")}
              >
                اسپینر و سرگرمی
              </li>
              <li
                className={style.subMenuItem}
                onClick={() => changeRoute("toys/gun")}
              >
                تفنگ
              </li>
            </ul>
          </li>
          <li className={style.menuItem}>
            <span
              className={showSub.health ? style.active : ""}
              onClick={() => showSubHandler("health")}
            >
              زیبایی و سلامت
              {arrow("health")}
            </span>
            <ul
              className={`${style.hide} ${showSub.health ? style.subMenu : ""}`}
            >
              <li
                className={style.subMenuItem}
                onClick={() => changeRoute("health")}
              >
                همه محصولات
              </li>
              <li
                className={style.subMenuItem}
                onClick={() => changeRoute("health/arayeshi")}
              >
                لوازم آرایشی
              </li>
              <li
                className={style.subMenuItem}
                onClick={() => changeRoute("health/behdashti")}
              >
                لوازم بهداشتی
              </li>
              <li
                className={style.subMenuItem}
                onClick={() => changeRoute("health/gold")}
              >
                طلا و زیورآلات زنانه
              </li>
            </ul>
          </li>
          <li className={style.menuItem}>
            <span
              className={showSub.book ? style.active : ""}
              onClick={() => showSubHandler("book")}
            >
              کتاب
              {arrow("book")}
            </span>
            <ul
              className={`${style.hide} ${showSub.book ? style.subMenu : ""}`}
            >
              <li
                className={style.subMenuItem}
                onClick={() => changeRoute("book")}
              >
                همه محصولات
              </li>
              <li
                className={style.subMenuItem}
                onClick={() => changeRoute("book/ketab-chapi")}
              >
                کتاب چاپی
              </li>
              <li
                className={style.subMenuItem}
                onClick={() => changeRoute("book/ketab-soti")}
              >
                کتاب صوتی
              </li>
              <li
                className={style.subMenuItem}
                onClick={() => changeRoute("book/majalat")}
              >
                مجلات داخلی و خارجی
              </li>
            </ul>
          </li>
          <li className={style.menuItem}>
            <span
              className={showSub.car ? style.active : ""}
              onClick={() => showSubHandler("car")}
            >
              لوازم خودرو
              {arrow("car")}
            </span>
            <ul className={`${style.hide} ${showSub.car ? style.subMenu : ""}`}>
              <li
                className={style.subMenuItem}
                onClick={() => changeRoute("car")}
              >
                همه محصولات
              </li>
              <li
                className={style.subMenuItem}
                onClick={() => changeRoute("car/janebi")}
              >
                لوازم جانبی
              </li>
              <li
                className={style.subMenuItem}
                onClick={() => changeRoute("car/yadaki")}
              >
                لوازم یدکی
              </li>
              <li
                className={style.subMenuItem}
                onClick={() => changeRoute("car/masrafi")}
              >
                لوازم مصرفی
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
