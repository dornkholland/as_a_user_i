import StoryMaximized from "../Story/StoryMaximized";
import { useState } from "react";
import * as windowActions from "../../store/window";
import { Draggable } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import StoryContainer from "./StoryContainer";
import "./Window.css";
function Window({ name, index }) {
  const dispatch = useDispatch();
  const allStories = useSelector((state) => state.story.stories);
  const [createToggle, setCreateToggle] = useState(false);
  const handleCreateStory = () => {
    setCreateToggle((prev) => !prev);
  };
  return (
    <Draggable draggableId={name} index={index} key={name}>
      {(provided) => (
        <li
          className="window"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div {...provided.dragHandleProps} className="windowHeader">
            <h2>{name}</h2>
            {["IceBox", "Backlog"].includes(name) ? (
              <button onClick={handleCreateStory}>+</button>
            ) : null}
          </div>
          {createToggle ? (
            <StoryMaximized
              windowName={name}
              creator={true}
              setCreateToggle={setCreateToggle}
            />
          ) : null}
          <StoryContainer name={name} />
        </li>
      )}
    </Draggable>
  );
}

export default Window;
