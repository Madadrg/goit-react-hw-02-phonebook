import React from 'react';
import { deleteContact } from './Api';

function ContactList({ token, contacts, setContacts }) {
  const handleDelete = async contactId => {
    try {
      await deleteContact(token, contactId);
      setContacts(prev => prev.filter(contact => contact.id !== contactId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <ul>
        {contacts.map(contact => (
          <li key={contact.id}>
            {contact.name} {contact.phone}
            <button onClick={() => handleDelete(contact.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContactList;
