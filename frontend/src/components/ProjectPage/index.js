import { useState } from "react";
import { useParams } from "react-router-dom";
import SideBar from "./SideBar";
import Workspace from "../Workspace";
import "./ProjectPage.css";
function ProjectPage() {
  const { projectId } = useParams();
  return (
    <div className="projectPage">
      <SideBar />
      <Workspace />
    </div>
  );
}

export default ProjectPage;
