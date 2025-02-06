import logo from "../assets/caoa.png";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <img src={logo} alt="Logo" className="header-logo" />
      <h3>IA Pós-Venda</h3>
    </header>
  );
};

export default Header;
