const SideBarButton = ({ activeWindows, setActiveWindows, name }) => {
  const handleClick = () => {
    if (activeWindows.includes(name)) {
      setActiveWindows((prev) =>
        prev.filter((ourWindow) => ourWindow !== name)
      );
    } else {
      setActiveWindows((prev) => [...prev, name]);
    }
  };
  return <button onClick={handleClick}>{name}</button>;
};

export default SideBarButton;
