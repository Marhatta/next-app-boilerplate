import { createStore, applyMiddleware } from "redux";
import { createWrapper } from "next-redux-wrapper";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

import rootReducer from "./root-reducer";
import rootSaga from "./root-saga";

//create saga middleware
const sagaMiddleware = createSagaMiddleware();

// create a makeStore function
const makeStore = (initialState) => {
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );
  //Run saga middleware
  sagaMiddleware.run(rootSaga);
  return store;
};
// export an assembled wrapper
export const wrapper = createWrapper(makeStore, { debug: true });
