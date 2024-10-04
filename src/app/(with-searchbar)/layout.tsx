import { ReactNode } from 'react';
import SearchBar from './searchbar';

const Layout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <div>
      <SearchBar />
      {children}
    </div>
  );
};

export default Layout;
