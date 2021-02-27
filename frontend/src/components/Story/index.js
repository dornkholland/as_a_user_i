import StoryMaximized from "./StoryMaximized";
import StoryMinimized from "./StoryMinimized";
import { useState } from "react";
import "./Story.css";
const Story = ({ windowName, story }) => {
  const [isMax, setIsMax] = useState(false);
  return (
    <div>
      {isMax ? (
        <StoryMaximized
          windowName={windowName}
          story={story}
          setIsMax={setIsMax}
        />
      ) : (
        <StoryMinimized story={story} setIsMax={setIsMax} creator={false} />
      )}
    </div>
  );
};

export default Story;
