import { useState } from "react";
import { useDispatch } from "react-redux";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { userActions } from "../store/userSlice";
import { useValidateAuth } from "../hooks/validate-auth";
import SignupModal from "../components/SignupModal";

const Login = () => {
  const dispatch = useDispatch();
  const [loginError, setLoginError] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [showSignupModal, setShowSignUpModal] = useState(false);
  const validateAuth = useValidateAuth();

  const handlerLogin = (email, password) => {
    if (validateAuth(email, password)) {
      setLoginError("Please input correct data");
      return;
    }

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          userActions.setUser({
            email: user.email,
            token: user.accessToken,
            id: user.uid,
          })
        );
      })
      .catch((error) => {});
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handlerLogin(emailInput, passwordInput);
        }}
      >
        <input
          type="email"
          placeholder="email"
          value={emailInput}
          onChange={(e) => {
            setEmailInput(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="password"
          value={passwordInput}
          onChange={(e) => {
            e.preventDefault();

            setPasswordInput(e.target.value);
          }}
        />
        <button type="submit">Login</button>
      </form>

      {loginError && <h2>{loginError}</h2>}

      {showSignupModal && (
        <SignupModal setShowSignUpModal={setShowSignUpModal} />
      )}
      <button onClick={() => setShowSignUpModal((prevState) => !prevState)}>
        Signup
      </button>
    </>
  );
};

export default Login;
