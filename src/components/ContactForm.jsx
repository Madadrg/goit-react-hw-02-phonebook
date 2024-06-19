import React, { useState } from 'react';
import { addContact } from './Api';
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

function ContactForm({ token, setContacts }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const response = await addContact(token, { name, phone });
      setContacts(prev => [...prev, response]);
      setName('');
      setPhone('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Name"
      />
      <Input
        value={phone}
        onChange={e => setPhone(e.target.value)}
        placeholder="Phone"
      />
      <Button type="submit">Add Contact</Button>
    </Form>
  );
}

export default ContactForm;
