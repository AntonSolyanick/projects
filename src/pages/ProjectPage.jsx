import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { projectsAction } from "../store/projectsSlice";
import { useWriteToDatabase } from "../hooks/use-writeToDataBase";
import AddButton from "../components/AddButton";
import Board from "../components/Board";
import InputModal from "../components/InputModal";
import useDragNDropHandlers from "../hooks/use-dragNDropHandlers";

const ProjectPage = ({ showModalHandler, showModal }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const writeTodoToDatabase = useWriteToDatabase();
  let userData = useSelector((state) => state.user);
  let projects = useSelector((state) =>
    state.projects?.filter((project) => {
      return project.projectName === params.projectName;
    })
  );
  let project = projects[0];
  const [inputedTodoName, setInputedTodoName] = useState("");
  const [inputError, setInputError] = useState("");
  useEffect(() => {
    if (userData.id === null) return;
    writeTodoToDatabase(userData.id, "set", project);
  }, [project]);

  const sortedBoards = [];

  if (project) {
    const boards = Object.values(project);
    boards.forEach((board) => {
      if (typeof board !== "object") return;
      if (board[0] === "queue") sortedBoards[1] = board;
      if (board[0] === "development") sortedBoards[2] = board;
      if (board[0] === "done") sortedBoards[3] = board;
    });
  }
  const addNewTodo = () => {
    const date = new Date();
    if (inputedTodoName === "") {
      setInputError("Todo name must consist of at least 1 character");
      return;
    }
    dispatch(
      projectsAction.addNewTodoAction({
        projectName: params.projectName,
        todo: inputedTodoName,
      })
    );
    setInputedTodoName("");
    setInputError("");
    showModalHandler();
  };

  const deleteTodo = (todo, titleColumn) => {
    dispatch(
      projectsAction.deleteTodoAction({
        projectName: params.projectName,
        titleColumn: titleColumn,
        todo: todo,
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
    <motion.div
      initial={{
        width: 0,
      }}
      animate={{
        width: "100%",
        transition: { duration: 0.3 },
      }}
    >
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
        <h2 className="project--name--heading ">{params.projectName}</h2>
        <div className="button--add">
          <AddButton showModalHandler={showModalHandler} text={"New todo"} />
        </div>
      </div>

      <section>
        {sortedBoards.map(
          (board, i) =>
            typeof board === "object" && (
              <Board
                key={board[0]}
                board={board}
                onBoardDropHandler={onBoardDropHandler}
                dragStartHandler={dragStartHandler}
                dragLeaveHandler={dragLeaveHandler}
                dragOverHandler={dragOverHandler}
                dragEndHandler={dragEndHandler}
                dragDropHandler={dragDropHandler}
                deleteTodo={deleteTodo}
              ></Board>
            )
        )}
      </section>

      <style jsx="true">
        {`
          * {
            text-align: center;
          }
          .button--add {
            width: 70px;
            height: 70px;
            border: 2px solid white;
            border-radius: 1px;
            font-size: 10px;

            margin-bottom: 10px;
          }
          .button--add:hover {
            cursor: pointer;
            transform: scale(1.03, 1.03);
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
          .project--name--heading {
            margin: 0;
            text-shadow: 1px 1px white;
            font-size: 42px;
            color: black;
            font-weight: bold;
          }
        `}
      </style>
    </motion.div>
  );
};

export default ProjectPage;
