
import React, { useState, useEffect, FormEvent } from 'react';
import './LocationSearch.css';

export interface LocationType {
  onSearch: Function,
  defaultValue: string,
  loading?: boolean,
}

const LocationSearch: React.FC<LocationType> = ({ onSearch, defaultValue, loading }) => {
  const [search, setSearch] = useState(defaultValue);
  
  const onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }

  useEffect(() => {
    setSearch(defaultValue);
  }, [defaultValue]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search) {
      return;
    }
    
    onSearch(search);
  }

  return (
    <form className="search" onSubmit={onSubmit}>
      <input type="search" className="search__input" name="search" placeholder="eg: Ho Chi Minh" value={search} onChange={onChangeSearch} />
      <button type="submit" className="search__button" disabled={loading}>Search{loading ? '...': ''}</button>
    </form>
  );
}

export default LocationSearch;