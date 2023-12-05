import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getDatabase, ref, set } from "firebase/database";

import { projectsAction } from "../store/projectsSlice";

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

  useEffect(() => {
    const db = getDatabase();
    set(ref(db, `${user.id}/${project.projectName}`), {
      queue: project.queue,
      development: project.development,
      done: project.done,
    });
  }, [project]);

  const addNewTodo = () => {
    const text = prompt();
    dispatch(
      projectsAction.addNewTodoAction({
        projectName: params.projectName,
        text: text,
      })
    );
  };

  const dragStartHandler = (e, todo, board) => {
    setCurTodo(todo);
    setCurBoard(board);
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
    console.log(project);
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
    console.log(project);
  };

  return (
    <>
      <h2>Todos of {params.projectName} project </h2>
      <button onClick={addNewTodo}>add new Todo</button>
      <section>
        <ul
          className="board"
          onDragOver={(e) => dragOverHandler(e)}
          onDrop={(e) => onBoardDropHandler(e, project.queue)}
        >
          <li>
            <h3>{project.queue[0]}</h3>
          </li>
          {project.queue.map(
            (todo, i) =>
              i > 0 && (
                <li
                  className="todo"
                  draggable={true}
                  onDragStart={(e) => dragStartHandler(e, todo, project.queue)}
                  onDragLeave={(e) => dragLeaveHandler(e)}
                  onDragOver={(e) => dragOverHandler(e)}
                  onDragEnd={(e) => dragEndHandler(e)}
                  onDrop={(e) => dragDropHandler(e, todo, project.queue)}
                  onTouchStart={(e) => dragStartHandler(e, todo, project.queue)}
                  onTouchEnd={(e) => dragEndHandler(e)}
                >
                  {todo}
                </li>
              )
          )}
        </ul>

        <ul
          className="board"
          onDragOver={(e) => dragOverHandler(e)}
          onDrop={(e) => onBoardDropHandler(e, project.development)}
        >
          <li>
            <h3>{project.development[0]}</h3>
          </li>
          {project.development.map(
            (todo, i) =>
              i > 0 && (
                <li
                  className="todo"
                  draggable={true}
                  onDragStart={(e) =>
                    dragStartHandler(e, todo, project.development)
                  }
                  onDragLeave={(e) => dragLeaveHandler(e)}
                  onDragOver={(e) => dragOverHandler(e)}
                  onDragEnd={(e) => dragEndHandler(e)}
                  onDrop={(e) => dragDropHandler(e, todo, project.development)}
                  onTouchStart={(e) =>
                    dragStartHandler(e, todo, project.development)
                  }
                  onTouchEnd={(e) => dragEndHandler(e)}
                >
                  {todo}
                </li>
              )
          )}
        </ul>

        <ul>
          <li>
            <h3>{project.done[0]}</h3>
          </li>
          {project.done.map((todo, i) => i > 0 && <li>{todo}</li>)}
        </ul>
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
