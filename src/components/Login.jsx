import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { projectsAction } from "../store/projectsSlice";
import { userActions } from "../store/userSlice";
import { modalActions } from "../store/modalSlice";
import { useValidateAuth } from "../hooks/use-validateAuth";
import SignupModal from "../components/SignupModal";
import ErrorModal from "./ErrorModal";

const Login = () => {
  const dispatch = useDispatch();
  const showErrorModal = useSelector((state) => state.modal.showErrorModal);
  const [loginError, setLoginError] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [showSignupModal, setShowSignUpModal] = useState(false);
  const validateAuth = useValidateAuth();
  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate("/");
  };

  const setShowErrorModal = () => {
    dispatch(modalActions.setShowErrorModal());
  };

  const handlerLogin = (email, password) => {
    if (validateAuth(email, password)) {
      setShowErrorModal();
      setLoginError("Please input correct data");
      return;
    }
    localStorage.removeItem("projectData");
    dispatch(projectsAction.setProjectsFromDbAction([]));
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        const userData = {
          email: user.email,
          token: user.accessToken,
          id: user.uid,
        };
        dispatch(userActions.setUser(userData));
        localStorage.setItem("userData", JSON.stringify(userData));
        goToHomePage();
      })
      .catch((error) => {
        setShowErrorModal();
        setLoginError("Invalid email or password");
        return;
      });
  };

  return (
    <div className="container--login">
      <form
        className="container--form"
        onSubmit={(e) => {
          e.preventDefault();
          handlerLogin(emailInput, passwordInput);
        }}
      >
        <input
          className="login--input"
          type="email"
          placeholder="email"
          value={emailInput}
          onChange={(e) => {
            setEmailInput(e.target.value);
          }}
        />
        <input
          className="login--input"
          type="password"
          placeholder="password"
          value={passwordInput}
          onChange={(e) => {
            e.preventDefault();
            setPasswordInput(e.target.value);
          }}
        />
        <button className="button--login" type="submit">
          Log in
        </button>
      </form>

      {showErrorModal && (
        <ErrorModal
          loginError={loginError}
          showModalHandler={setShowErrorModal}
        />
      )}
      {showSignupModal && (
        <SignupModal setShowSignUpModal={setShowSignUpModal} />
      )}
      <div>
        <button
          className="button--signup"
          onClick={() => setShowSignUpModal((prevState) => !prevState)}
        >
          Sign up
        </button>
      </div>
      <style jsx="true">
        {`
          .login--input {
            width: 200px;
          }
          .container--login {
            display: flex;
            height: 90px;
            width: 300px;
            justify-content: space-around;
          }
          .container--form {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
          }
          .button--signup {
            height: 60px;
            width: 60px;
            margin-top: 20%;
          }
          .button--login {
            width: 80px;
          }
        `}
      </style>
    </div>
  );
};

export default Login;
