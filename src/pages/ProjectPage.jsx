import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { projectsAction } from "../store/projectsSlice";
import { useWriteToDatabase } from "../hooks/use-writeToDataBase";

const ProjectPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [curTodo, setCurTodo] = useState(null);
  const [curBoard, setCurBoard] = useState(null);

  const project = useSelector(
    (state) =>
      state.projects.filter((project) => {
        return project.projectName === params.projectName;
      })[0]
  );
  const user = useSelector((state) => state.user);
  const writeTodoToDatabase = useWriteToDatabase();

  const boards = Object.values(project);
  const sortedBoards = [];
  boards.forEach((board) => {
    if (typeof board !== "object") return;
    if (board[0] === "queue") sortedBoards[1] = board;
    if (board[0] === "development") sortedBoards[2] = board;
    if (board[0] === "done") sortedBoards[3] = board;
  });

  useEffect(() => {
    writeTodoToDatabase(user.id, "set", project);
  }, [project]);

  const addNewTodo = () => {
    const text = prompt();
    const date = new Date();
    dispatch(
      projectsAction.addNewTodoAction({
        projectName: params.projectName,
        todo: {
          text: text,
          date: `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`,
        },
      })
    );
  };

  const deleteTodo = (todoText, titleColumn) => {
    dispatch(
      projectsAction.deleteTodoAction({
        projectName: params.projectName,
        titleColumn,
        todoText,
      })
    );
  };

  const dragStartHandler = (e, todo, board) => {
    setCurTodo(todo);
    setCurBoard(board);
    console.log(todo, board);
  };

  const dragLeaveHandler = (e) => {};

  const dragOverHandler = (e) => {
    e.preventDefault();
  };
  const dragEndHandler = (e) => {};

  const dragDropHandler = (e, todo, board) => {
    e.preventDefault();
    if (e.target.className !== "todo") {
      return;
    }

    dispatch(
      projectsAction.dropAction({
        projectName: params.projectName,
        curTodo: curTodo,
        todo: todo,
        curBoard: curBoard,
        board: board,
      })
    );
  };

  const onBoardDropHandler = (e, board) => {
    e.preventDefault();
    if (e.target.className !== "board") {
      return;
    }
    dispatch(
      projectsAction.dropOnBoardAction({
        projectName: params.projectName,
        curTodo: curTodo,
        curBoard: curBoard,
        board: board,
      })
    );
  };

  return (
    <>
      <h2>Todos of {params.projectName} project </h2>
      <button onClick={addNewTodo}>add new Todo</button>

      <section>
        {sortedBoards.map(
          (board, i) =>
            typeof board === "object" && (
              <ul
                className="board"
                onDragOver={(e) => dragOverHandler(e)}
                onDrop={(e) => onBoardDropHandler(e, board)}
              >
                {board.map((todo, i) =>
                  i === 0 ? (
                    <li>
                      <h3>{todo}</h3>
                    </li>
                  ) : (
                    <li>
                      <p
                        className="todo"
                        draggable={true}
                        onDragStart={(e) => dragStartHandler(e, todo, board)}
                        onDragLeave={(e) => dragLeaveHandler(e)}
                        onDragOver={(e) => dragOverHandler(e)}
                        onDragEnd={(e) => dragEndHandler(e)}
                        onDrop={(e) => dragDropHandler(e, todo, board)}
                        onTouchStart={(e) => dragStartHandler(e, todo, board)}
                        onTouchEnd={(e) => dragEndHandler(e)}
                      >
                        {todo.text}
                      </p>

                      <p>{todo.date}</p>
                      <button onClick={() => deleteTodo(todo, board[0])}>
                        delete
                      </button>
                    </li>
                  )
                )}
              </ul>
            )
        )}
      </section>

      <style jsx="true">
        {`
          * {
            text-align: center;
          }

          section {
            display: flex;
            justify-content: space-around;
          }

          ul {
            border: solid 2px;
            border-radius: 20px;
            height: 400px;
            width: 300px;
          }
        `}
      </style>
    </>
  );
};

export default ProjectPage;
