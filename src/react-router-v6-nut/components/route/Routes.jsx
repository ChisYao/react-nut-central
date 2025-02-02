import createRoutesFromChildren from "../../utils/createRoutesFromChildren.js";
import {useRoutes} from "../../hook/index.jsx";

const Routes = ({children}) => {
    // 将路由组件形式转换为对象形式(Ex:Dom -> vDom)
    const routes = createRoutesFromChildren(children);

    return useRoutes(routes);
};

export default Routes;