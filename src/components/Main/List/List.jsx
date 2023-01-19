import { useEffect, useState } from 'react';
import style from './List.module.scss';
import Cart from './Cart';
import { useDispatch, useSelector } from 'react-redux';
import {
  authCreateAccAsunc,
  authRequestAsunc,
  authRequestSuccess,
} from '../../../store/auth/authAction';

export const List = () => {
  const [filter, setFilter] = useState(false);
  const [filterActive, setFilterActive] = useState('По дате');
  const auth = useSelector((state) => state.auth.data);
  const token = useSelector((state) => state.token.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.length > 0) return;
    dispatch(authRequestAsunc());
  }, [token]);

  useEffect(() => {
    dispatch(authRequestSuccess(auth));
  }, [filter]);

  const filterList = ['По дате', 'По номеру счета', 'По цене'];
  if (filterActive === filterList[0]) {
    auth.sort((a, b) => {
      const firstDate = a.date ? +new Date(a.date) : 0;
      const secondDate = b.date ? +new Date(b.date) : 0;
      return firstDate - secondDate;
    });
  }
  if (filterActive === filterList[1]) {
    auth.sort((a, b) => {
      return a.account - b.account;
    });
  }
  if (filterActive === filterList[2]) {
    auth.sort((a, b) => {
      return a.balance - b.balance;
    });
  }
  const handleFilter = (e) => {
    setFilterActive(e);
    setFilter(false);
  };

  const handleCreateAcc = () => {
    dispatch(authCreateAccAsunc());
  };
  return (
    <div className={style.container}>
      <div className={style.header}>
        <h2 className="title">Здравствуйте, Александр!</h2>
        <button
          className={'btn ' + style.btn}
          onClick={() => handleCreateAcc()}
        >
          Открыть новый счет
        </button>
      </div>
      <div className={style.block}>
        <div className={style.block__title}>Мои счета</div>
        <div className={style.filter}>
          <p className={style.filter__title}>Сортировка</p>
          <div
            className={style.filter_active}
            onClick={() => setFilter(!filter)}
          >
            {filterActive}
          </div>
          {filter && (
            <ul className={style.filter_item}>
              {filterList.map((item, index) => {
                return (
                  <li
                    key={index}
                    className={style.filter_item__list}
                    onClick={() => handleFilter(item)}
                  >
                    {item}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
      <div className={style.list}>
        {auth.map((item) => {
          return <Cart key={item.account} data={item} />;
        })}
      </div>
    </div>
  );
};
