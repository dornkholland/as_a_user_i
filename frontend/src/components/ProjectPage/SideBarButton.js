import * as windowActions from "../../store/window";
import { useDispatch } from "react-redux";
const SideBarButton = ({ activeWindows, setActiveWindows, name }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(windowActions.windowToggle(name));
  };
  return <button onClick={handleClick}>{name}</button>;
};

export default SideBarButton;
