// 将路由组件转换为路由对象
import React from "react";
import routes from "../components/route/Routes.jsx";

export default function createRoutesFromChildren(children) {
    const res = [];

    React.Children.forEach(children, (child) => {
        const route = {
            path: child.props.path,
            element: child.props.element,
        }
        // 如果当前路由存在子路由的情况
        if (child.props.children) {
            // 将子路由转换路由对象
            route.children = createRoutesFromChildren(child.props.children);
        }
        res.push(route);
    })

    return res;
}