import * as projectActions from '../../store/project';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Plus } from 'react-feather';
function ProjectAddCollaboratorForm({ id }) {
  const dispatch = useDispatch();
  const [collabId, setCollabId] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      projectActions.addCollaborator({
        projectId: id,
        collaboratorId: collabId,
      }),
    );
    setCollabId('');
  };
  return (
    <form onSubmit={handleSubmit} className="addCollabForm">
      <label htmlFor="addCollaborator">Enter in collaborator id:</label>
      <input
        type="number"
        id="addCollaborator"
        value={collabId}
        onChange={(e) => setCollabId(e.target.value)}
      />
      <button type="submit">
        <Plus size={25} />
      </button>
    </form>
  );
}

export default ProjectAddCollaboratorForm;
