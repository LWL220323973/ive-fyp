import React from 'react';
import { Input } from 'antd';
import '../style/searchbar.css';

function SearchBar({ placeholder, onSearch, onChange, value }) {
  return (
    <Input.Search
      placeholder={placeholder}
      onSearch={onSearch}
      onChange={onChange}
      value={value}
      enterButton
      className="search-bar"
    />
  );
}

export default SearchBar;
