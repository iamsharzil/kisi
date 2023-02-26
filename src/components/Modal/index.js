import React, { Fragment, useLayoutEffect, useRef } from 'react';
import ReactDom from 'react-dom';
import styles from './index.module.scss';

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

  // TODO: FIX A11y
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
  return <div ref={ref} className={styles.backdrop} onClick={onClose} />;
};

const ModalOverlay = ({ children }) => <div className={styles.modal}>{children}</div>;

const modalPlaceholderElement = document.getElementById('modal');

const Modal = ({ onClose, children }) => (
  <>
    {/* Use createPortal to render the child at the placeholder */}
    {ReactDom.createPortal(
      // eslint-disable-next-line no-restricted-globals
      <Backdrop scroll={scroll} onClose={onClose} />,
      modalPlaceholderElement
    )}

    {/* Use createPortal to render the child at the placeholder */}
    {ReactDom.createPortal(<ModalOverlay>{children}</ModalOverlay>, modalPlaceholderElement)}
  </>
);

export default Modal;
