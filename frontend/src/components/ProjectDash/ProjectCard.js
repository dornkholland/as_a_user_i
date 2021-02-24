import { useState } from "react";
import { useDispatch } from "react-redux";
import ProjectEditForm from "./ProjectEditForm";
import * as projectActions from "../../store/project";
function ProjectCard({ id, name, owner, lastUpdated, isOwned }) {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);

  const handleEdit = () => {
    setEditing((prev) => !prev);
  };
  const handleDelete = async () => {
    dispatch(projectActions.deleteProject({ id }));
  };
  return (
    <div className="projectCard">
      {!editing ? <h1>{name}</h1> : null}
      {editing ? (
        <div>
          <ProjectEditForm
            projectId={id}
            name={name}
            editing={editing}
            setEditing={setEditing}
          />
        </div>
      ) : null}
      <h2>Owned by: {owner}</h2>
      <h3>last updated: {lastUpdated}</h3>
      {isOwned && !editing ? (
        <>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      ) : null}
    </div>
  );
}

export default ProjectCard;
