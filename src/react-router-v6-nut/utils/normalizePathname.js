// 用于去除路由中多余的'/' ->  ///product/detail/// -> /product/detail
export const normalizePathname = (pathname) =>
    pathname.replace(/\/+$/, "").replace(/^\/*/, "/");
