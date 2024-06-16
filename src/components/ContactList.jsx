import React from 'react';
import { deleteContact } from './Api';
import styled from 'styled-components';

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

const Button = styled.button`
  padding: 5px 10px;
  background-color: #dc3545;
  color: white;
  border: none;
  cursor: pointer;
`;

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
    <List>
      {contacts.map(contact => (
        <ListItem key={contact.id}>
          {contact.name} {contact.phone}
          <Button onClick={() => handleDelete(contact.id)}>Delete</Button>
        </ListItem>
      ))}
    </List>
  );
}

export default ContactList;
