import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { infoIDRequest, INFO_ID } from '../../../../store/ext/extAction';
import formatDate from '../../../../utils/formatDate';
import style from './Cart.module.scss';

export const Cart = ({ data }) => {
  const { account: id, balance, transactions, date } = data;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const openCart = (id) => {
    dispatch(infoIDRequest(id));
    navigate(`/acc/${id}`);
  };

  return (
    <div className={style.cart} onClick={(e) => openCart(id)}>
      <div className={style.id}>{id}</div>
      <div className={style.price}>{balance} ₽</div>
      <div className={style.data}>
        <div className={style.creation__date}>
          <p>открыт</p>
          {date && formatDate(date)}
        </div>
        <div className={style.last__operation}>
          <p>последняя операция</p>
          {transactions.length > 0 && formatDate(transactions[0].date)}
        </div>
      </div>
    </div>
  );
};
