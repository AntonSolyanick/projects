import { useDispatch } from "react-redux";

import { userActions } from "../store/userSlice";

const UserInfo = ({ email }) => {
  const dispatch = useDispatch();

  return (
    <>
      <p>{email}</p>
      <button onClick={() => dispatch(userActions.removeUser())}>
        Log out
      </button>
    </>
  );
};

export default UserInfo;
