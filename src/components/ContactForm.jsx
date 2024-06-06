import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from './PhonebookSlice';

function ContactForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState(''); // Updated state variable
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.phonebook.contacts.isLoading);

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(addContact({ name, phone })); // Updated property name
    setName('');
    setPhone(''); // Updated state reset
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        Name: <input value={name} onChange={e => setName(e.target.value)} />
      </div>
      <div>
        Phone: {/* Updated label */}
        <input value={phone} onChange={e => setPhone(e.target.value)} />{' '}
        {/* Updated state setter */}
      </div>
      <button type="submit" disabled={isLoading}>
        Add Contact
      </button>
      {isLoading && <p>Loading...</p>}
    </form>
  );
}

export default ContactForm;
