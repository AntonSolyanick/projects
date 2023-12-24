import Modal from "./Modal";

const ErrorModal = ({ showModalHandler, loginError }) => {
  return (
    <Modal showModalHandler={showModalHandler}>
      <p>{loginError}</p>

      <style jsx="true"></style>
    </Modal>
  );
};

export default ErrorModal;
