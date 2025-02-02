import {NavigationContext} from "../Context.jsx";
import {useMemo} from "react";

// 用于跨组件传值,提供路由相关信息
export default function Router({navigator, location, children}) {
    // 缓存路由信息,路由信息变更时才更新信息
    let navigationContext = useMemo(() =>
        ({navigator, location}), [navigator, location]);

    return (<NavigationContext.Provider value={navigationContext}>{children}</NavigationContext.Provider>)
}