import React, { Fragment, useLayoutEffect, useRef } from "react";
import ReactDom from "react-dom";
import classes from "./index.module.css";

function Backdrop({ onClose, scroll }) {
  const ref = useRef();

  useLayoutEffect(() => {
    const body = document.querySelector("body");
    if (scroll) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }

    return () => {
      body.style.overflow = "auto";
    };
  }, [scroll]);

  // TODO: FIX A11y
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
  return <div ref={ref} className={classes.backdrop} onClick={onClose} />;
}

function ModalOverlay({ children }) {
  return <div className={classes.modal}>{children}</div>;
}

const modalPlaceholderElement = document.getElementById("modal");

function Modal({ onClose, children }) {
  return (
    <>
      {/* Use createPortal to render the child at the placeholder */}
      {ReactDom.createPortal(
        // eslint-disable-next-line no-restricted-globals
        <Backdrop scroll={scroll} onClose={onClose} />,
        modalPlaceholderElement
      )}

      {/* Use createPortal to render the child at the placeholder */}
      {ReactDom.createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
        modalPlaceholderElement
      )}
    </>
  );
}

export default Modal;
