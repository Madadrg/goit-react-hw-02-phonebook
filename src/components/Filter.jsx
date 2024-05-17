import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateFilter } from './ContactsSlice';

function Filter() {
  const filter = useSelector(state => state.contacts.filter);
  const dispatch = useDispatch();

  const handleFilterChange = event => {
    dispatch(updateFilter(event.target.value));
  };

  return (
    <div>
      Filter: <input value={filter} onChange={handleFilterChange} />
    </div>
  );
}

export default Filter;
