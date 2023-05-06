import * as windowActions from "../../store/window";
import { useSelector, useDispatch } from "react-redux";
const SideBarButton = ({ name }) => {
  const activeWindows = useSelector((state) => state.window.windows);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(windowActions.windowToggle(name));
  };
  const className = `sidebar__button ${activeWindows.includes(name) ? 'sidebar__button__toggled' : null}`
  return (
    <button
      className={className}
      onClick={handleClick}
    >
      {name}
    </button>
  );
};

export default SideBarButton;
