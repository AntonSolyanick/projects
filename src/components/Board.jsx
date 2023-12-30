import { CSSTransition, TransitionGroup } from "react-transition-group";

import Todo from "./Todo";

const Board = ({
  board,
  dragStartHandler,
  dragLeaveHandler,
  dragOverHandler,
  dragEndHandler,
  dragDropHandler,
  onBoardDropHandler,
  deleteTodo,
}) => {
  return (
    <TransitionGroup
      component="ul"
      className="board"
      onDragOver={(e) => dragOverHandler(e)}
      onDrop={(e) => onBoardDropHandler(e, board)}
    >
      {board.map((todo, i) =>
        i === 0 ? (
          <li className="heading--column" key={todo}>
            <h3 className="heading--column">{todo}</h3>
          </li>
        ) : (
          <CSSTransition
            key={todo.milliseconds}
            timeout={300}
            classNames="item-animated"
          >
            <Todo
              board={board}
              todo={todo}
              dragStartHandler={dragStartHandler}
              dragLeaveHandler={dragLeaveHandler}
              dragOverHandler={dragOverHandler}
              dragEndHandler={dragEndHandler}
              dragDropHandler={dragDropHandler}
              deleteTodo={deleteTodo}
            />
          </CSSTransition>
        )
      )}
      <style jsx="true">
        {`
          .heading--column {
            text-transform: capitalize;
          }
          .board {
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: start;
            padding: 0;
            min-height: 50vh;
            width: 400px;
            margin-top: -8px;
          }
          .item-animated-enter {
            opacity: 0;
          }
          .item-animated-enter-active {
            opacity: 1;
            transition: opacity 300ms ease-in;
          }
          .item-animated-exit {
            opacity: 1;
          }
          .item-animated-exit-active {
            opacity: 0;
            transition: opacity 300ms ease-in;
          }
        `}
      </style>
    </TransitionGroup>
  );
};

export default Board;
