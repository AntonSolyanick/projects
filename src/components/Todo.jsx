import DeleteButton from "./DeleteButton";

const Todo = ({
  todo,
  board,
  dragStartHandler,
  dragLeaveHandler,
  dragOverHandler,
  dragEndHandler,
  dragDropHandler,
  deleteTodo,
}) => {
  return (
    <li
      className="todo--container"
      draggable={true}
      onDragStart={(e) => dragStartHandler(e, todo, board)}
      onDragLeave={(e) => dragLeaveHandler(e)}
      onDragOver={(e) => dragOverHandler(e)}
      onDragEnd={(e) => dragEndHandler(e)}
      onDrop={(e) => dragDropHandler(e, todo, board)}
      onTouchStart={(e) => dragStartHandler(e, todo, board)}
      onTouchEnd={(e) => dragEndHandler(e)}
    >
      <p className="todo">{todo.text}</p>
      <div className="todo--sub--container">
        <p className="todo--date">{todo.date}</p>

        <span
          onClick={() => {
            deleteTodo(todo, board[0]);
          }}
        >
          <DeleteButton width={40} />
        </span>
      </div>
      <style jsx="true">
        {`
          .todo--container {
            width: 90%;
            min-height: 60px;
            display: flex;
            justify-content: space-around;
            background-color: #3f3333;
            margin-bottom: 10px;
            border: 1px solid white;
            border-radius: 5px;
            box-shadow: 2px 3px 3px white;
          }
          .todo--sub--container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
          }
          .todo {
            width: 65%;
            font-size: 18px;
            word-break: break-all;
          }
          .todo--date {
            font-size: 11px;
            height: 10%;
          }
        `}
      </style>
    </li>
  );
};

export default Todo;
