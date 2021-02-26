import { useState } from "react";
const StoryMaximized = ({ story, setIsMax }) => {
  const [storyName, setStoryName] = useState(story.name);
  const [storyType, setStoryType] = useState(story.storyType);
  const [storySize, setStorySize] = useState(story.size);
  const [storyStatus, setStoryStatus] = useState(story.status);
  const [storyDescription, setStoryDescription] = useState(story.description);
  const handleCollapse = () => {
    setIsMax(false);
  };
  return (
    <div className="maxStory">
      <div className="maxStory__header">
        {storyType === "Feature" ? (
          <h1>as a user, i can...</h1>
        ) : storyType === "Bug" ? (
          <h1>as a user, i should be able to... </h1>
        ) : null}
        <button>Start!</button>
        <button onClick={handleCollapse}>Collapse</button>
      </div>
      <textarea value={storyName} />
      <div className="maxStory__dropdowns">
        <select value={storyType}>
          <option value="Feature">Feature</option>
          <option value="Bug">Bug</option>
          <option value="Other">Other</option>
        </select>
        <select value={storySize}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="4">4</option>
          <option value="8">8</option>
        </select>
        <select value={storyStatus}>
          <option value="Unstarted">Unstarted</option>
          <option value="Started">Started</option>
          <option value="Delivered">Delivered</option>
          <option value="Rejected">Rejected</option>
          <option value="Accepted">Accepted</option>
        </select>
      </div>
      <textarea value={storyDescription} />
    </div>
  );
};
export default StoryMaximized;
