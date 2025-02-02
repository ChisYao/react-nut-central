import {useCallback, useContext, useMemo} from "react";
import {NavigationContext, RouteContext} from "../components/Context.jsx";
import {normalizePathname} from "../utils/normalizePathname.js";
import {Outlet} from "../components/index.js";
import {matchPath, matchRoutes} from "react-router";

export function useRoutes(routes) {
    // v3.切换成自主声明路由信息
    const location = useLocation();
    const pathname = location.pathname;

    // return routes.map(route => {

    // v1:不存在嵌套路由情况下,强制匹配
    // const match = pathname === route.path;
    // return match ? route.element : null;

    // v2:存在子路由情况,保证父路由渲染,子路由暂未处理
    // const match = pathname.startsWith(route.path);
    // return match ? route.element : null;

    // v3:一层子路由渲染处理
    // const match = pathname.startsWith(route.path);
    // return (match && route.children.map(child => {
    //     const m = normalizePathname(child.path) === pathname;
    //
    //     // 为自己组件提供必要的信息, 及指定Outlet渲染的视图元素
    //     return (m && <RouteContext.Provider
    //         value={{outlet:child.element}}>
    //         {route.element ? route.element : <Outlet/>}
    //     </RouteContext.Provider>)
    // }));

    // })

    // v4:处理动态路由
    const matches = matchRoutes(routes, {pathname});

    if (!matches) return null;
    // 动态参数一般用于子路由中,为保证正确性,需要逆向遍历.
    return matches.reduceRight((outlet, match) => {
        return (<RouteContext.Provider
            value={{outlet,matches}}>
            {match.route.element || outlet}
        </RouteContext.Provider>)
    },null)
}

// 用于提供路由跳转相关方法
export function useNavigate() {
    const {navigator} = useContext(NavigationContext);

    const navigate = useCallback((to,options = {})=>{
        if (typeof to ==="number"){
            navigator.go(to);
            return;
        }
        (!!options.replace ? navigator.replace : navigator.push)(to,options.state);
    },[navigator])

    return navigator.push;
}

// 用于获取路由地址使用
export function useLocation() {
    const {location} = useContext(NavigationContext);
    return location;
}

// 用于渲染Outlet内容使用
export function useOutlet() {
    const {outlet} = useContext(RouteContext)
    return outlet;
}

// 用于动态路由参数
export function useParams(){
    const {matches} = useContext(RouteContext);
    const routeMatch = matches[matches.length  -1];
    return routeMatch ?  routeMatch.params : {};
}

// 用户检测路由是否匹配
export function useMatch(pattern) {
    const { pathname } = useLocation();
    return useMemo(() => matchPath(pattern, pathname), [pathname, pattern]);
}

// 用于解析路由信息
export function useResolvedPath(to) {
    const { pathname } = useLocation();

    return useMemo(
        () => ({
            pathname: to,
            hash: "",
            search: "",
        }),
        [pathname]
    );
}
