// ContactList.jsx
import React from 'react';
import styles from './Phonebook.module.css';

function ContactList({ contacts, onDeleteContact }) {
  return (
    <ul className={styles.contactList}>
      {contacts.map(contact => (
        <li key={contact.id} className={styles.contactListItem}>
          <span className={styles.contactName}>{contact.name}</span> -{' '}
          <span className={styles.contactNumber}>{contact.number}</span>
          <button onClick={() => onDeleteContact(contact.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default ContactList;
