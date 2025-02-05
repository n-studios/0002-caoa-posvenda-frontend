import logo from "../assets/unnamed.png"; // Adjust path based on file structure

const Header = () => {
  return (
    <header className="header">
      <img src={logo} alt="Logo" width="100" height="100" />
    </header>
  );
};

export default Header;
