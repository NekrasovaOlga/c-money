import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  currencyUserAsuncRequest,
  currencBuyAsync,
} from '../../../store/ext/extAction';
import style from './Ext.module.scss';
import Currencies from './Currencies';
import Usercurrencies from './Usercurrencies';
import Modal from '../../Modal';

export const Ext = () => {
  const token = useSelector((state) => state.token.token);
  const userCurrent = useSelector((state) => state.ext.currentUser);
  const error = useSelector((state) => state.ext.error);
  const dispatch = useDispatch();
  const [fromBuy, setFromBuy] = useState('');
  const [toBuy, settoBuy] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    if (userCurrent.length > 0) {
      setFromBuy(userCurrent[0].code);
      settoBuy(userCurrent[1].code);
    }
  }, [userCurrent]);

  useEffect(() => {
    dispatch(currencyUserAsuncRequest());
  }, [token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      from: fromBuy,
      to: toBuy,
      amount,
    };
    setAmount('');
    e.target.reset();
    dispatch(currencBuyAsync(data));
  };

  return (
    <div className={style.container}>
      {error && <Modal formErrors={error} />}

      <h2 className="title">Обмен валюты</h2>
      <div className={style.ext}>
        <div className={style.ext__time}>
          <h3 className={style.ext__title}>
            Изменение курса в режиме реального времени
          </h3>
          <Currencies />
        </div>
        <div className={style.ext__exchange}>
          <form action="" className={style.ext__form} onSubmit={handleSubmit}>
            <h3 className={style.ext__title}>Обмен валюты</h3>
            <div className={style.ext__form__block}>
              <div className={style.ext__form__item}>
                <label htmlFor="from" className={style.ext__form__label}>
                  Откуда
                </label>
                <select
                  name="from"
                  id=""
                  className={style.ext__form__input}
                  value={fromBuy}
                  onChange={(e) => setFromBuy(e.target.value)}
                >
                  {userCurrent.map((item, index) => (
                    <option value={item.code}>{item.code}</option>
                  ))}
                </select>
              </div>
              <div className={style.ext__form__item}>
                <label htmlFor="to" className={style.ext__form__label}>
                  Куда
                </label>
                <select
                  name="to"
                  id=""
                  value={toBuy}
                  className={style.ext__form__input}
                  onChange={(e) => settoBuy(e.target.value)}
                >
                  {userCurrent.map((item) => (
                    <option value={item.code}>{item.code}</option>
                  ))}
                </select>
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
            </div>
            <button className={'btn ' + style.ext__form__btn}>Обменять</button>
          </form>
          <div className={style.ext__currencies}>
            <h4>Мои валюты</h4>
            <div className={style.ext__currencies__items}>
              {userCurrent.map((item, index) => (
                <Usercurrencies key={index} data={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
