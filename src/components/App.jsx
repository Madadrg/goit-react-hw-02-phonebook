import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import Auth from './Auth';
import { fetchContacts } from './Api';

function App() {
  const [token, setToken] = useState(null);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    if (token) {
      fetchContacts(token).then(response => setContacts(response.data));
    }
  }, [token]);

  return (
    <div>
      <h1>Phonebook</h1>
      {token ? (
        <>
          <ContactForm token={token} setContacts={setContacts} />
          <h2>Contacts</h2>
          <Filter />
          <ContactList
            token={token}
            contacts={contacts}
            setContacts={setContacts}
          />
        </>
      ) : (
        <Auth setToken={setToken} />
      )}
    </div>
  );
}

export default App;
