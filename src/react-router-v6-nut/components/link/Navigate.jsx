import {useEffect} from "react";
import {useNavigate} from "../../hook/index.jsx";

const Navigate = ({to,state,replace}) => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate(to,{state,replace});
    })
    return null;
}

export default Navigate;