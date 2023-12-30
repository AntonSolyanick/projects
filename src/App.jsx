import { useSelector } from "react-redux/es/hooks/useSelector";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getDatabase, ref, child, get } from "firebase/database";

import Layout from "./layout/Layout";
import AnimatedRoutes from "./components/AnimatedRoutes";
import { userActions } from "../src/store/userSlice";
import { projectsAction } from "./store/projectsSlice";

function App() {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects);
  const userData = useSelector((state) => state.user);
  const data = JSON.parse(localStorage.getItem("projectData"));

  useEffect(() => {
    const projectDataLocalStor = JSON.stringify(projects);
    projectDataLocalStor.length > 0
      ? localStorage.setItem("projectData", projectDataLocalStor)
      : localStorage.setItem("projectData", projectDataLocalStor);
  }, [projects]);

  useEffect(() => {
    if (localStorage.getItem("userData")) {
      const userDataLocalStor = JSON.parse(localStorage.getItem("userData"));
      dispatch(userActions.setUser(userDataLocalStor));
    }
    const dbRef = ref(getDatabase());
    get(child(dbRef, `${userData.id}`))
      .then((snapshot) => {
        const dataFromDb = snapshot.val();
        dataFromDb === null
          ? dispatch(projectsAction.setProjectsFromDbAction(data))
          : dispatch(projectsAction.setProjectsFromDbAction(snapshot.val()));
      })
      .catch((error) => {
        //console.error(error);
      });
  }, [userData]);

  const [showModal, setShowModal] = useState(false);

  const showModalHandler = () => {
    setShowModal((prevState) => !prevState);
  };

  return (
    <>
      <Layout showModal={showModal} showModalHandler={showModalHandler}>
        <AnimatedRoutes
          showModal={showModal}
          showModalHandler={showModalHandler}
        ></AnimatedRoutes>
      </Layout>
      <style jsx="true">
        {`
          * {
            list-style-type: none;
            color: white;
          }
          html {
            background: linear-gradient(to top left, #3f3333, #7b7070);
          }
          a {
            text-decoration: none;
          }
          .block {
            background: #7b7070;
            border-radius: 15px;
          }
          .error--message {
            max-width: 370px;
            word-break: break-all;
            position: fixed;
            margin-top: 195px;
            font-size: 18px;
          }
          button {
            font-size: 15px;
            background: #252728;
            border-radius: 5px;
            padding-left: 10px;
            padding-right: 10px;
            border: none;
          }
          input {
            font-size: 15px;
            height: 22px;
            width: 230px;
            border: none;
            border-radius: 5px;
            background-color: #ffff77;
            color: black;
          }
          input::placeholder {
            color: black;
          }
          button:hover {
            cursor: pointer;
          }
        `}
      </style>
    </>
  );
}

export default App;
