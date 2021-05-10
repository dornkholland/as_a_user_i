import { Droppable } from "react-beautiful-dnd";
import * as storyActions from "../../store/story";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Story from "../Story";
const StoryContainer = ({ name }) => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const stories = useSelector((state) => state.story.stories);
  const myStories = Object.values(stories).filter(
    (story) => story.window === name
  );
  return (
    <Droppable type="story" direction="vertical" droppableId={name}>
      {(provided) => (
        <ul
          className="storyContainer"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {myStories.map((story, index) => (
            <Story
              story={story}
              windowName={name}
              index={index}
              key={story.id}
            />
          ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
};

export default StoryContainer;
