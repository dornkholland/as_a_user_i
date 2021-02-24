import * as projectActions from "../../store/project";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
function ProjectEditForm({ name }) {
  const [projectName, setProjectName] = useState(name);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    //return dispatch(projectActions.editProject({ projectName }));
  };
  return (
    <div className="projectEditor">
      <form onSubmit={handleSubmit}>
        <input
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          name="name"
          id="name"
          type="text"
        />
        <button type="submit">submit changes</button>
      </form>
    </div>
  );
}
export default ProjectEditForm;
