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

  const handleMinimize = () => {
    dispatch(windowActions.windowToggle(name));
  };

  return (
    <Draggable draggableId={name} index={index} key={name}>
      {(provided) => (
        <li
          className="window"
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
        >
          <div className="windowHeader">
            <h2>{name}</h2>
            <div className="windowHeader__buttons">
              {["IceBox", "Backlog", "Issues"].includes(name) ? (
                <button onClick={handleCreateStory}>+</button>
              ) : null}
              <button onClick={handleMinimize}>
                <i className="fas fa-window-minimize"></i>
              </button>
            </div>
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
