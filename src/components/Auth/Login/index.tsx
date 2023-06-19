import React, { useState, FormEvent } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LOGIN_USER } from '../../../graphql/mutation/auth';
import { ROOT_PAGE } from '../../../routes';
import { loginUser } from '../../../store/authSlice';
import { ILoginData } from '../../../types';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginUserMutation, { loading, error }] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      const { token } = data.loginUser;
      const idBuyer = data.loginUser.user.buyerProfile.id;
      dispatch(loginUser({ token, idBuyer }));
      navigate(ROOT_PAGE);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const loginData: ILoginData = {
      username,
      password,
    };
    loginUserMutation({ variables: loginData });
  };

  return (
    <div>
      <h1>Страница авторизации</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={username}
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading}>
          Войти
        </button>
        {error && <p>Ошибка авторизации</p>}
      </form>
    </div>
  );
}

export default Login;
