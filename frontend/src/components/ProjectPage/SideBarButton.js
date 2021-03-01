import * as windowActions from "../../store/window";
import { useSelector, useDispatch } from "react-redux";
const SideBarButton = ({ name }) => {
  const activeWindows = useSelector((state) => state.window.windows);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(windowActions.windowToggle(name));
  };
  return (
    <button
      style={
        activeWindows.includes(name) ? { backgroundColor: "#112d4e" } : null
      }
      onClick={handleClick}
    >
      {name}
    </button>
  );
};

export default SideBarButton;
