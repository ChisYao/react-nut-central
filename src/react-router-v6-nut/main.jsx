// import {BrowserRouter as Router, Link, Route, Routes,Outlet} from "react-router";
import {BrowserRouter as Router, Link, Route, Routes,Outlet,Navigate} from "../react-router-v6-nut/components";

import {useLocation, useNavigate, useParams} from "./hook/index.jsx";
import {AuthProvider, useAuth} from "./Auth.jsx";

// 顺序:
// -> 提供组件
// -> 单层路由处理(createRouteFromChildren,useRoutes)
// -> 多层路由,及Link处理(useNavigate, NavigationContext)


export default function RouterV6Nut() {
    return (<div>
        <h4>React-Router v6 Nut</h4>

        <div className="">
            <AuthProvider>
                <Router>
                    {/*<Layout></Layout>*/}
                    <Routes>
                        <Route path="/" element={<Layout/>}>
                            <Route path="/" element={<Home/>}></Route>
                            <Route path="/order" element={<OrderList/>}>
                                <Route path=":id" element={<OrderDetails/>}></Route>
                            </Route>
                            <Route path="/me" element={
                                <RequiredAuth><AboutMe/></RequiredAuth>
                            }></Route>
                            <Route path="/login" element={<Login/>}></Route>
                        </Route>
                    </Routes>
                </Router>
            </AuthProvider>
        </div>
    </div>)
}

function Layout() {
    return (<div>
        <div className="flex gap-4  border-2 border-violet-400">
            <Link to="/">Home</Link>
            <Link to="/order">Orders</Link>
            <Link to="/me">About Me</Link>
            <Link to="/login">Login</Link>
        </div>
        <Outlet></Outlet>
    </div>)
}

// This is Home Component
function Home() {
    return (<h6>This is Home Page</h6>)
}

// This is Login Component
function Login() {
    const auth = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location)
    const from = location.state?.state?.from?.pathname || "/";

    const handleClick = (e) => {
        auth.signIn({user:"Chis Yao"},()=>{
            navigate(from,{replace:true});
        })
    }
    return (<div>
        <h6>This is Login Page</h6>
        <button onClick={handleClick} className="bg-pink-200 rounded px-2">SUBMIT</button>
    </div>)
}

// This is OrderList Component
function OrderList() {
    return (<div>
        <h6>This is Order List</h6>
        <ul className="border-2 border-pink-300 flex gap-4">
            <li><Link to="/">Back HOME</Link></li>
            <li><Link to="/order/886-29478392">Item A</Link></li>
            <li><Link to="/order/843-21232392">Item B</Link></li>
        </ul>
        <Outlet></Outlet>
    </div>)
}

// This is OrderDetails Component For OrderList
function OrderDetails() {
    const params = useParams();

    return (<div>
        <h6>Madame and Messier</h6>
        <div>Order Id: {params.id}</div>
    </div>)
}

// This is AboutMe
function AboutMe() {
    return (<h4>About Me: Chis Yao.</h4>)
}

// 路由守卫,鉴权使用
function RequiredAuth({children}) {
    const auth = useAuth();
    const location = useLocation();

    if (!auth.user){ // user信息不存在, 需要去登录
        return <Navigate to="/login" state={{from:location}} replace={true}></Navigate>
    }
    return children;
}