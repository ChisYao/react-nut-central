import React from "react";

// 提供路由组件使用
const NavigationContext = React.createContext(null);

// 提供路由挂载信息使用
const RouteContext = React.createContext(null);
export {NavigationContext, RouteContext}