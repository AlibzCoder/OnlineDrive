import { ReactNode, useEffect, useRef } from "react";

const Modal = (props: {
  isOpen: boolean;
  OnClose: (isOpen: boolean) => void;
  children: ReactNode;
}) => {
  const { isOpen, OnClose, children } = props;

  return (
    <>
      <div
        className={`modal ${
          isOpen ? "modal-visible" : ""
        } d-flex justify-center items-center`}
      >
        <div className="card">{children}</div>
        <div
          onClick={() => OnClose(false)}
          className={`modal-overlay ${isOpen ? "modal-visible" : ""}`}
        ></div>
      </div>
    </>
  );
};

export default Modal;
