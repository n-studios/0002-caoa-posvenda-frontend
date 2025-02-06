import logo from "../assets/caoa.png";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <img src={logo} alt="Logo" className="header-logo" />
    </header>
  );
};

export default Header;
