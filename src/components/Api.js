import axios from 'axios';

const API_URL = 'https://connections-api.herokuapp.com';

export const register = async (email, password) => {
  const response = await axios.post(`${API_URL}/users/signup`, {
    email,
    password,
  });
  return response.data;
};

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/users/login`, {
    email,
    password,
  });
  return response.data;
};

export const fetchContacts = async token => {
  const response = await axios.get(`${API_URL}/contacts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const addContact = async (token, contact) => {
  const response = await axios.post(`${API_URL}/contacts`, contact, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteContact = async (token, contactId) => {
  const response = await axios.delete(`${API_URL}/contacts/${contactId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
