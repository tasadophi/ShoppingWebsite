import style from "./Products.module.css";
import { BiDownArrowAlt, BiFilter, BiUpArrowAlt, BiX } from "react-icons/bi";
import Loading from "../../components/Loading/Loading";
import ErrorBox from "../../components/ErrorBox/ErrorBox";
import { useNavigate, useParams } from "react-router-dom";
import sepratePrice from "../../utils/sepratePrice";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Products = () => {
  const { group, category } = useParams();
  const { products, loading, error } = useSelector((state) => state.products);
  const [showFilters, setShowFilters] = useState(false);
  const [showSub, setShowSub] = useState(null);
  // const filterGroup = [
  //   "digital",
  //   "clothes",
  //   "toys",
  //   "health",
  //   "book",
  //   "car",
  // ].includes(group)
  //   ? "group"
  //   : "category";

  useEffect(() => {
    setShowFilters(false);
  }, [group]);

  // handlers
  const showFiltersHandler = () => {
    setShowFilters(true);
    document.querySelector("body").style.overflow = "hidden";
  };

  const hideFiltersHandler = (e) => {
    if (e.target === e.currentTarget) {
      setShowFilters(false);
      document.querySelector("body").style = null;
    }
  };

  const showHideSubHandler = (filterKey) => {
    if (showSub) {
      if (Object.keys(showSub).includes(filterKey)) {
        setShowSub({ ...showSub, [filterKey]: !showSub[filterKey] });
      } else {
        setShowSub({ ...showSub, [filterKey]: true });
      }
    } else {
      setShowSub({ [filterKey]: true });
    }
  };

  const filterPage = (products) => {
    const arrow = (type) => {
      return showSub && showSub[type] ? (
        <BiUpArrowAlt className={style.hidden} />
      ) : (
        <BiDownArrowAlt className={style.hidden} />
      );
    };
    const filtersObject = {};
    const filters = products[0].specifications.map((s) => ({
      filter: s.filter,
      name: s.name,
      unit: s.unit,
    }));
    filters.forEach((filter) => {
      filtersObject[filter.filter] = {
        name: filter.name,
        values: [],
        unit: filter.unit,
      };
    });
    products.forEach((p) =>
      p.specifications.forEach((s) => {
        filtersObject[s.filter] &&
          !filtersObject[s.filter].values.includes(s.value) &&
          filtersObject[s.filter].values.push(s.value);
      })
    );
    const filterKeys = Object.keys(filtersObject);
    return (
      <>
        <ul
          className={`${style.filterList} ${
            showFilters && style.filterListShow
          }`}
        >
          <BiX className={style.icon} onClick={hideFiltersHandler} />
          {filterKeys.length &&
            filterKeys.map((filterKey, index) => (
              <li
                key={index}
                className={style.filterItem}
                onClick={() => showHideSubHandler(filterKey)}
              >
                <span
                  className={`${style.filterItemName} ${
                    showSub && showSub[filterKey] && style.active
                  }`}
                >
                  {filtersObject[filterKey].name}
                  {arrow(filterKey)}
                </span>
                <ul
                  className={`${style.subFilterList} ${
                    showSub && showSub[filterKey] && style.showSub
                  }`}
                >
                  {filtersObject[filterKey].values.map((filterValue, index) => (
                    <li key={index} className={style.subFilterItem}>
                      <input id={filterValue + filterKey} type="checkbox" />
                      <label htmlFor={filterValue + filterKey}>
                        {filterValue} {filtersObject[filterKey].unit}
                      </label>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
        </ul>
      </>
    );
  };

  if (loading) return <Loading />;
  if (error) return <ErrorBox error={error} />;
  if (products.length) {
    const filteredProducts = products.filter((product) =>
      category ? product.category === category : product.group === group
    );
    return (
      <section className={style.products}>
        <div className="container">
          <div
            className={`${style.filters} ${showFilters && style.showFilters}`}
            onClick={
              showFilters
                ? hideFiltersHandler
                : (e) => {
                    e.preventDefault();
                  }
            }
          >
            <span className={style.filterTitle} onClick={showFiltersHandler}>
              فیلتر
              <BiFilter />
            </span>
            {filteredProducts.length && filterPage(filteredProducts)}
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
    navigate(`/products/${product.group}/${product.category}/${product.id}`);
  };

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
    <div className={style.product} onClick={showProductPage}>
      <div className={style.imgContainer}>
        <img src={product.image} alt={product.name}></img>
      </div>
      <div className={style.description}>
        <span className={style.productName}>{product.name}</span>
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
        <button className={style.btn}>مشاهده جزئیات</button>
      </div>
    </div>
  );
};
