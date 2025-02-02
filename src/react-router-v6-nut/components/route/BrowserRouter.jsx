import Router from "./Router.jsx";
import {createBrowserRouter} from "react-router";
import {createBrowserHistory} from "history";
import React, {useLayoutEffect, useRef, useState} from "react";

const BrowserRouter = ({children}) => {
    const historyRef = useRef();

    if (!historyRef.current) {
        // 创建Browser类型路由
        historyRef.current = createBrowserHistory();
    }

    // 路由对象
    const history = historyRef.current;
    // 路由地址
    const [state, setState] = useState({location: history.location});

    // 监听路由变化, 当DOM挂载完毕后应当立即监听, 不应当存在延迟(故不选用useEffect)
    useLayoutEffect(() => {
        history.listen(setState);
    }, [history]);

    return (<Router
        navigator={history}
        location={state.location}
    >{children}</Router>)
};

export default BrowserRouter;