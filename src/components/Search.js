import React from 'react';

export default ({ inputValue, onChange, onClick}) => {
    return (
      <div className="search-container">
        <input
          type="text"
          value={inputValue}
          onChange={onChange}
        />
        <button
          type="submit"
          onClick={onClick}
        >
          Search
        </button>
      </div>
    )
}