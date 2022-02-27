import style from "./Products.module.css";
import { BiFilter } from "react-icons/bi";
import { useEffect } from "react";
import { getDataApi } from "../../redux/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading/Loading";
import ErrorBox from "../../components/ErrorBox/ErrorBox";
import { useNavigate, useParams } from "react-router-dom";

const separatePrice = (number) => {
  number += "";
  number = number.replace(",", "");
  let x = number.split(".");
  let y = x[0];
  let z = x.length > 1 ? "." + x[1] : "";
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(y)) y = y.replace(rgx, "$1" + "٫" + "$2");
  return y + z;
};

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
        <span className={style.availabel}>موجود در انبار</span>
        <span className={style.price}>{separatePrice(product.price)} تومن</span>
        <button className={style.btn}>مشاهده جزئیات</button>
      </div>
    </div>
  );
};
