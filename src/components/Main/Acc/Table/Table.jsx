import React from 'react';
import formatDate from '../../../../utils/formatDate';
import style from './Table.module.scss';

export const Table = ({ data }) => {
  return (
    <table className={style.table}>
      <thead>
        <tr>
          <th>Счет</th>
          <th>Сумма</th>
          <th>Дата</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr>
            <td>{item.to}</td>
            <td className={style.table__amount}>{item.amount}</td>
            <td className={style.table__date}>{formatDate(item.date)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
