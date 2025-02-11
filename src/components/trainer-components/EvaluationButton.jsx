import PropTypes from 'prop-types';

const EvaluationButton = ({ buttonText, className, onClick }) => {
  return (
    <button className={className} onClick={onClick}>
      {buttonText}
    </button>
  );
};

EvaluationButton.propTypes = {
  buttonText: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default EvaluationButton;

