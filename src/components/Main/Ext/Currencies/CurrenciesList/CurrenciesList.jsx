import React from 'react';
import style from './CurrenciesList.module.scss';
import upImg from './img/up.png';
import downImg from './img/down.png';

export const CurrenciesList = ({ data }) => {
  const { from, to, rate, change } = data;
  return (
    <li className={style.ext__item}>
      <span className={style.ext__item__title}>
        {from}/{to}
      </span>
      <span className={style.ext__item__line}></span>
      <span className={style.ext__item__price}>
        {rate}
        {change === 1 ? <img src={upImg} /> : <img src={downImg} />}
      </span>
    </li>
  );
};
