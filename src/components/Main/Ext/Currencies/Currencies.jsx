import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currencyFeedAsuncRequest } from '../../../../store/ext/extAction';
import style from './Currencies.module.scss';
import CurrenciesList from './CurrenciesList';

export const Currencies = ({ data }) => {
  const list = useSelector((state) => state.ext.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(currencyFeedAsuncRequest());
  }, [list]);

  return (
    <ul className={style.ext__items}>
      {list.map((item, index) => (
        <CurrenciesList key={index} data={item} />
      ))}
    </ul>
  );
};
