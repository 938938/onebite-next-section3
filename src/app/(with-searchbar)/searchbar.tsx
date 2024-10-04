'use client';

import { useState } from 'react';

const SearchBar = () => {
  const [search, setSearch] = useState<string>('');
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  return (
    <div>
      <input value={search} onChange={onChangeSearch} />
      <button>검색</button>
    </div>
  );
};

export default SearchBar;
