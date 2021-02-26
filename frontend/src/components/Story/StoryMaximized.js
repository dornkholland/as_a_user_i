import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as storyActions from "../../store/story";
import { useParams } from "react-router";

const StoryMaximized = ({ windowName, story, setIsMax }) => {
  const dispatch = useDispatch();
  const thisStory = useSelector((state) => state.story.stories);
  const { projectId } = useParams();

  const [storyName, setStoryName] = useState(story.name);
  const [storyType, setStoryType] = useState(story.storyType);
  const [storySize, setStorySize] = useState(story.size);
  const [storyStatus, setStoryStatus] = useState(story.status);
  const [storyDescription, setStoryDescription] = useState(story.description);

  const handleCollapse = () => {
    setIsMax(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      storyActions.updateStory({
        storyId: story.id,
        storyName,
        storyType,
        storySize,
        storyStatus,
        storyDescription,
        projectId,
        windowName,
      })
    );
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
      <form className="storyEditForm" onSubmit={handleSubmit}>
        <textarea
          value={storyName}
          onChange={(e) => setStoryName(e.target.value)}
        />
        <div className="maxStory__dropdowns">
          <select
            value={storyType}
            onChange={(e) => setStoryType(e.target.value)}
          >
            <option value="Feature">Feature</option>
            <option value="Bug">Bug</option>
            <option value="Other">Other</option>
          </select>
          <select
            value={storySize}
            onChange={(e) => setStorySize(e.target.value)}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="4">4</option>
            <option value="8">8</option>
          </select>
          <select
            value={storyStatus}
            onChange={(e) => setStoryStatus(e.target.value)}
          >
            <option value="Unstarted">Unstarted</option>
            <option value="Started">Started</option>
            <option value="Delivered">Delivered</option>
            <option value="Rejected">Rejected</option>
            <option value="Accepted">Accepted</option>
          </select>
        </div>
        <textarea
          value={storyDescription}
          onChange={(e) => setStoryDescription(e.target.value)}
        />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};
export default StoryMaximized;
