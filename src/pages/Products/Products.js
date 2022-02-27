import style from "./Products.module.css";
import { BiFilter } from "react-icons/bi";
import Loading from "../../components/Loading/Loading";
import ErrorBox from "../../components/ErrorBox/ErrorBox";
import { useNavigate, useParams } from "react-router-dom";
import sepratePrice from "../../utils/sepratePrice";
import { useSelector } from "react-redux";

const Products = () => {
  const { group } = useParams();
  const { products, loading, error } = useSelector((state) => state.products);

  if (loading) return <Loading />;
  if (error) return <ErrorBox error={error} />;
  if (products.length) {
    const filteredProducts = products.filter(
      (product) => product.group === group
    );
    return (
      <section className={style.products}>
        <div className="container">
          <div className={style.filters}>
            <span className={style.filterTitle}>
              فیلتر
              <BiFilter />
            </span>
          </div>
          <div className={style.productsContainer}>
            {filteredProducts.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    );
  } else {
    return <Loading />;
  }
};

export default Products;

const Product = ({ product }) => {
  const navigate = useNavigate();
  const showProductPage = () => {
    navigate(`/products/${product.group}/${product.id}`);
  };
  return (
    <div className={style.product} onClick={showProductPage}>
      <div className={style.imgContainer}>
        <img src={product.image} alt={product.name}></img>
      </div>
      <div className={style.description}>
        <span className={style.productName}>{product.name}</span>
        <span className={style.available}>موجود در انبار</span>
        <span className={style.price}>{sepratePrice(product.price)} تومن</span>
        <button className={style.btn}>مشاهده جزئیات</button>
      </div>
    </div>
  );
};
