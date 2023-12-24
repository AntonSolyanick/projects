import { useAuth } from "../hooks/use-auth";

import Login from "../components/Login";
import UserInfo from "../components/UserInfo";

const Layout = ({ children }) => {
  const { isAuth, email } = useAuth();

  return (
    <>
      <header>
        <div></div>
        <h1>Projects App</h1>
        {isAuth ? <UserInfo email={email} /> : <Login />}
      </header>

      <main>{children}</main>
      <style jsx="true">
        {`
          header {
            height: 120px;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            align-items: center;
            justify-items: center;

            background-color: #3f3333;
          }
          html {
            min-height: 100vh;
          }
        `}
      </style>
    </>
  );
};

export default Layout;
