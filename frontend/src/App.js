import { Switch, Route } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
function App() {
  return (
    <div>
      <Switch>
        <Route path="/login">
          <LoginFormPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
