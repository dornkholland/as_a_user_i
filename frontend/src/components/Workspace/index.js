import { useState } from "react";
import "./Workspace.css";
import Window from "../Window";
function Workspace({ activeWindows }) {
  return (
    <div className="workspace">
      <ul className="windowContainer">
        {activeWindows.map((name) => (
          <li>
            <Window name={name} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Workspace;
