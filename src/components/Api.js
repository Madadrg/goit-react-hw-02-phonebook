import axios from 'axios';

// Base URL of your ready-made backend
const api = axios.create({
  baseURL: 'https://your-backend-url.com', // Replace with your backend URL
});

// User registration
export const register = (email, password) =>
  api.post('/register', { email, password });

// User login
export const login = (email, password) =>
  api.post('/login', { email, password });

// Fetch contacts
export const fetchContacts = token =>
  api.get('/contacts', {
    headers: { Authorization: `Bearer ${token}` },
  });

// Add contact
export const addContact = (token, contact) =>
  api.post('/contacts', contact, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Delete contact
export const deleteContact = (token, contactId) =>
  api.delete(`/contacts/${contactId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
