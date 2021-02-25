import { Switch, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import Landing from "./components/Landing";
import ProjectDash from "./components/ProjectDash";
import ProjectPage from "./components/ProjectPage";
import * as sessionActions from "./store/session";
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <div>
          <Switch>
            <Route path="/project/:projectId">
              <Navigation isLoaded={isLoaded} />
              <ProjectPage />
            </Route>
            <Route path="/projects">
              <Navigation isLoaded={isLoaded} />
              <ProjectDash />
            </Route>
            <Route path="/login">
              <LoginFormPage />
            </Route>
            <Route path="/signup">
              <SignupFormPage />
            </Route>
            <Route exact path="/">
              <Navigation isLoaded={isLoaded} />
              <Landing />
            </Route>
          </Switch>
        </div>
      )}
    </>
  );
}

export default App;
