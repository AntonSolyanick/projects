import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { projectsAction } from "../store/projectsSlice";
import { useWriteToDatabase } from "../hooks/use-writeToDataBase";
import AddButton from "../components/AddButton";
import Todo from "../components/Todo";
import InputModal from "../components/InputModal";
import useDragNDropHandlers from "../hooks/use-dragNDropHandlers";

const ProjectPage = ({ showModalHandler, showModal }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const writeTodoToDatabase = useWriteToDatabase();
  let user = useSelector((state) => state.user);
  let projects = useSelector((state) =>
    state.projects.filter((project) => {
      return project.projectName === params.projectName;
    })
  );
  let project = projects[0];
  const [inputedTodoName, setInputedTodoName] = useState("");
  const [inputError, setInputError] = useState("");

  useEffect(() => {
    writeTodoToDatabase(user.id, "set", project);
  }, [project]);

  if (!project) {
    const data = JSON.parse(localStorage.getItem("projectData"));
    project = data.filter((project) => {
      return project.projectName === params.projectName;
    })[0];
    dispatch(projectsAction.setProjectsFromDbAction(data));
  }

  const boards = Object.values(project);
  const sortedBoards = [];
  boards.forEach((board) => {
    if (typeof board !== "object") return;
    if (board[0] === "queue") sortedBoards[1] = board;
    if (board[0] === "development") sortedBoards[2] = board;
    if (board[0] === "done") sortedBoards[3] = board;
  });

  const addNewTodo = () => {
    const date = new Date();
    if (inputedTodoName === "") {
      setInputError("Todo name must consist of at least 1 character");
      return;
    }
    dispatch(
      projectsAction.addNewTodoAction({
        projectName: params.projectName,
        todo: {
          text: inputedTodoName,
          date: `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`,
          milliseconds: date.getTime(),
        },
      })
    );
    setInputedTodoName("");
    setInputError("");
    showModalHandler();
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

  const {
    dragStartHandler,
    dragLeaveHandler,
    dragOverHandler,
    dragEndHandler,
    dragDropHandler,
    onBoardDropHandler,
  } = useDragNDropHandlers();

  return (
    <>
      {showModal && (
        <InputModal
          addNewItemHandler={addNewTodo}
          showModalHandler={showModalHandler}
          inputedItemName={inputedTodoName}
          setInputedItemName={setInputedTodoName}
          text={`Choose a todo name`}
          inputError={inputError}
        />
      )}
      <div className="container">
        <h2 className="project--name">{params.projectName}</h2>
        <AddButton
          showModalHandler={showModalHandler}
          height={105}
          width={105}
          border={4}
          text={"New todo"}
          textSize={14}
        />
      </div>

      <section>
        {sortedBoards.map(
          (board, i) =>
            typeof board === "object" && (
              <ul
                key={board[0]}
                className="board"
                onDragOver={(e) => dragOverHandler(e)}
                onDrop={(e) => onBoardDropHandler(e, board)}
              >
                {board.map((todo, i) =>
                  i === 0 ? (
                    <li className="heading--column" key={todo}>
                      <h3>{todo}</h3>
                    </li>
                  ) : (
                    <Todo
                      key={todo.milliseconds}
                      board={board}
                      todo={todo}
                      dragStartHandler={dragStartHandler}
                      dragLeaveHandler={dragLeaveHandler}
                      dragOverHandler={dragOverHandler}
                      dragEndHandler={dragEndHandler}
                      dragDropHandler={dragDropHandler}
                      deleteTodo={deleteTodo}
                    />
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
          .container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-direction: column;
          }

          .board {
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: start;
            padding: 0;

            min-height: 50vh;
            width: 400px;
          }
          .project--name {
            text-shadow: 1px 1px white;
            font-size: 30px;
            color: black;
            margin-top: 10px;
            margin-bottom: 12px;
          }
          .heading--column {
            text-transform: capitalize;
          }
        `}
      </style>
    </>
  );
};

export default ProjectPage;
