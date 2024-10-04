import { ReactNode } from "react";

const Layout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <div>
      <div>서치바</div>
      {children}
    </div>
  );
};

export default Layout;
