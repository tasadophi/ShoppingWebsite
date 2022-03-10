import style from "./Modal.module.css";
const Modal = ({ showModal, setShowModal, children }) => {
  const cancelHandler = () => {
    setShowModal(false);
  };

  return (
    <>
      <div
        onClick={cancelHandler}
        className={showModal ? style.backdrop : ""}
      ></div>
      <div className={`${style.modalBox} ${showModal && style.showModal}`}>
        {children}
      </div>
    </>
  );
};

export default Modal;
