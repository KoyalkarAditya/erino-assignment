import AppBar from "./AppBar";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="h-full w-full flex flex-col">
      <AppBar />
      {children}
    </div>
  );
};

export default Layout;
