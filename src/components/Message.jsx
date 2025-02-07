import PropTypes from "prop-types";
import "./Message.css";

const Message = ({ sender, text }) => {
  return (
    <div className={`message ${sender}`}>
      <p dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  );
};

Message.propTypes = {
  sender: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Message;
