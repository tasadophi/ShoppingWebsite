import { useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./NotFound.module.css";
const NotFound = () => {
  useEffect(() => {
    document.title = "پیدا نشد!";
  }, []);

  return (
    <section className={`footerWrapper ${style.notFoundContainer}`}>
      <div className={style.notFoundDigits}>
        <span>4</span>
        <span>0</span>
        <span>4</span>
      </div>
      <div className={style.notFoundDesc}>
        <span>صفحه مورد نظر پیدا نشد!</span>
        <Link to="/">رفتن به صفحه اصلی</Link>
      </div>
    </section>
  );
};

export default NotFound;
