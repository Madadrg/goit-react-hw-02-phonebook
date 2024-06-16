import React, { useState } from 'react';
import { register, login } from './Api';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 300px;
  margin: 0 auto;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 5px;
  width: 100%;
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  margin-bottom: 10px;
`;

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
        setEmail(response.data.email); // Assuming the API returns the email
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form onSubmit={handleAuth}>
      <h1>{isRegister ? 'Register' : 'Login'}</h1>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <Button type="submit">{isRegister ? 'Register' : 'Login'}</Button>
    </Form>
  );
};

export default Auth;
