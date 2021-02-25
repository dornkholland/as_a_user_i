import * as windowActions from "../../store/window";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import SideBar from "./SideBar";
import Workspace from "../Workspace";
import "./ProjectPage.css";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
function ProjectPage() {
  const dispatch = useDispatch();
  const onDragEnd = (result) => {
    if (!result.destination) return;
    dispatch(windowActions.windowReorder(result));
  };
  const { projectId } = useParams();
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
