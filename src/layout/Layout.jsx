import { useAuth } from "../hooks/use-auth";

import Login from "../components/Login";
import UserInfo from "../components/UserInfo";

const Layout = ({ children }) => {
  const { isAuth, email } = useAuth();

  return (
    <>
      <header>{isAuth ? <UserInfo email={email} /> : <Login />}</header>

      <main>{children}</main>
    </>
  );
};

export default Layout;
