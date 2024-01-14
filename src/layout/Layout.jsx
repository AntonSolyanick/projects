import { Link, useLocation } from "react-router-dom";

import { useAuth } from "../hooks/use-auth";
import Login from "../components/Login";
import UserInfo from "../components/UserInfo";

const Layout = ({ children }) => {
  const { isAuth, email } = useAuth();

  return (
    <>
      <header>
        <div></div>
        <span className="heading--container">
          <Link to="/" className="link">
            <h1 className="heading">Projects App</h1>
          </Link>
        </span>
        {isAuth ? <UserInfo email={email} /> : <Login />}
      </header>

      <main>{children}</main>
      <style jsx="true">
        {`
          header {
            height: 120px;
            display: grid;
            grid-template-columns: 1fr 2fr 1fr;
            align-items: center;
            justify-items: center;

            background-color: #3f3333;
          }
          html {
            min-height: 100vh;
          }
          .heading--container {
            display: flex;
            justify-content: center;
            align-items: center;
          }
          // .project--name--heading {
          //   text-shadow: 1px 1px white;
          //   font-size: 32px;
          //   color: black;
          //   font-weight: bold;
          // }
          .heading:hover {
            transform: scale(1.03, 1.03);
            text-shadow: 1px 1px 1px white;
          }
        `}
      </style>
    </>
  );
};

export default Layout;
