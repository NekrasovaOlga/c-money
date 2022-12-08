import React from 'react';
import style from './Usercurrencies.module.scss';

export const Usercurrencies = ({ data }) => {
  const { amount, code } = data;
  return (
    <div className={style.ext__currencies__item}>
      <span className={style.ext__currencies__title}>{code}</span>
      <span className={style.ext__currencies__price}>{amount}</span>
    </div>
  );
};
