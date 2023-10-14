import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState } from "react";

import { addNewTodoAction } from "../store";
import { dropAction } from "../store";

const ProjectPage = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const projects = useSelector((state) =>
    state.filter((project) => {
      return project.name === params.projectName;
    })
  );

  const addNewTodo = () => {
    dispatch(
      addNewTodoAction({ projectName: params.projectName, text: prompt() })
    );
  };

  const [curTodo, setCurTodo] = useState(null);

  const dragStartHandler = (e, todo) => {
    setCurTodo(todo);
    //console.log("start", todo);
  };
  const dragLeaveHandler = (e) => {};
  const dragOverHandler = (e) => {
    e.preventDefault();
  };
  const dragEndHandler = (e) => {};
  const dragDropHandler = (e, todo) => {
    e.preventDefault();
    dispatch(dropAction({ curTodo: { ...curTodo }, todo: { ...todo } }));
    //console.log("drop", todo);
  };

  return (
    <>
      <h2>Todos of {params.projectName} project </h2>
      <button onClick={addNewTodo}>add new Todo</button>
      <section>
        <ul>
          <li>
            <h3>{projects[0].categories.queue.title}</h3>
          </li>
          {projects[0].categories.queue.todos.map((todo) => (
            <li
              draggable={true}
              onDragStart={(e) => dragStartHandler(e, todo)}
              onDragLeave={(e) => dragLeaveHandler(e)}
              onDragOver={(e) => dragOverHandler(e)}
              onDragEnd={(e) => dragEndHandler(e)}
              onDrop={(e) => dragDropHandler(e, todo)}
            >
              {todo.text}
            </li>
          ))}
        </ul>

        <ul>
          <li>
            <h3>{projects[0].categories.development.title}</h3>
          </li>
          {projects[0].categories.development.todos.map((todo) => (
            <li>{todo.text}</li>
          ))}
        </ul>

        <ul>
          <li>
            <h3>{projects[0].categories.done.title}</h3>
          </li>
          {projects[0].categories.done.todos.map((todo) => (
            <li>{todo.text}</li>
          ))}
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
