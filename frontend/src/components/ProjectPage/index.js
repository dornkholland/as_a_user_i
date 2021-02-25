import { useState } from "react";
import { useParams } from "react-router-dom";
import SideBar from "./SideBar";
import Workspace from "../Workspace";
import "./ProjectPage.css";
function ProjectPage() {
  const [activeWindows, setActiveWindows] = useState([]);
  const { projectId } = useParams();
  return (
    <div className="projectPage">
      <SideBar
        setActiveWindows={setActiveWindows}
        activeWindows={activeWindows}
      />
      <Workspace activeWindows={activeWindows} />
    </div>
  );
}

export default ProjectPage;
