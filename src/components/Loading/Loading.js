import style from "./Loading.module.css";
const Loading = () => {
  return (
    <section className="footerWrapper">
      <div className={style.backdrop}>
        <div className={style.boxModal}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </section>
  );
};

export default Loading;
