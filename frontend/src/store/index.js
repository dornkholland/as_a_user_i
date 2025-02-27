import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import windowReducer from './window';
import projectReducer from './project';
import storyReducer from './story';
import commentReducer from './comment';

const rootReducer = combineReducers({
  session: sessionReducer,
  project: projectReducer,
  window: windowReducer,
  story: storyReducer,
  comment: commentReducer,
});

let enhancer;

// uses the thunk middleware and uses logger or development environment
if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
