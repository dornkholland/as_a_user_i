import SideBarButton from "./SideBarButton";
function SideBar({ setActiveWindows, activeWindows }) {
  const windowNames = [
    "Backlog",
    "In Progress",
    "Awaiting Review",
    "Rejected",
    "Done",
    "IceBox",
  ];
  return (
    <div className="sidebar">
      <ul>
        {windowNames.map((name) => (
          <li key={name}>
            <SideBarButton name={name} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideBar;
