import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ProjectCard from "./ProjectCard";
import * as projectActions from "../../store/project";

function ProjectDash() {
  const dispatch = useDispatch();
  const sessionProject = useSelector((state) => state.project.projects);
  console.log(sessionProject);
  const sessionUser = useSelector((state) => state.session.user);
  useEffect(() => {
    const response = dispatch(projectActions.getProjects());
  }, []);
  if (!sessionUser) return <Redirect to="/" />;
  return (
    <div className="dashContainer">
      <div className="owned">
        <h1>My Projects</h1>
        <div className="owned__container"></div>
        {sessionProject
          ? sessionProject.owned.map((project) => {
              return (
                <ProjectCard
                  name={project.name}
                  owner={sessionUser.name}
                  lastUpdated={project.updatedAt.slice(0, 10)}
                />
              );
            })
          : null}
      </div>
      <div className="collab"></div>
    </div>
  );
}

export default ProjectDash;
