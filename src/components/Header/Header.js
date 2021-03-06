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
  const [filteredProducts, setFilteredProducts] = useState(null);
  const [isFilter, setIsFilter] = useState(false);
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
      filtered.length
        ? setFilteredProducts(filtered)
        : setFilteredProducts(["false"]);
    } else {
      setFilteredProducts(null);
    }
  };

  const filteredProduct = (product) => {
    const clickHandler = () => {
      changeRoute(`${product.group}/${product.category}/${product.id}`);
      setIsFilter(false);
      setSearchValue("");
      setFilteredProducts(null);
    };

    return (
      <div
        key={product.id}
        className={style.filteredProduct}
        onClick={clickHandler}
      >
        <div className={style.imgContainer}>
          <img src={product.image} alt={product.name} />
        </div>
        <span className={style.filteredName}>{product.name}</span>
      </div>
    );
  };

  return (
    <header className={style.mainHeader}>
      <div className="container">
        <div className={style.topHeader}>
          <div className={style.topHeaders}>
            <span className={style.title}>??????????????</span>
            <div
              className={`${style.backdrop} ${isFilter && style.backdropOn}`}
              onClick={() => setIsFilter(false)}
            ></div>
            <div className={`${style.searchBox} ${isFilter && style.searchOn}`}>
              <input
                type="text"
                value={searchValue}
                onFocus={() => setIsFilter(true)}
                placeholder="?????????? ..."
                onChange={searchProductsHandler}
              ></input>
              <div
                className={`${style.filteredBox} ${
                  isFilter && style.filteredBoxOn
                }`}
              >
                {filteredProducts && filteredProducts[0] === "false" ? (
                  <span
                    className={style.noProducts}
                    onClick={() => setIsFilter(false)}
                  >
                    ???????????? ???????? ??????????
                  </span>
                ) : (
                  filteredProducts &&
                  filteredProducts.map((p) => filteredProduct(p))
                )}
              </div>
            </div>
          </div>
          <div className={style.bottomHeader}>
            <BiMenu className={style.menuBtn} onClick={showMenuHandler} />
            <div className={style.topHeaders}>
              <button
                className={style.btn}
                onClick={() => loginSignupHandler(userId)}
              >
                {userId ? "??????????????" : "???????? | ?????? ??????"}
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
              ?????????? ??????????????
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
                ?????? ??????????????
              </li>
              <li
                className={style.subMenuItem}
                onClick={() => changeRoute("digital/mobiles")}
              >
                ???????? ????????????
              </li>
              <li
                className={style.subMenuItem}
                onClick={() => changeRoute("digital/laptops")}
              >
                ??????????
              </li>
              <li
                className={style.subMenuItem}
                onClick={() => changeRoute("digital/tablets")}
              >
                ????????
              </li>
              <li
                className={style.subMenuItem}
                onClick={() => changeRoute("digital/cameras")}
              >
                ????????????
              </li>
              <li
                className={style.subMenuItem}
                onClick={() => changeRoute("digital/headphones")}
              >
                ?????????? ?? ??????????????
              </li>
            </ul>
          </li>
          <li className={style.menuItem}>
            <span
              className={showSub.clothes ? style.active : ""}
              onClick={() => showSubHandler("clothes")}
            >
              ???? ?? ??????????
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
                ?????? ??????????????
              </li>
              <li
                className={style.subMenuItem}
                onClick={() => changeRoute("clothes/men")}
              >
                ????????????
              </li>
              <li
                className={style.subMenuItem}
                onClick={() => changeRoute("clothes/women")}
              >
                ??????????
              </li>
              <li
                className={style.subMenuItem}
                onClick={() => changeRoute("clothes/children")}
              >
                ?????? ????????
              </li>
            </ul>
          </li>
          <li className={style.menuItem}>
            <span
              className={showSub.toys ? style.active : ""}
              onClick={() => showSubHandler("toys")}
            >
              ?????????? ????????
              {arrow("toys")}
            </span>
            <ul
              className={`${style.hide} ${showSub.toys ? style.subMenu : ""}`}
            >
              <li
                className={style.subMenuItem}
                onClick={() => changeRoute("toys")}
              >
                ?????? ??????????????
              </li>
              <li
                className={style.subMenuItem}
                onClick={() => changeRoute("toys/fekri")}
              >
                ???????? ????????????
              </li>
              <li
                className={style.subMenuItem}
                onClick={() => changeRoute("toys/puzzle")}
              >
                ???????? ?? ????????????
              </li>
              <li
                className={style.subMenuItem}
                onClick={() => changeRoute("toys/figure")}
              >
                ?????????? ?? ??????????
              </li>
              <li
                className={style.subMenuItem}
                onClick={() => changeRoute("toys/speener")}
              >
                ???????????? ?? ????????????
              </li>
              <li
                className={style.subMenuItem}
                onClick={() => changeRoute("toys/gun")}
              >
                ????????
              </li>
            </ul>
          </li>
          <li className={style.menuItem}>
            <span
              className={showSub.health ? style.active : ""}
              onClick={() => showSubHandler("health")}
            >
              ???????????? ?? ??????????
              {arrow("health")}
            </span>
            <ul
              className={`${style.hide} ${showSub.health ? style.subMenu : ""}`}
            >
              <li
                className={style.subMenuItem}
                onClick={() => changeRoute("health")}
              >
                ?????? ??????????????
              </li>
              <li
                className={style.subMenuItem}
                onClick={() => changeRoute("health/arayeshi")}
              >
                ?????????? ????????????
              </li>
              <li
                className={style.subMenuItem}
                onClick={() => changeRoute("health/behdashti")}
              >
                ?????????? ??????????????
              </li>
              <li
                className={style.subMenuItem}
                onClick={() => changeRoute("health/gold")}
              >
                ?????? ?? ???????????????? ??????????
              </li>
            </ul>
          </li>
          <li className={style.menuItem}>
            <span
              className={showSub.book ? style.active : ""}
              onClick={() => showSubHandler("book")}
            >
              ????????
              {arrow("book")}
            </span>
            <ul
              className={`${style.hide} ${showSub.book ? style.subMenu : ""}`}
            >
              <li
                className={style.subMenuItem}
                onClick={() => changeRoute("book")}
              >
                ?????? ??????????????
              </li>
              <li
                className={style.subMenuItem}
                onClick={() => changeRoute("book/ketab-chapi")}
              >
                ???????? ????????
              </li>
              <li
                className={style.subMenuItem}
                onClick={() => changeRoute("book/ketab-soti")}
              >
                ???????? ????????
              </li>
              <li
                className={style.subMenuItem}
                onClick={() => changeRoute("book/majalat")}
              >
                ?????????? ?????????? ?? ??????????
              </li>
            </ul>
          </li>
          <li className={style.menuItem}>
            <span
              className={showSub.car ? style.active : ""}
              onClick={() => showSubHandler("car")}
            >
              ?????????? ??????????
              {arrow("car")}
            </span>
            <ul className={`${style.hide} ${showSub.car ? style.subMenu : ""}`}>
              <li
                className={style.subMenuItem}
                onClick={() => changeRoute("car")}
              >
                ?????? ??????????????
              </li>
              <li
                className={style.subMenuItem}
                onClick={() => changeRoute("car/janebi")}
              >
                ?????????? ??????????
              </li>
              <li
                className={style.subMenuItem}
                onClick={() => changeRoute("car/yadaki")}
              >
                ?????????? ????????
              </li>
              <li
                className={style.subMenuItem}
                onClick={() => changeRoute("car/masrafi")}
              >
                ?????????? ??????????
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
