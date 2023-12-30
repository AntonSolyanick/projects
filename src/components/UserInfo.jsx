import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { userActions } from "../store/userSlice";
import { projectsAction } from "../store/projectsSlice";

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
          goToHomePage();
          localStorage.removeItem("projectData");
          localStorage.removeItem("userData");
          dispatch(userActions.removeUser());
          dispatch(projectsAction.setProjectsFromDbAction([]));
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
