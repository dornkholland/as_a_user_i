import { Redirect } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProjectCard from "./ProjectCard";
import "./ProjectDash.css";
import * as projectActions from "../../store/project";

function ProjectDash() {
  const dispatch = useDispatch();
  //const projects = useSelector((state) => state.projects.project);
  useEffect(() => {
    dispatch(projectActions.getProjects());
  }, []);
  const sessionUser = useSelector((state) => state.session.user);
  if (!sessionUser) return <Redirect to="/" />;
  return (
    <div className="dashContainer">
      <h1>My Projects</h1>
      <div className="projectContainer">
        <ProjectCard name="test1" owner="testowner1" lastUpdated="12/3/2020" />
        <ProjectCard name="test2" owner="testowner2" lastUpdated="22/3/2020" />
      </div>
    </div>
  );
}

export default ProjectDash;
