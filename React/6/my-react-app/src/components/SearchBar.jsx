import React from 'react';

const SearchBar = ({ value, onChange, onClear }) => {
  return (
    <div className="search-bar">
      <input 
        type="text"
        placeholder="Ieškoti naudotojo pagal vardą..."
        value={value}
        onChange={onChange}
      />
      <button onClick={onClear}>Valyti paiešką</button>
    </div>
  );
};

export default React.memo(SearchBar);
