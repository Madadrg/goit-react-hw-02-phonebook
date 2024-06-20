import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import Auth from './Auth';
import Navigation from './Navigation';
import UserMenu from './UserMenu';
import { fetchContacts } from './Api';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
`;

const Title = styled.h1`
  color: #333;
`;

function App() {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState('');
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    if (token) {
      fetchContacts(token).then(response => setContacts(response));
      setEmail('user@example.com'); // Replace with actual logic to extract email from token
    }
  }, [token]);

  const handleLogout = () => {
    setToken(null);
    setEmail('');
    setContacts([]);
  };

  return (
    <Router>
      <Container>
        <Navigation />
        {token && <UserMenu email={email} onLogout={handleLogout} />}
        <Title>Phonebook</Title>
        <Routes>
          <Route
            path="/register"
            element={<Auth setToken={setToken} isRegister />}
          />
          <Route path="/login" element={<Auth setToken={setToken} />} />
          <Route
            path="/contacts"
            element={
              token ? (
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
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/" element={<Navigate to="/contacts" />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
