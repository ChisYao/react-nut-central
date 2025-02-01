export default function counterReducer(state = 0, {type,count=1}) {
    switch (type) {
        case counterReducer.INCREASE:
            return state + count;
        case counterReducer.DECREASE:
            return state - count;
        case counterReducer.INCREASE_ASYNC:
            return state;
        default:
            return state;
    }
}

counterReducer.INCREASE = "INCREASE";
counterReducer.DECREASE = "DECREASE";
counterReducer.INCREASE_ASYNC = "INCREASE_ASYNC";