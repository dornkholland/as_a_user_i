import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as storyActions from "../../store/story";
import { useParams } from "react-router";
import CommentContainer from "./CommentContainer";

const StoryMaximized = ({
  setCreateToggle,
  creator,
  windowName,
  story,
  setIsMax,
}) => {
  const dispatch = useDispatch();
  const thisStory = useSelector((state) => state.story.stories);
  const { projectId } = useParams();

  const storyNameHandler = () => (story && story.name ? story.name : "");
  const [storyName, setStoryName] = useState(storyNameHandler);
  const storyTypeHandler = () =>
    story && story.storyType ? story.storyType : "Feature";
  const [storyType, setStoryType] = useState(storyTypeHandler);
  const storySizeHandler = () => (story && story.size ? story.size : 1);
  const [storySize, setStorySize] = useState(storySizeHandler);
  const storyStatusHandler = () =>
    story && story.status ? story.status : "Unstarted";
  const [storyStatus, setStoryStatus] = useState(storyStatusHandler());
  const storyDescriptionHandler = () =>
    story && story.description ? story.description : "";
  const [storyDescription, setStoryDescription] = useState(
    storyDescriptionHandler
  );

  const [storyWindow, setStoryWindow] = useState(windowName);

  const deleteStoryHandler = () => {
    dispatch(
      storyActions.deleteStory({ windowName, storyId: story.id, projectId })
    );
  };

  const cancelCreationHandler = () => {
    setCreateToggle(false);
  };

  const handleCollapse = () => {
    setIsMax(false);
  };

  const handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }
    if (creator) {
      dispatch(
        storyActions.createStory({
          storyName,
          storyType,
          storySize,
          storyStatus,
          storyDescription,
          projectId,
          windowName,
        })
      );
      setCreateToggle(false);
    } else {
      dispatch(
        storyActions.updateStory({
          storyId: story.id,
          storyName,
          storyType,
          storySize,
          storyStatus,
          storyDescription,
          projectId,
          windowName: storyWindow,
        })
      );
      setIsMax(false);
    }
  };

  const stateUpdate = (newWindow, newStatus) => {
    dispatch(
      storyActions.updateStory({
        storyId: story.id,
        storyName,
        storyType,
        storySize,
        storyStatus: newStatus,
        storyDescription,
        projectId,
        windowName: newWindow,
        previousWindow: windowName,
      })
    );
    setIsMax(false);
  };

  const handleStateChange = () => {
    switch (storyStatus) {
      case "Unstarted":
        return stateUpdate("In Progress", "In Progress");
      case "In Progress":
        return stateUpdate("Awaiting Review", "Awaiting Review");
      case "Awaiting Review":
        return stateUpdate("Done", "Done");
      case "Rejected":
        return stateUpdate("Backlog", "Unstarted");
      default:
        return;
    }
  };

  const handleRejection = () => {
    return stateUpdate("Rejected", "Rejected");
  };

  function stateButton(storyStatus) {
    switch (storyStatus) {
      case "Unstarted":
        return "Start!";
      case "In Progress":
        return "Deliver!";
      case "Awaiting Review":
        return "Accept";
      case "Rejected":
        return "Restart";
    }
  }

  return (
    <div className="maxStory">
      <div className="maxStory__header">
        {storyType === "Feature" ? (
          <h1 className="header--feature">as a user, i can...</h1>
        ) : storyType === "Bug" ? (
          <h1 className="header--bug">as a user, i should be able to... </h1>
        ) : null}
        {!creator ? (
          <>
            {storyStatus !== "Done" ? (
              <button onClick={handleStateChange}>
                {stateButton(storyStatus)}
              </button>
            ) : null}
            {storyStatus === "Awaiting Review" ? (
              <button onClick={handleRejection}>Reject</button>
            ) : null}
            <button onClick={handleCollapse}>
              <i className="fas fa-window-minimize"></i>
            </button>
          </>
        ) : (
          <button onClick={cancelCreationHandler}>cancel</button>
        )}
      </div>
      <form className="storyEditForm" onSubmit={handleSubmit}>
        <textarea
          value={storyName}
          onChange={(e) => setStoryName(e.target.value)}
        />
        <div className="maxStory__info">
          <div className="maxStory__dropdowns">
            <label htmlFor="storyType">
              Type:
              <select
                id="storyType"
                value={storyType}
                onChange={(e) => setStoryType(e.target.value)}
              >
                <option value="Feature">Feature</option>
                <option value="Bug">Bug</option>
                <option value="Other">Other</option>
              </select>
            </label>
            <label htmlFor="storySize">
              Size:
              <select
                value={storySize}
                onChange={(e) => setStorySize(e.target.value)}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="4">4</option>
                <option value="8">8</option>
              </select>
            </label>
          </div>
          {!creator ? (
            <div className="info__status">
              <h3>status:</h3>
              <h2>{storyStatus}</h2>
            </div>
          ) : null}
        </div>
        <textarea
          value={storyDescription}
          onChange={(e) => setStoryDescription(e.target.value)}
        />
        <button type="submit">
          {creator ? <span>Create Story!</span> : <span>Save Changes</span>}
        </button>
      </form>
      {!creator ? (
        <>
          <CommentContainer story={story} />
          <button className="deleteStoryButton" onClick={deleteStoryHandler}>
            Delete story
          </button>
        </>
      ) : null}
    </div>
  );
};
export default StoryMaximized;
