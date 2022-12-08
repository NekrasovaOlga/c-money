import React from 'react';
import style from './Footer.module.scss';
import logo from './img/logo.png';

export const Footer = (props) => {
  return (
    <div className={style.container}>
      <div className={style.logo}>
        <img src={logo} alt="Логотип" />
      </div>
      <div className={style.name}>
        <p>© C-Money, 2022</p>
      </div>
    </div>
  );
};
