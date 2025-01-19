import { Maximize2 } from 'react-feather';

const StoryMinimized = ({ setIsMax, story }) => {
  const handleMaximize = () => {
    setIsMax(true);
  };

  const unstartedWindows = ['Backlog', 'Icebox', 'Issues'];

  return (
    <div className="miniStory">
      <div className="miniStory__header">
        <p>{story.name}</p>
        <button onClick={handleMaximize}>
          <Maximize2 size={15} />
        </button>
      </div>
      <div className="miniStory__details">
        <p>{story.storyType}</p>
        <p>Size: {story.size}</p>
        <p>
          Status:{' '}
          {unstartedWindows.includes(story.window) ? 'Unstarted' : story.window}
        </p>
      </div>
    </div>
  );
};
export default StoryMinimized;
