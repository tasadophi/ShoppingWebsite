import { BiShoppingBag } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ErrorBox from "../../components/ErrorBox/ErrorBox";
import Loading from "../../components/Loading/Loading";
import { addProduct } from "../../redux/productsSlice";
import sepratePrice from "../../utils/sepratePrice";
import style from "./Product.module.css";

const Product = () => {
  const { group, category, productId } = useParams();
  const dispatch = useDispatch();
  const { products, cart, loading, error } = useSelector(
    (state) => state.products
  );
  const navigate = useNavigate();

  if (products.length) {
    const productName = products.find(
      (p) => parseInt(p.id) === parseInt(productId)
    ).name;
    document.title = productName;
  }

  const inCart = (product) => {
    return cart.some((p) => parseInt(p.id) === parseInt(product.id));
  };

  // handlers
  const addToCart = (product) => {
    toast.success(`${product.name} به سبد خرید افزوده شد!`);
    dispatch(addProduct(product));
  };

  if (loading) return <Loading />;
  if (error) return <ErrorBox error={error} />;
  if (products.length) {
    const product = products.find(
      (p) =>
        p.category === category &&
        p.group === group &&
        p.id === parseInt(productId)
    );
    const offPrice = () => {
      const offPercent =
        100 - Math.floor((100 * product.offPrice) / product.price);
      return (
        <div className={style.priceContainer}>
          <span className={style.mainPrice}>
            {sepratePrice(product.price)} تومن
          </span>
          <span className={style.offPrice}>
            {sepratePrice(product.offPrice)} تومن
            <span className={style.badge}>{offPercent}%</span>
          </span>
        </div>
      );
    };
    return (
      <section className={`footerWrapper ${style.product}`}>
        <div className="container">
          <div className={style.main}>
            <div className={style.imgContainer}>
              <img src={product.image} alt={product.name} />
              <span className={style.productName}>{product.name}</span>
            </div>
            <div className={style.description}>
              <div className={style.seller}>
                <span>
                  <BiShoppingBag />
                  فروشنده: علی
                </span>
                <span className={style.seller}>عملکرد: عالی</span>
              </div>
              <div className={style.detail}>
                {product.available ? (
                  <>
                    <span className={style.available}>موجود در انبار</span>
                    {product.offPrice === product.price ? (
                      <span className={style.priceContainer}>
                        {sepratePrice(product.price)} تومن
                      </span>
                    ) : (
                      offPrice()
                    )}
                  </>
                ) : (
                  <span className={style.unavailable}>ناموجود</span>
                )}
              </div>
              {product.available ? (
                inCart(product) ? (
                  <button
                    className={style.btn}
                    onClick={() => navigate("/cart")}
                  >
                    ادامه خرید
                  </button>
                ) : (
                  <button
                    className={style.btn}
                    onClick={() => addToCart(product)}
                  >
                    افزودن به سبد خرید
                  </button>
                )
              ) : (
                <button className={style.btn}>موجود شد اطلاع بده</button>
              )}
            </div>
          </div>
          <ul className={style.specifications}>
            {product.specifications.map((specification, index) => (
              <li key={index}>
                <span>{specification.name}</span>
                <span>
                  {specification.valueFa} {specification.unit}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  } else {
    return <Loading />;
  }
};

export default Product;
