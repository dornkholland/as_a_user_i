import * as windowActions from "../../store/window";
import * as storyActions from "../../store/story";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import SideBar from "./SideBar";
import Workspace from "../Workspace";
import "./ProjectPage.css";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
function ProjectPage() {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const onDragEnd = (result) => {
    if (!result.destination) return;
    if (result.type === "window") {
      dispatch(windowActions.windowReorder(result));
    } else if (result.source.droppableId !== result.destination.droppableId) {
      const newWindow = result.destination.droppableId;
      const story = JSON.parse(result.draggableId);
      let newStatus = newWindow;
      let newWindowArray = ["Backlog", "IceBox", "Issues"];
      if (newWindowArray.includes(newWindow)) {
        newStatus = "Unstarted";
      }
      dispatch(
        storyActions.updateStory({
          projectId,
          storyId: story.id,
          storyName: story.name,
          storyType: story.storyType,
          storySize: story.size,
          storyStatus: newStatus,
          storyDescription: story.description,
          previousWindow: story.window,
          windowName: newWindow,
        })
      );
    } else {
      dispatch(
        storyActions.storyReorder({
          coords: result,
          projectId,
        })
      );
    }
  };
  return (
    <div className="projectPage">
      <DragDropContext onDragEnd={onDragEnd}>
        <SideBar />
        <Workspace />
      </DragDropContext>
    </div>
  );
}

export default ProjectPage;
