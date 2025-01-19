import { Droppable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import './Workspace.css';
import Window from '../Window';

function Workspace() {
  const windows = useSelector((state) => state.window.windows);
  return (
    <div className="workspace">
      <Droppable
        type="window"
        droppableId="windowContainer"
        direction="horizontal"
      >
        {(provided) => (
          <ul
            className="windowContainer"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {windows.map((name, idx) => (
              <Window key={name} name={name} index={idx} />
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  );
}

export default Workspace;
