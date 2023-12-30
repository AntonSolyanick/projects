import { useState } from "react";
import { useDispatch } from "react-redux";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import Modal from "./Modal";
import { userActions } from "../store/userSlice";
import { useValidateAuth } from "../hooks/use-validateAuth";

const SignupModal = ({ setShowSignUpModal }) => {
  const dispatch = useDispatch();
  const [SignUpError, setSignUpError] = useState("   ");
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
      .catch((error) => {
        setSignUpError(error.message);
      });
    if (SignUpError) return;
    setSignUpError("");
    setEmailInput("");
    setPasswordInput("");
    setShowSignUpModal(false);
  };

  return (
    <Modal
      showModalHandler={() => {
        setShowSignUpModal();
      }}
    >
      <form
        className="container--signup"
        onSubmit={(e) => {
          e.preventDefault();
          handlerRegister(emailInput, passwordInput);
        }}
      >
        <input
          autoFocus
          className="input--signup"
          type="email"
          placeholder="email"
          value={emailInput}
          onChange={(e) => {
            setEmailInput(e.target.value);
          }}
        />
        <input
          className="input--signup"
          type="password"
          placeholder="password"
          value={passwordInput}
          onChange={(e) => {
            e.preventDefault();
            setPasswordInput(e.target.value);
          }}
        />
        <button className="button--create--account" type="submit">
          Create an account
        </button>
      </form>
      {SignUpError && <p className="error--message">{SignUpError}</p>}
      <style jsx="true">
        {`
          .container--signup {
            display: flex;
            align-items: center;
            flex-direction: column;
            width: 270px;
          }
          .input--signup {
            margin-bottom: 7px;
          }
          .button--create--account {
            width: 100px;
          }
        `}
      </style>
    </Modal>
  );
};

export default SignupModal;
