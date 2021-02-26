import StoryMaximized from "./StoryMaximized";
import StoryMinimized from "./StoryMinimized";
import { useState } from "react";
import "./Story.css";
const Story = ({ story }) => {
  const [isMax, setIsMax] = useState(false);
  return (
    <div>
      {isMax ? (
        <StoryMaximized story={story} setIsMax={setIsMax} />
      ) : (
        <StoryMinimized story={story} setIsMax={setIsMax} />
      )}
    </div>
  );
};

export default Story;
