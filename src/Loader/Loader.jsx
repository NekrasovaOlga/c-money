import React from 'react';
import style from './Loader.module.scss';
import FadeLoader from 'react-spinners/FadeLoader';

export const Loader = () => {
  return (
    <div className={style.preloader}>
      <FadeLoader color="#C6B6D7" css={{ display: 'block' }} size={80} />
    </div>
  );
};
