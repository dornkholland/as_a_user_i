import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ProjectCard from "./ProjectCard";
import * as projectActions from "../../store/project";

function ProjectDash() {
  const dispatch = useDispatch();
  const sessionProject = useSelector((state) => state.project);
  console.log(sessionProject);
  const sessionUser = useSelector((state) => state.session.user);
  useEffect(() => {
    const response = dispatch(projectActions.getProjects());
    console.log(response);
  }, []);
  if (!sessionUser) return <Redirect to="/" />;
  return (
    <div className="dashContainer">
      <h1>My Projects</h1>
      <div className="projectContainer"></div>
      <ProjectCard name="test1" owner="dude" />
    </div>
  );
}

export default ProjectDash;
