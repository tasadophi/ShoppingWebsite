import { useDispatch } from "react-redux";
import { getDataApi } from "../../redux/productsSlice";
import style from "./Error.module.css";
const ErrorBox = ({ error }) => {
  const dispatch = useDispatch();
  return (
    <div className={`footerWrapper ${style.errorBox}`}>
      <div className="container">
        <p>
          {error}
          <button onClick={() => dispatch(getDataApi())}>تلاش مجدد</button>
        </p>
      </div>
    </div>
  );
};

export default ErrorBox;
