import { useSelector } from "react-redux";
import "./Workspace.css";
import Window from "../Window";

function Workspace() {
  const windows = useSelector((state) => state.window.windows);
  return (
    <div className="workspace">
      <ul className="windowContainer">
        {windows.map((name, idx) => (
          <li key={name}>
            <Window name={name} index={idx} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Workspace;
