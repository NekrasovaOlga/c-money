import React from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { allCurrenciesSuccess } from '../../store/ext/extAction';
import { succesToken } from '../../store/token/tokenAction';
import { transferFundsSuccess } from '../../store/transfer/transferAction';
import style from './ModalSuccess.module.scss';
import { ReactComponent as CloseIcon } from './img/close.svg';

export const ModalSuccess = () => {
  const overlayRef = useRef(null);
  const dispatch = useDispatch();

  const handleClick = (e) => {
    const target = e.target;
    if (target === overlayRef.current) {
      dispatch(succesToken());
      dispatch(allCurrenciesSuccess());
      dispatch(transferFundsSuccess());
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);
  return (
    <div className={style.overlay} ref={overlayRef}>
      <div className={style.modal}>
        <h2 className={style.title}>Перевод осуществлен!</h2>
        <button
          className={style.close}
          onClick={() => {
            dispatch(succesToken());
            dispatch(allCurrenciesSuccess());
            dispatch(transferFundsSuccess());
          }}
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};
