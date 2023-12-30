import { GoPlus } from "react-icons/go";

const AddButton = ({ showModalHandler, text }) => {
  return (
    <div className="box--container" onClick={showModalHandler}>
      <GoPlus className="icon--plus"></GoPlus>
      <p className="text">{text}</p>
      <style jsx="true">{`
        .icon--plus {
          width: 70%;
          height: auto;
        }
        .box--container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          width: 100%;
          height: 100%;
        }
        .text {
          margin: 0;
        }
      `}</style>
    </div>
  );
};

export default AddButton;
