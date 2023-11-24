export const useValidateAuth = () => {
  return (emailInput, passwordInput) => {
    const re = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    let errorMessage = "";

    if (!re.test(String(emailInput).toLowerCase())) {
      errorMessage += "Please try another email!";
    }
    if (passwordInput.length < 6) {
      errorMessage += " Password length must be at least 6 symbols!";
    }

    return errorMessage;
  };
};

// import { useState } from "react";

// export const useValidateAuth = () => {
//   const [errorMessage, setErrorMessage] = useState("");

//   return (emailInput, passwordInput) => {
//     const re = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

//     if (!re.test(String(emailInput).toLowerCase())) {
//       setErrorMessage((prevState) => prevState + "Please try another email!");
//     }
//     if (passwordInput.length < 6) {
//       setErrorMessage(
//         (prevState) => prevState + "Password must be at least 6 symbols!"
//       );
//     }

//     return errorMessage;
//   };
// };
