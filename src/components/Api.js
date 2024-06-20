import axios from 'axios';

const API_URL = 'https://connections-api.herokuapp.com';

export const register = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/users/signup`, {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error(
      'Error during registration:',
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error(
      'Error during login:',
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const fetchContacts = async token => {
  try {
    const response = await axios.get(`${API_URL}/contacts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching contacts:',
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const addContact = async (token, contact) => {
  try {
    const response = await axios.post(`${API_URL}/contacts`, contact, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      'Error adding contact:',
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const deleteContact = async (token, contactId) => {
  try {
    await axios.delete(`${API_URL}/contacts/${contactId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return contactId;
  } catch (error) {
    console.error(
      'Error deleting contact:',
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
