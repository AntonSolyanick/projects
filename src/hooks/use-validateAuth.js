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
