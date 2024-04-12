// Filter.jsx
import React from 'react';

function Filter({ value, onChange }) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Search Contacts"
    />
  );
}

export default Filter;
