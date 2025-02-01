import store from "./store/index.js";
import {useSelector} from "react-redux";
import {useReducer, useState} from "react";
import counterReducer from "./store/countReducer.js";

export default function SagaDemo() {
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    store.subscribe(() => {
        forceUpdate();
    });
    return (<>
        <h4>{store.getState().count}</h4>
        <button
            onClick={() => store.dispatch({type: counterReducer.INCREASE_ASYNC})}>
            INCREMENT
        </button>
    </>)
}