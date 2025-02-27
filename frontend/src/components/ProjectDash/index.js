import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import ProjectCard from './ProjectCard';
import ProjectForm from './ProjectForm';
import * as projectActions from '../../store/project';
import './ProjectDash.css';

function ProjectDash() {
  const dispatch = useDispatch();
  const sessionProject = useSelector((state) => state.project.projects);
  const sessionUser = useSelector((state) => state.session.user);
  const [owned, setOwned] = useState([]);
  const [collab, setCollab] = useState([]);
  useEffect(() => {
    const response = dispatch(projectActions.getProjects());
  }, [dispatch]);
  useEffect(() => {
    if (sessionProject) {
      setOwned(sessionProject.owned);
      setCollab(sessionProject.collab);
    }
  }, [sessionProject.owned]);

  if (!sessionUser) return <Redirect to="/" />;
  return (
    <div className="dashContainer">
      <ProjectForm />
      <div className="owned">
        <h1>Owned Projects</h1>
        <ul className="owned__container">
          {sessionProject.owned.map((project) => {
            return (
              <li key={project.id}>
                <ProjectCard
                  id={project.id}
                  name={project.name}
                  owner={sessionUser.name}
                  lastUpdated={project.updatedAt.slice(0, 10)}
                  isOwned={true}
                />
              </li>
            );
          })}
        </ul>
      </div>
      <h1>Collaborating Projects</h1>
      <ul className="collab__container">
        {collab.map((project) => {
          return (
            <li key={project.id}>
              <ProjectCard
                id={project.id}
                name={project.name}
                owner={project.ownerName}
                lastUpdated={project.updatedAt.slice(0, 10)}
                isOwned={false}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ProjectDash;
