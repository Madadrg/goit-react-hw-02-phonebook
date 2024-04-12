// App.jsx
import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import Phonebook from './Phonebook';

function App() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const addContact = () => {
    const newContact = { id: nanoid(), name, number };
    setContacts([...contacts, newContact]);
    setName('');
    setNumber('');
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Phonebook
        contacts={contacts}
        name={name}
        number={number}
        setName={setName}
        setNumber={setNumber}
        addContact={addContact}
      />
    </div>
  );
}

export default App;
