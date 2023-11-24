import { useState } from "react";
import { useDispatch } from "react-redux";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import Modal from "./Modal";
import { userActions } from "../store/userSlice";
import { useValidateAuth } from "../hooks/validate-auth";

const SignupModal = ({ setShowSignUpModal }) => {
  const dispatch = useDispatch();
  const [SignUpError, setSignUpError] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const validateAuth = useValidateAuth();

  const handlerRegister = (emailInput, passwordInput) => {
    const validateErrorMessage = validateAuth(emailInput, passwordInput);
    if (validateErrorMessage) {
      setSignUpError(validateErrorMessage);
      return;
    }
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, emailInput, passwordInput)
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
    if (SignUpError) return;
    setEmailInput("");
    setPasswordInput("");
    setShowSignUpModal(false);
  };

  return (
    <Modal>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          handlerRegister(emailInput, passwordInput);
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
        <button type="submit"> Create an account</button>
      </form>
      {SignUpError && <h2>{SignUpError}</h2>}
    </Modal>
  );
};

export default SignupModal;
