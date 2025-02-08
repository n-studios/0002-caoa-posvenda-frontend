import PropTypes from "prop-types";
import "./TrainerSection.css"

const TrainerSection = ({ label, dropdownId, options, textareaRows, textareaContent }) => {
  return (
    <div className="trainer-section">
      <label htmlFor={dropdownId}>{label}</label>
      <select id={dropdownId} className="dropdown-select">
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <textarea rows={textareaRows}>{textareaContent}</textarea>
    </div>
  );
};

TrainerSection.propTypes = {
  label: PropTypes.string.isRequired,
  dropdownId: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  textareaRows: PropTypes.number,
  textareaContent: PropTypes.string,
};

TrainerSection.defaultProps = {
  textareaRows: 3,
  textareaContent: "",
};

export default TrainerSection;
