import { configureStore } from '@reduxjs/toolkit';
import phonebookReducer from './PhonebookSlice';

const store = configureStore({
  reducer: {
    phonebook: phonebookReducer,
  },
});

export default store;
