import { RiDeleteBin2Line } from "react-icons/ri";

const DeleteButton = ({ width }) => {
  return (
    <button className="button">
      <RiDeleteBin2Line className="icon--delete"></RiDeleteBin2Line>
      <style jsx="true">
        {`
          .icon--delete {
            position: relative;
            width: 50%;
            height: auto;
            z-index: -5;
          }
          .button {
            position: relative;
            width: ${width}px;
            height: auto;
            z-index: 10;
            background: none;
            color: inherit;
            border: none;
            padding: 0;
            font: inherit;
            cursor: pointer;
            outline: inherit;
          }

          .button:hover {
            transform: scale(1.2, 1.2);
          }
        `}
      </style>
    </button>
  );
};

export default DeleteButton;
