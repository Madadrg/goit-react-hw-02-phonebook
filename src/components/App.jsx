import Section from './Section';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './FilterContacts';
import {
  selectContacts,
  selectError,
  selectIsLoading,
} from '../redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchContacts } from '../redux/operations';
export const App = () => {
  const users = useSelector(selectContacts);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectError);

  // useEffect(() => {
  //   dispatch(fetchContacts());
  // }, [dispatch]);

  useEffect(() => {
    dispatch(fetchContacts()).then(response =>
      console.log('Fetched contacts:', response)
    );
  }, [dispatch]);

  return (
    <>
      <Section title="PhoneBook">
        <ContactForm />
        <Filter />
        {isLoading && !isError ? (
          <b>Request in progress...</b>
        ) : (
          <>
            <ContactList />
            {!users.length ? (
              <h3>Your phonebook is empty. Add your first contact</h3>
            ) : (
              <h4>Your phonebook has {users.length} contacts</h4>
            )}
          </>
        )}
      </Section>
    </>
  );
};
