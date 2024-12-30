import Button from "./Button";
import { FaHome, FaUserAlt, FaCogs, FaEnvelope } from "react-icons/fa";

const Navbar = () => {
    return (
        <>
            <Button label={<><FaHome /> Home</>} route="/" />
            <Button label={<><FaUserAlt /> Login</>} route="/login" />
            <Button label={<><FaCogs /> PC Builder</>} route="/pcbuilder" />
            <Button label={<><FaEnvelope /> Contact</>} route="/contact" />
        </>
    );
};

export default Navbar;
