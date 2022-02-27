import { BiShoppingBag } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ErrorBox from "../../components/ErrorBox/ErrorBox";
import Loading from "../../components/Loading/Loading";
import separatePrice from "../../utils/sepratePrice";
import style from "./Product.module.css";

const Product = () => {
  const { group, productId } = useParams();
  const { products, loading, error } = useSelector((state) => state.products);
  if (loading) return <Loading />;
  if (error) return <ErrorBox error={error} />;
  if (products.length) {
    const product = products.find(
      (p) => p.group === group && p.id === parseInt(productId)
    );
    return (
      <section className={style.product}>
        <div className="container">
          <div className={style.imgContainer}>
            <img src={product.image} alt={product.name} />
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
              <span className={style.available}>موجود در انبار</span>
              <span className={style.price}>
                {separatePrice(product.price)} تومن
              </span>
            </div>
          </div>
        </div>
      </section>
    );
  } else {
    return <Loading />;
  }
};

export default Product;
