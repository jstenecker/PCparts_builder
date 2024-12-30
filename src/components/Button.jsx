//Creates button for various uses
import PropTypes from "prop-types";
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
};

// Add prop validation
Button.propTypes = {
    label: PropTypes.string.isRequired, 
    route: PropTypes.string.isRequired, 
};

export default Button;