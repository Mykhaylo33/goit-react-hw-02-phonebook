import React from "react";

const FilterContact = ({ filter, onFilterChange }) => {
  const handleInputChange = (event) => {
    const { value } = event.target;
    onFilterChange(value.toLowerCase());
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search contacts"
        value={filter}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default FilterContact;
