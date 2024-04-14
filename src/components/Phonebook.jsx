// Phonebook.jsx
import React from 'react';
import styles from './Phonebook.module.css';

function Phonebook({ contacts, name, number, setName, setNumber, addContact }) {
  const handleChange = event => {
    const { name, value } = event.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    addContact();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[ -.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={handleChange}
          placeholder="Phone Number"
        />
        <button type="submit">Add Contact</button>
      </form>
      <ul className={styles.contacts}>
        {contacts.map(contact => (
          <li key={contact.id}>
            {contact.name} - {contact.number}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Phonebook;
