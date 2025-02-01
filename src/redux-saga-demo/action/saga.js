import counterReducer from "../store/countReducer.js";
import {takeEvery,take,fork, put, call} from "redux-saga/effects";


function* incrementAsync(){
    console.log("SAGA INCREMENT");
    // 执行并修改对应值.
    yield put({type: counterReducer.INCREASE, count: 5})

}

export function* rootSaga(){
    // 当触发异步增长时被拦截,并执行执行方法incrementAsync
    yield takeEvery(counterReducer.INCREASE_ASYNC, incrementAsync);

    // while(true){
    //     yield take(counterReducer.INCREASE_ASYNC)
    //     yield fork(incrementAsync)
    // }
}
