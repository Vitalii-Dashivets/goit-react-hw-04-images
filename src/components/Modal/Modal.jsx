import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#root_modal');

export const Modal = ({ onCloseModal, largeImageUrl }) => {
  const closeOverlay = e => {
    if (e.target === e.currentTarget) {
      onCloseModal();
    }
  };

  useEffect(() => {
    const closeModal = e => {
      if (e.code === 'Escape') {
        onCloseModal();
      }
    };
    window.addEventListener('keydown', closeModal);
    return () => {
      window.removeEventListener('keydown', closeModal);
    };
  }, [onCloseModal]);

  return createPortal(
    <div className={css.Overlay} onClick={closeOverlay}>
      <div className={css.Modal}>
        <img src={largeImageUrl} alt="" />
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  largeImageUrl: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};
