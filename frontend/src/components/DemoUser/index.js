import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";

function DemoUser() {
  const dispatch = useDispatch();
  const handleDemo = (e) => {
    e.preventDefault();
    return dispatch(
      sessionActions.login({ credential: "demoUser", password: "password" })
    );
  };
  return (
    <button type="button" onClick={handleDemo} className="demoButton">
      Demo Login
    </button>
  );
}

export default DemoUser;
