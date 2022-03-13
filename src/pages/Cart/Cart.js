import { useEffect } from "react";
import { BiMinus, BiPlus, BiTrash } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addOne, removeOne } from "../../redux/productsSlice";
import sepratePrice from "../../utils/sepratePrice";
import style from "./Cart.module.css";

const Cart = () => {
  const { cart } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn) document.title = "سبد خرید";
    else navigate("/signup/?back=cart", { replace: true });
  }, []);

  const offPrice = (product) => {
    const offPercent =
      100 - Math.floor((100 * product.offPrice) / product.price);
    return (
      <div className={style.priceContainer}>
        <span className={style.mainPrice}>
          {sepratePrice(product.price * product.count)} تومن
        </span>
        <span className={style.offPrice}>
          {sepratePrice(product.offPrice * product.count)} تومن
          <span className={style.badge}>{offPercent}%</span>
        </span>
      </div>
    );
  };

  const totalCartPrice = cart.reduce((acc, curr) => {
    return acc + curr.price * curr.count;
  }, 0);

  const totalOffPrice = () => {
    const offPrices = cart.reduce((acc, curr) => {
      return acc + curr.offPrice * curr.count;
    }, 0);
    return totalCartPrice - offPrices;
  };

  const payPrice = totalCartPrice - totalOffPrice();

  const CartItem = ({ cartItem }) => {
    const add = () => {
      dispatch(addOne(cartItem.id));
    };

    const remove = () => {
      dispatch(removeOne(cartItem.id));
    };

    return (
      <div className={style.cartItem}>
        <div className={style.cartItemActions}>
          <span className={style.removeBtn} onClick={remove}>
            {cartItem.count > 1 ? <BiMinus /> : <BiTrash />}
          </span>
          <span className={style.count}>{cartItem.count}</span>
          <span className={style.addBtn} onClick={add}>
            <BiPlus />
          </span>
        </div>
        <div className={style.cartPrice}>
          {cartItem.offPrice === cartItem.price ? (
            <span className={style.priceContainer}>
              {sepratePrice(cartItem.price * cartItem.count)} تومن
            </span>
          ) : (
            offPrice(cartItem)
          )}
        </div>
        <div className={style.cartItemDetails}>
          <span className={style.cartItemName}>{cartItem.name}</span>
          <div className={style.imgContainer}>
            <img src={cartItem.image} alt={cartItem.name} />
          </div>
        </div>
      </div>
    );
  };

  const cartPage = () => {
    return (
      <section>
        <div className={`container ${style.cartContainer}`}>
          <aside className={style.sidebar}>
            <div className={style.summury}>
              <span>جمع کل سبد خرید: {sepratePrice(totalCartPrice)}</span>
              <span>جمع تخفیفات: {sepratePrice(totalOffPrice())}</span>
            </div>
            <span>مبلغ قابل پرداخت: {sepratePrice(payPrice)}</span>
            <button className={style.btn}>پرداخت نهایی</button>
          </aside>
          <div className={style.cartItems}>
            {cart.map((cartItem) => (
              <CartItem key={cartItem.id} cartItem={cartItem} />
            ))}
          </div>
        </div>
      </section>
    );
  };

  const cartEmptyPage = () => {
    return (
      <div className={`container ${style.cartEmptyContainer}`}>
        <div>
          <span>سبد خرید شما خالی است!</span>
          <Link to="/">رفتن به صفحه اصلی</Link>
        </div>
      </div>
    );
  };
  return <>{cart.length ? cartPage() : cartEmptyPage()}</>;
};

export default Cart;
