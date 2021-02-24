import * as projectActions from "../../store/project";
import { useDispatch } from "react-redux";
import React, { useState } from "react";

function ProjectForm() {
  const [projectName, setProjectName] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    return dispatch(projectActions.createProject({ projectName }));
  };
  return (
    <div className="projectCreator">
      <form onSubmit={handleSubmit}>
        <input
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          name="name"
          id="name"
          type="text"
        />
        <button type="submit" className="addProject">
          Create Project!
        </button>
      </form>
    </div>
  );
}

export default ProjectForm;
