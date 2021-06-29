import Navigation from "../Navigation";
import * as windowActions from "../../store/window";
import * as storyActions from "../../store/story";
import * as projectActions from "../../store/project";
import { useEffect, useState } from "react";
import { useParams, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SideBar from "./SideBar";
import Workspace from "../Workspace";
import "./ProjectPage.css";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
function ProjectPage({ isLoaded }) {
  const [projectName, setProjectName] = useState("");
  const sessionUser = useSelector((state) => state.session.user);
  const { projectId } = useParams();
  const dispatch = useDispatch();

  useEffect(async () => {
    const response = await dispatch(
      projectActions.getProjectById({ projectId })
    );

    setProjectName(response);
    await dispatch(storyActions.getStories({ projectId }));
  }, []);
  if (!sessionUser) return <Redirect to="/" />;

  //dnd logic
  const onDragEnd = (result) => {
    if (!result.destination) return;
    if (result.type === "window") {
      dispatch(windowActions.windowReorder(result));
    } else {
      const story = JSON.parse(result.draggableId);
      const newWindow = result.destination.droppableId;
      if (
        story.window !== newWindow ||
        result.source.index !== result.destination.index
      ) {
        let newWindowArray = ["Backlog", "IceBox", "Issues"];
        if (newWindowArray.includes(newWindow)) {
          //newStatus = "Unstarted";
        }
        dispatch(
          storyActions.storyReorder({
            coords: result,
            projectId,
          })
        );
      }
    }
  };
  return (
    <>
      <Navigation isLoaded={isLoaded} projectName={projectName} />
      <div className="projectPage">
        <DragDropContext onDragEnd={onDragEnd}>
          <SideBar />
          <Workspace />
        </DragDropContext>
      </div>
    </>
  );
}

export default ProjectPage;
