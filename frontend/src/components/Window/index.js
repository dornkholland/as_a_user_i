import StoryMaximized from '../Story/StoryMaximized';
import { useState } from 'react';
import * as windowActions from '../../store/window';
import { Draggable } from 'react-beautiful-dnd';
import { useSelector, useDispatch } from 'react-redux';
import StoryContainer from './StoryContainer';
import { X, PlusSquare } from 'react-feather';
import './Window.css';
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
            <h2 className="windowHeader__title">{name}</h2>
            {['IceBox', 'Backlog', 'Issues'].includes(name) ? (
              <button
                onClick={handleCreateStory}
                className="windowHeader__create"
              >
                <PlusSquare size={30} />
              </button>
            ) : null}
            <button onClick={handleMinimize} className="windowHeader__minimize">
              <X size={20} />
            </button>
          </div>
          <StoryContainer
            name={name}
            createToggle={createToggle}
            setCreateToggle={setCreateToggle}
          />
        </li>
      )}
    </Draggable>
  );
}

export default Window;
