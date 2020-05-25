import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { composeWithDevTools } from "redux-devtools-extension";

import appReducer from './reducers'
import sagas from './sagas'
const sagaMiddleware = createSagaMiddleware();

export const history = createBrowserHistory();
export const store = createStore(appReducer,composeWithDevTools(applyMiddleware(sagaMiddleware,thunk)));

// running the sagas in background.
sagaMiddleware.run(sagas);