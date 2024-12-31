import Button from "../button/Button";
import { FaHome, FaUserAlt, FaCogs, FaEnvelope } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Button label={<><FaHome /> Home</>} route="/" />
        </li>
        <li className="navbar-item">
          <Button label={<><FaUserAlt /> Login</>} route="/login" />
        </li>
        <li className="navbar-item">
          <Button label={<><FaCogs /> PC Builder</>} route="/pcbuilder" />
        </li>
        <li className="navbar-item">
          <Button label={<><FaEnvelope /> Contact</>} route="/contact" />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
