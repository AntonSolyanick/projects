import { IoClose } from "react-icons/io5";

const Modal = ({ children, showModalHandler }) => {
  return (
    <div
      className="backdrop"
      onClick={(e) => {
        if (e.target.className !== "backdrop") return;
        showModalHandler(false);
      }}
    >
      <div className="modal">
        <IoClose
          className="icon--close"
          onClick={() => showModalHandler(false)}
        />
        {children}
      </div>
      <style jsx="true">
        {`
          .modal {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background-color: #3f3333;
            border-radius: 20px;
            width: 450px;
            height: 250px;
            border: 1px solid white;
            box-shadow: 2px 3px 3px white;
          }
          .icon--close {
            position: relative;
            top: -60px;
            right: -200px;
          }
          .backdrop {
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            top: 0;
            right: 0;
            width: 100vw;
            height: 100vh;
            background-color: rgb(0, 0, 0, 0.8);
            backdrop-filter: blur(4px);
            z-index: 100;
          }

          .icon--close:hover {
            cursor: pointer;
          }
        `}
      </style>
    </div>
  );
};

export default Modal;
