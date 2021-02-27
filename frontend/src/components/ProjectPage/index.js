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
    } else {
      console.log(result);
      dispatch(storyActions.storyReorder({ coords: result, projectId }));
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
