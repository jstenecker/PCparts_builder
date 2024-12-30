//Creates button for various uses
import { useNavigate } from "react-router-dom";

const Button = ({label, route})=> {
    const navigate = useNavigate();

    const handleClick = () => {
        if (route) {
            navigate(route);
        }
    };
    
    return (
        <>
        <button onClick={handleClick}>
            {label}
        </button>
        </>
    )
}

export default Button;