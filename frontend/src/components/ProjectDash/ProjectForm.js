import * as projectActions from "../../store/project";
import { useDispatch } from "react-redux";
import React, { useState } from "react";

function ProjectForm() {
  const [projectName, setProjectName] = useState("");
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(
      projectActions.createProject({ projectName })
    );
    if (response.errors) {
      setErrors(response.errors);
    }
    setProjectName("");
  };
  return (
    <div className="projectCreator">
      {errors ? (
        <ul>
          {errors.map((error) => (
            <li>error</li>
          ))}
        </ul>
      ) : null}
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
