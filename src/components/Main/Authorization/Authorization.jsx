import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { tokenRequestAsunc } from '../../../store/token/tokenAction';
import Modal from '../../Modal';
import style from './Authorization.module.scss';

export const Authorization = (props) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setformErrors] = useState('');
  const [focus, setFocus] = useState(false);
  const [focusLogin, setFocusLogin] = useState(false);

  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.token);
  const error = useSelector((state) => state.token.error);
  const navigate = useNavigate();

  const handleValidation = (target) => {
    const result = target.value.replace(/[^a-z]/g, '');
    if (target.name === 'login') {
      setLogin(result);
    } else {
      setPassword(result);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(tokenRequestAsunc(login, password));
    e.target.reset();
  };

  useEffect(() => {
    if (!token) return;
    navigate('/main');
  }, [token]);

  return (
    <div className={style.container}>
      {error && <Modal formErrors="Неверный логин или пароль!" />}
      <form action="" className={style.form} onSubmit={handleSubmit}>
        <h2 className={style.title}>Вход в аккаунт</h2>
        <label htmlFor="logo" className={style.form__label}>
          Логин
          {focusLogin && (
            <p className={style.error}>Логин должен быть не менее 6 символов</p>
          )}
        </label>

        <input
          type="text"
          className={style.form__input}
          value={login}
          onChange={(e) => handleValidation(e.target)}
          onFocus={(e) => setFocusLogin(false)}
          onBlur={(e) => {
            if (login.length < 6) {
              setFocusLogin(true);
            } else {
              setFocusLogin(false);
            }
          }}
          name="login"
        />

        <label htmlFor="password" className={style.form__label}>
          Пароль
          {focus && (
            <p className={style.error}>
              Пароль должен быть не менее 6 символов
            </p>
          )}
        </label>
        <input
          type="password"
          className={style.form__input}
          value={password}
          onChange={(e) => handleValidation(e.target)}
          onFocus={(e) => setFocus(false)}
          onBlur={(e) => {
            if (password.length < 6) {
              setFocus(true);
            } else {
              setFocus(false);
            }
          }}
          name="password"
        />
        <button
          type="submit"
          className={'btn ' + style.btn}
          disabled={!focus && !focusLogin ? '' : 'disabled'}
        >
          Войти
        </button>
      </form>
    </div>
  );
};
