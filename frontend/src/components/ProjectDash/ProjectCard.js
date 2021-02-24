import { useState } from "react";
import ProjectEditForm from "./ProjectEditForm";
function ProjectCard({ name, owner, lastUpdated, isOwned }) {
  const [editing, setEditing] = useState(false);

  const handleCancelEdit = () => {
    setEditing((prev) => !prev);
  };

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
        <>
          <ProjectEditForm name={name} />
          <button onClick={handleCancelEdit}>Cancel Changes </button>
        </>
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
