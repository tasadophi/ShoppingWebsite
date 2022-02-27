import style from "./Loading.module.css";
const Loading = () => {
  return (
    <div className={style.backdrop}>
      <div className={style.boxModal}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default Loading;
