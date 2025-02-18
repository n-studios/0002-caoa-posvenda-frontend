import "./Button.css";
import PropTypes from "prop-types";

const Button = ({id, buttonText, onClick }) => {
  return (
    <button id={id} className="neumorphism-button" onClick={onClick}>
      {buttonText}
    </button>
  );
};

Button.propTypes = {
  id: PropTypes.string,
  buttonText: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
