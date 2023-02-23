import React, { Fragment, useLayoutEffect, useRef } from 'react';
import ReactDom from 'react-dom';
import classes from './index.module.css';

const Backdrop = ({ onClose, scroll }) => {
  const ref = useRef();

  useLayoutEffect(() => {
    const body = document.querySelector('body');
    if (scroll) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'auto';
    }

    return () => {
      body.style.overflow = 'auto';
    };
  }, [scroll]);

  return <div ref={ref} className={classes.backdrop} onClick={onClose}></div>;
};

const ModalOverlay = ({ children }) => {
  return <div className={classes.modal}>{children}</div>;
};

const modalPlaceholderElement = document.getElementById('modal');

const Modal = ({ onClose, children }) => {
  return (
    <Fragment>
      {/* Use createPortal to render the child at the placeholder */}
      {ReactDom.createPortal(
        <Backdrop scroll={scroll} onClose={onClose} />,
        modalPlaceholderElement
      )}

      {/* Use createPortal to render the child at the placeholder */}
      {ReactDom.createPortal(<ModalOverlay>{children}</ModalOverlay>, modalPlaceholderElement)}
    </Fragment>
  );
};

export default Modal;
