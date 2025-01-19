import { Droppable } from 'react-beautiful-dnd';
import StoryMaximized from '../Story/StoryMaximized';
import * as storyActions from '../../store/story';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Story from '../Story';
const StoryContainer = ({ name, createToggle, setCreateToggle }) => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const stories = useSelector((state) => state.story.stories);

  //filters out non matching window stories and then sorts by index.
  const myStories = Object.values(stories)
    .filter((story) => story.window === name)
    .sort((a, b) => (a.index > b.index ? 1 : -1));

  return (
    <div className="storyContainer">
      {createToggle ? (
        <StoryMaximized
          windowName={name}
          creator={true}
          setCreateToggle={setCreateToggle}
        />
      ) : null}
      <Droppable type="story" direction="vertical" droppableId={name}>
        {(provided) => (
          <ul ref={provided.innerRef} {...provided.droppableProps}>
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
    </div>
  );
};

export default StoryContainer;
