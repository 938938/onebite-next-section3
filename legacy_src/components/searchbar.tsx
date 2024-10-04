'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const SearchBar = () => {
  const router = useRouter();
  const [search, setSearch] = useState<string>('');
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const onSubmit = () => {
    router.push(`/search?q=${search}`);
  };
  return (
    <div>
      <input value={search} onChange={onChangeSearch} />
      <button onClick={onSubmit}>검색</button>
    </div>
  );
};

export default SearchBar;
