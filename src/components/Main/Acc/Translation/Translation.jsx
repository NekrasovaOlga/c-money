import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { transferRequestAsync } from '../../../../store/transfer/transferAction';
import Modal from '../../../Modal';
import { ModalSuccess } from '../../../ModalSuccess/ModalSuccess';
import style from './Translation.module.scss';

export const Translation = ({ id }) => {
  const [to, setTo] = useState('');

  const error = useSelector((state) => state.transfer.error);
  const success = useSelector((state) => state.transfer.success);

  const [amount, setAmount] = useState('');
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      from: id,
      to,
      amount,
    };
    dispatch(transferRequestAsync(data));
    e.target.reset();
  };
  return (
    <form action="" className={style.ext__form} onSubmit={handleSubmit}>
      {error && <Modal formErrors={error} />}
      {success && <ModalSuccess />}

      <div className={style.ext__form__block}>
        <div className={style.ext__form__item}>
          <label htmlFor="to" className={style.ext__form__label}>
            Куда
          </label>
          <input
            type="number"
            name="to"
            id=""
            className={style.ext__form__input}
            onChange={(e) => setTo(e.target.value)}
            required
          ></input>
        </div>
        <div className={style.ext__form__item}>
          <label htmlFor="" className={style.ext__form__label}>
            Сумма
          </label>
          <input
            type="number"
            className={style.ext__form__input}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <button className={'btn ' + style.ext__form__btn}>Перевести</button>
      </div>
    </form>
  );
};
