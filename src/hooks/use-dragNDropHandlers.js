import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { projectsAction } from "../store/projectsSlice";

const useDragNDropHandlers = () => {
  const [curTodo, setCurTodo] = useState(null);
  const [curBoard, setCurBoard] = useState(null);
  const dispatch = useDispatch();
  const params = useParams();

  const stylesAddingHandler = (e) => {
    const element = e.target.closest(".todo--container");
    if (element.classList.contains("board")) return;
    element.style.boxShadow = "2px 3px 3px white";
    element.style.marginBottom = "10px";
  };

  return {
    dragStartHandler(e, todo, board) {
      setCurTodo(todo);
      setCurBoard(board);
    },

    dragLeaveHandler(e) {
      stylesAddingHandler(e);
    },

    dragOverHandler(e) {
      e.preventDefault();
      let element = e.target;
      if (
        element.classList.contains("board") ||
        element.classList.contains("heading--column")
      )
        return;
      element = element.closest(".todo--container");
      element.style.boxShadow = "0px 4px 3px yellow";
      element.style.marginBottom = "45px";
    },

    dragEndHandler(e) {
      stylesAddingHandler(e);
    },

    dragDropHandler(e, todo, board) {
      e.preventDefault();
      stylesAddingHandler(e);
      dispatch(
        projectsAction.dropAction({
          projectName: params.projectName,
          curTodo: curTodo,
          todo: todo,
          curBoard: curBoard,
          board: board,
        })
      );
    },

    onBoardDropHandler(e, board) {
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
    },
  };
};

export default useDragNDropHandlers;
