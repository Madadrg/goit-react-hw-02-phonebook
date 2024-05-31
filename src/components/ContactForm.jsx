import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from './PhonebookSlice';

function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.phonebook.contacts.isLoading);

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(addContact({ name, number }));
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
      <button type="submit" disabled={isLoading}>
        Add Contact
      </button>
      {isLoading && <p>Loading...</p>}
    </form>
  );
}

export default ContactForm;
