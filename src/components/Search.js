import React from 'react';

export default ({ inputValue, onChange, onClick}) => {
    return (
      <div className="search-container">
      <form onSubmit={onClick}> 
        <input
          type="text"
          value={inputValue}
          onChange={onChange}
        />
        <button type="submit">
          Search
        </button>
      </form>
      </div>
    )
}