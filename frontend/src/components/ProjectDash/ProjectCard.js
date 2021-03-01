import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import ProjectEditForm from "./ProjectEditForm";
import ProjectAddCollabForm from "./ProjectAddCollabForm";
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
      {!editing ? (
        <div className="projectCard__header">
          <Link to={`/project/${id}`}>{name}</Link>
          {isOwned ? (
            <>
              <button onClick={handleEdit}>
                <i className="fas fa-edit fa-lg"></i>
              </button>
              <button onClick={handleDelete}>
                <i className="far fa-trash-alt fa-lg"></i>
              </button>
            </>
          ) : null}
        </div>
      ) : null}
      {editing ? (
        <ProjectEditForm
          projectId={id}
          name={name}
          editing={editing}
          setEditing={setEditing}
        />
      ) : null}
      <div className="projectCard__details">
        <h2>Owned by: {owner}</h2>
        {isOwned ? <ProjectAddCollabForm id={id} /> : null}
      </div>
    </div>
  );
}

export default ProjectCard;
