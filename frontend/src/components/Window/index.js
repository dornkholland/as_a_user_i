import * as windowActions from "../../store/window";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import "./Window.css";
function Window({ name, index }) {
  const dispatch = useDispatch();
  return (
    <Draggable draggableId={name} index={index} key={name}>
      {(provided) => (
        <li
          className="window"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <h2>{name}</h2>
        </li>
      )}
    </Draggable>
  );
}

export default Window;
