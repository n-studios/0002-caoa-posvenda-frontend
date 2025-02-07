import PropTypes from "prop-types";
import "./ErrorDisplay.css";

const ErrorDisplay = ({ error }) => {
  return <div className="error-display">{error}</div>;
};

ErrorDisplay.propTypes = {
  error: PropTypes.string.isRequired,
};

export default ErrorDisplay;
