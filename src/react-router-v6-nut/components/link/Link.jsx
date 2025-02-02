import {useNavigate} from "../../hook/index.jsx";

const Link = ({to, children})=> {
    const navigate = useNavigate();
    // 阻止默认事件,并执行路由跳转
    const handleClick = (e) => {
        e.preventDefault();

        navigate(to);
    }
    return (<a href={to} onClick={handleClick}>{children}</a>)
};

export default Link;