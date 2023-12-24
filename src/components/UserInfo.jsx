import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { userActions } from "../store/userSlice";

const UserInfo = ({ email }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate("/");
  };

  return (
    <div className="block">
      <p>{email}</p>
      <button
        onClick={() => {
          dispatch(userActions.removeUser());
          localStorage.removeItem("userData");
          goToHomePage();
        }}
      >
        Log out
      </button>

      <style jsx="true">{`
        .block {
          height: 90px;
          width: 200px;
          justify-content: center;
          border: 1px solid black;
        }
      `}</style>
    </div>
  );
};

export default UserInfo;
