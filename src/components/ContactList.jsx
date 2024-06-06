import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchContacts, deleteContact } from './PhonebookSlice';

function ContactList() {
  const contacts = useSelector(state => state.phonebook.contacts.items);
  const filter = useSelector(state => state.phonebook.filter);
  const isLoading =
    useSelector(state => state.phonebook?.contacts?.isLoading) ?? true;
  const error = useSelector(state => state.phonebook.contacts.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong. Please try again later</p>;

  return (
    <div>
      <ul>
        {filteredContacts?.map(contact => (
          <li key={contact.id}>
            {contact.name} {contact.phone} {/* Corrected property */}
            <button onClick={() => dispatch(deleteContact(contact.id))}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContactList;
