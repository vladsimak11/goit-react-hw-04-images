import css from './Modal.module.css';
import propTypes from 'prop-types';
import { useEffect } from 'react';

export const Modal = ({onClose, children}) => {

  useEffect(() => {
    
    const handleKeyDown = e => {
      if(e.code === 'Escape') {
        onClose();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);

  }, [onClose])

  
  const handleBackDropClick = e => {
    if(e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div className={css.overlay} onClick = {handleBackDropClick}>
      <div className={css.modal}>
        {children}
      </div>
    </div>
  );
  
}

Modal.propTypes = {
  children: propTypes.node,
};
