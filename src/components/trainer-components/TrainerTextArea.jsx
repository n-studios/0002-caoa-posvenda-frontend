import PropTypes from "prop-types";

const TrainerTextArea = ({ inputText, setInputText, onSendMessage, isLoading }) => {
  return (
    <div className="text-area">
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Escreva sua resposta..."
        disabled={isLoading}
      />
      <button onClick={onSendMessage} disabled={isLoading}>
        {isLoading ? "Avaliando..." : "Avaliar"}
      </button>
    </div>
  );
};

TrainerTextArea.propTypes = {
  inputText: PropTypes.string.isRequired,
  setInputText: PropTypes.func.isRequired,
  onSendMessage: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default TrainerTextArea;
