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
    <Router>
      <div>
        <Navigation />
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
      </div>
    </Router>
  );
}

export default App;
