import {applyMiddleware, combineReducers, createStore} from "redux";
import createSagaMiddleware from "redux-saga";

import counterReducer from "./countReducer.js";
import {rootSaga} from "../action/saga.js";

// redux-saga middleware
const sagaMiddleware = createSagaMiddleware();

const store = createStore(combineReducers({
    count:counterReducer
}),applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;