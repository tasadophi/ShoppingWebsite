import style from "./Products.module.css";
import { BiDownArrowAlt, BiFilter, BiUpArrowAlt, BiX } from "react-icons/bi";
import Loading from "../../components/Loading/Loading";
import ErrorBox from "../../components/ErrorBox/ErrorBox";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import sepratePrice from "../../utils/sepratePrice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteFilters, filterProducts } from "../../redux/productsSlice";

const Products = () => {
  const { group, category } = useParams();
  const { allProducts, products, loading, error, filters } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();
  const [showFilters, setShowFilters] = useState(false);
  const [showSub, setShowSub] = useState(null);
  const navigate = useNavigate();
  const [search] = useSearchParams();
  const location = useLocation();
  const [filtered, setFiltered] = useState(false);

  useEffect(() => {
    const titles = {
      digital: "کالای دیجیتال",
      clothes: "مد و پوشاک",
      toys: "اسباب بازی",
      health: "زیبایی و سلامت",
      book: "کتاب",
      car: "لوازم خودرو",
      mobiles: "گوشی موبایل",
      laptops: "لپتاپ",
      tablets: "تبلت",
      cameras: "دوربین",
      headphones: "هدفون",
      men: "مردانه",
      women: "زنانه",
      children: "بچگانه",
      fekri: "فکری و آموزشی",
      logo: "لگو و ساختنی",
      figure: "عروسک و فیگور",
      speener: "اسپینر و سرگرمی",
      gun: "تفنگ",
      arayeshi: "لوازم آرایشی",
      behdashti: "لوازم بهداشتی",
      gold: "طلا و زیورآلات زنانه",
      "ketab-chapi": "کتاب چاپی",
      "ketab-soti": "کتاب صوتی",
      majalat: "مجلات",
      janebi: "لوازم جانبی",
      yadaki: "لوازم یدکی",
      masrafi: "لوازم مصرفی",
    };
    category
      ? (document.title = titles[category])
      : (document.title = titles[group]);
    dispatch(deleteFilters());
  }, [group, category]);

  useEffect(() => {
    if (products.length && !filtered) {
      const paramater = search.toString().split("&");
      const newParams = paramater.map((p) => {
        const [key, value] = p.split("=");
        return { [key]: value };
      });
      dispatch(
        filterProducts({
          category,
          search: newParams,
          byClick: true,
        })
      );
      setFiltered(true);
    }
  }, [search, products]);

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

  const deleteFiltersHandler = () => {
    dispatch(deleteFilters());
    setShowSub(null);
    navigate(location.pathname, { replace: true });
  };

  const filterPage = () => {
    const arrow = (type) => {
      return showSub && showSub[type] ? (
        <BiUpArrowAlt className={style.hidden} />
      ) : (
        <BiDownArrowAlt className={style.hidden} />
      );
    };
    const products = allProducts.filter((product) =>
      category ? product.category === category : product.group === group
    );
    const filtersObject = {};
    const filtersParams = products[0].specifications.map((s) => ({
      filter: s.filter,
      name: s.name,
      unit: s.unit,
    }));
    filtersParams.forEach((filter) => {
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

    // handlers
    const filterHandler = (e, type, value) => {
      if (e.currentTarget.checked) search.set(type + "_" + value, true);
      else search.delete(type + "_" + value);
      const paramater = search.toString().split("&");
      const newParams = paramater.map((p) => {
        const [key, value] = p.split("=");
        return { [key]: value };
      });
      dispatch(
        filterProducts({
          category,
          search: newParams,
          byClick: true,
        })
      );
      navigate(location.pathname + "?" + search.toString(), { replace: true });
    };

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
              <li key={index} className={style.filterItem}>
                <span
                  className={`${style.filterItemName} ${
                    showSub && showSub[filterKey] && style.active
                  }`}
                  onClick={() => showHideSubHandler(filterKey)}
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
                      <input
                        id={filterValue + filterKey}
                        type="checkbox"
                        checked={
                          filters && filters[filterKey + "_" + filterValue]
                            ? true
                            : false
                        }
                        onChange={(e) =>
                          filterHandler(e, filterKey, filterValue)
                        }
                      />
                      <label htmlFor={filterValue + filterKey}>
                        {filterValue} {filtersObject[filterKey].unit}
                      </label>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          {Object.keys(filters).length ? (
            <button className={style.btn} onClick={deleteFiltersHandler}>
              حذف فیلترها
            </button>
          ) : (
            ""
          )}
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
        <div className={`container ${style.productsDesktop}`}>
          {category && (
            <div
              className={`${style.filters} ${showFilters && style.showFilters}`}
              onClick={
                showFilters
                  ? hideFiltersHandler
                  : (e) => {
                      window.innerWidth < 1024 && e.preventDefault();
                    }
              }
            >
              <span className={style.filterTitle} onClick={showFiltersHandler}>
                فیلتر
                <BiFilter />
              </span>
              {filterPage()}
            </div>
          )}
          {products[0] !== "false" ? (
            <div className={style.productsContainer}>
              {filteredProducts.map((product) => (
                <Product key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className={style.noProduct}>
              <span>هیج محصولی با این مشخصات موجود نیست</span>
              <button className={style.btn} onClick={deleteFiltersHandler}>
                حذف فیلتر ها
              </button>
            </div>
          )}
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
