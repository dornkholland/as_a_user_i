import * as projectActions from '../../store/project';
import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
function ProjectEditForm({ projectId, name, editing, setEditing }) {
  const [projectName, setProjectName] = useState(name);
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(projectActions.editProject({ projectId, projectName }));
    setEditing((prev) => !prev);
  };
  const handleCancelEdit = (e) => {
    e.preventDefault();
    setEditing((prev) => !prev);
  };
  return (
    <form className="projectEditForm" onSubmit={handleSubmit}>
      <input
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        name="name"
        id="name"
        type="text"
      />
      <button type="submit">
        <i className="fas fa-check fa-large"></i>
      </button>
      <button onClick={handleCancelEdit}>Cancel</button>
    </form>
  );
}
export default ProjectEditForm;
