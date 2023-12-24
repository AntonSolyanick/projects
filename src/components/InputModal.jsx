import Modal from "./Modal";

const InputModal = ({
  text,
  addNewItemHandler,
  showModalHandler,
  inputedItemName,
  setInputedItemName,
  inputError,
}) => {
  const setInputedItemNameHandler = (e) => {
    setInputedItemName(e.target.value);
  };

  return (
    <Modal showModalHandler={showModalHandler}>
      <form
        className="container--input"
        onSubmit={(e) => {
          e.preventDefault();
          setInputedItemName("");
          addNewItemHandler();
        }}
      >
        <p className="modal--title">{text}</p>
        <input
          className="modal--input"
          onChange={setInputedItemNameHandler}
          value={inputedItemName}
          placeholder="insert a text here"
        ></input>
        <button type="submit">submit</button>
      </form>
      {inputError && <p className="error--message">{inputError}</p>}
      <style jsx="true">
        {`
          .modal--title {
            margin-top: 0;
          }
          .modal--input {
            margin-right: 10px;
          }
          .container--input {
            position: relative;
            top: -20px;
          }
        `}
      </style>
    </Modal>
  );
};

export default InputModal;
