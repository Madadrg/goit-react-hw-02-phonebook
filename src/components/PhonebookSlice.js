import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching contacts
export const fetchContacts = createAsyncThunk(
  'phonebook/fetchContacts',
  async (_, thunkAPI) => {
    // Fetch contacts from an API or other source
    const response = await fetch('/api/contacts');
    return response.json();
  }
);

// Async thunk for adding a contact
export const addContact = createAsyncThunk(
  'phonebook/addContact',
  async (contact, thunkAPI) => {
    // Add contact to an API or other source
    const response = await fetch('/api/contacts', {
      method: 'POST',
      body: JSON.stringify(contact),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  }
);

// Async thunk for deleting a contact
export const deleteContact = createAsyncThunk(
  'phonebook/deleteContact',
  async (contactId, thunkAPI) => {
    // Delete contact from an API or other source
    await fetch(`/api/contacts/${contactId}`, {
      method: 'DELETE',
    });
    return contactId;
  }
);

const phonebookSlice = createSlice({
  name: 'phonebook',
  initialState: {
    contacts: {
      items: [],
      isLoading: false,
      error: null,
    },
    filter: '',
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => {
        state.contacts.isLoading = true;
        state.contacts.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = action.error.message;
      })
      .addCase(addContact.pending, state => {
        state.contacts.isLoading = true;
        state.contacts.error = null;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.items.push(action.payload);
      })
      .addCase(addContact.rejected, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = action.error.message;
      })
      .addCase(deleteContact.pending, state => {
        state.contacts.isLoading = true;
        state.contacts.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.items = state.contacts.items.filter(
          contact => contact.id !== action.payload
        );
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = action.error.message;
      });
  },
});

export const { setFilter } = phonebookSlice.actions;

export default phonebookSlice.reducer;
