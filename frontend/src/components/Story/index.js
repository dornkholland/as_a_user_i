import { Draggable } from "react-beautiful-dnd";
import StoryMaximized from "./StoryMaximized";
import StoryMinimized from "./StoryMinimized";
import { useState } from "react";
import "./Story.css";
const Story = ({ windowName, story, index }) => {
  const [isMax, setIsMax] = useState(false);
  return (
    <Draggable draggableId={`story:${story.id}`} index={index} key={story.id}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
        >
          {isMax ? (
            <StoryMaximized
              windowName={windowName}
              story={story}
              setIsMax={setIsMax}
            />
          ) : (
            <StoryMinimized story={story} setIsMax={setIsMax} creator={false} />
          )}
        </li>
      )}
    </Draggable>
  );
};

export default Story;
