import { ReactNode } from 'react';
import SearchBar from '../../components/searchbar';

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
