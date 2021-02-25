import SideBarButton from "./SideBarButton";
function SideBar({ setActiveWindows, activeWindows }) {
  const windowNames = ["Icebox", "Done", "Backlog", "Rejected", "My Work"];
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
