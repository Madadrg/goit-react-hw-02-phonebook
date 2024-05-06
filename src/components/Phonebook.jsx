import React, { Component } from 'react';
import styles from './Phonebook.module.css';

class Phonebook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      number: '',
    };
  }

  componentDidMount() {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      this.props.setContacts(JSON.parse(storedContacts));
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.contacts !== this.props.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.props.contacts));
    }
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { name, number } = this.state;
    this.props.addContact(name, number);
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;
    const { contacts } = this.props;

    return (
      <div>
        <form onSubmit={this.handleSubmit} className={styles.form}>
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={this.handleChange}
            placeholder="Name"
          />
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[ -.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={this.handleChange}
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
}

export default Phonebook;
