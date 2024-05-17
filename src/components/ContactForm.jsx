import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from './ContactsSlice';

function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(addContact({ id: Date.now(), name, number }));
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        Name: <input value={name} onChange={e => setName(e.target.value)} />
      </div>
      <div>
        Number:{' '}
        <input value={number} onChange={e => setNumber(e.target.value)} />
      </div>
      <button type="submit">Add Contact</button>
    </form>
  );
}

export default ContactForm;
