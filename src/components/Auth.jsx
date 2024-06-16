import React, { useState } from 'react';
import { register, login } from './Api';

const Auth = ({ setToken, isRegister = false }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = async event => {
    event.preventDefault();
    try {
      if (isRegister) {
        await register(email, password);
      } else {
        const response = await login(email, password);
        setToken(response.data.token);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleAuth}>
      <h1>{isRegister ? 'Register' : 'Login'}</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
    </form>
  );
};

export default Auth;
