import { useState } from "react";
import ProjectEditForm from "./ProjectEditForm";
function ProjectCard({ id, name, owner, lastUpdated, isOwned }) {
  const [editing, setEditing] = useState(false);

  const handleEdit = () => {
    setEditing((prev) => !prev);
  };
  const handleDelete = () => {
    console.log("delete");
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
