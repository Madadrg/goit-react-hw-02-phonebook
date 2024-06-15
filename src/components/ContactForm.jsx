import React, { useState } from 'react';
import { addContact } from './Api';

function ContactForm({ token, setContacts }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const response = await addContact(token, { name, phone });
      setContacts(prev => [...prev, response.data]);
      setName('');
      setPhone('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        Name: <input value={name} onChange={e => setName(e.target.value)} />
      </div>
      <div>
        Phone: <input value={phone} onChange={e => setPhone(e.target.value)} />
      </div>
      <button type="submit">Add Contact</button>
    </form>
  );
}

export default ContactForm;
