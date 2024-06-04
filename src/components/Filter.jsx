import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from './PhonebookSlice';

function Filter() {
  const filter = useSelector(state => state.phonebook.filter); // Adjusted path to match your state structure
  const dispatch = useDispatch();

  const handleFilterChange = event => {
    dispatch(setFilter(event.target.value));
  };

  return (
    <div>
      Filter: <input value={filter} onChange={handleFilterChange} />
    </div>
  );
}

export default Filter;
