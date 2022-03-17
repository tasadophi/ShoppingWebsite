import { useEffect } from "react";
import { useSelector } from "react-redux";
import style from "./HomePage.module.css";
import Loading from "./../../components/Loading/Loading";
import ErrorBox from "./../../components/ErrorBox/ErrorBox";
import { Link } from "react-router-dom";

const groupBox = (product) => {
  const groupsName = {
    digital: "کالای دیجیتال",
    clothes: "مد و پوشاک",
    toys: "اسباب بازی",
    health: "زیبایی و سلامت",
    book: "کتاب",
    car: "لوازم خودرو",
  };
  return (
    <Link
      to={`products/${product.group}`}
      key={product.id}
      className={style.groupBox}
    >
      <div className={style.imgContainer}>
        <img src={product.image} alt={product.name} />
      </div>
      <span className="">{groupsName[product.group]}</span>
    </Link>
  );
};

const HomePage = () => {
  useEffect(() => {
    document.title = "صفحه اصلی فروشگاه";
  }, []);

  const { allProducts, loading, error } = useSelector(
    (state) => state.products
  );
  const groupsFilter = ["digital", "clothes", "toys", "health", "book", "car"];
  if (loading) return <Loading />;
  if (error) return <ErrorBox error={error} />;
  if (allProducts.length) {
    const products = groupsFilter.map((group) => {
      return allProducts.find((p) => p.group === group);
    });

    return (
      <section className={`footerWrapper ${style.homePage}`}>
        <div className={`container ${style.homePageContainer}`}>
          {products.map((product) => groupBox(product))}
        </div>
      </section>
    );
  } else {
    return <Loading />;
  }
};

export default HomePage;
