import * as storyActions from "../../store/story";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Story from "../Story";
const StoryContainer = ({ name }) => {
  const dispatch = useDispatch();
  const testArr = [1, 2, 3];
  const { projectId } = useParams();
  useEffect(() => {
    const response = dispatch(
      storyActions.getStoriesByWindow({ windowName: name, projectId })
    );
  }, [dispatch]);
  return (
    <ul>
      {testArr.map((idx) => (
        <li>
          <Story storyId={idx} />
        </li>
      ))}
    </ul>
  );
};

export default StoryContainer;
