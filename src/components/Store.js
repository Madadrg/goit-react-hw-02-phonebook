import { configureStore } from '@reduxjs/toolkit';
import phonebookReducer from './PhonebookSlice';

const store = configureStore({
  reducer: {
    contacts: phonebookReducer,
    // Include other reducers if necessary
  },
});

export default store;
