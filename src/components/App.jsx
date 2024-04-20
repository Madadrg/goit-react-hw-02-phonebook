import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';

function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  // Load contacts from localStorage when component mounts
  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  // Save contacts to localStorage whenever contacts state changes
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = newContact => {
    const isDuplicate = contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );
    if (isDuplicate) {
      alert('Contact with this name already exists!');
      return;
    }
    setContacts([...contacts, newContact]);
  };

  const handleFilterChange = event => {
    setFilter(event.target.value);
  };

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={deleteContact}
      />
    </div>
  );
}

export default App;
