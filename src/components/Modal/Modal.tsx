import { useEffect } from 'react';

import css from './Modal.module.css';
import { ModalProps } from '../App.types';

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  useEffect(() => {
    document.addEventListener('keydown', onCloseModal);
    return () => {
      document.removeEventListener('keydown', onCloseModal);
    };
  });

  const onCloseModal = (evt: KeyboardEvent): void => {
    if (evt instanceof KeyboardEvent && evt.code === 'Escape') {
      onClose();
    }
    const { target, currentTarget } = evt;
    if (target === currentTarget) {
      onClose();
    }
  };

  const noCloseModalByClick = (evt: React.MouseEvent): void => {
    evt.stopPropagation();
    onClose();
  };

  // const onCloseModal = (evt): void => {
  //   const { code, target, currentTarget } = evt;
  //   if (code === 'Escape' || target === currentTarget) {
  //     onClose();
  //   }
  // };

  return (
    <div className={css.overlay} onClick={noCloseModalByClick}>
      <div className={css.modal}>{children}</div>
    </div>
  );
};

export default Modal;
