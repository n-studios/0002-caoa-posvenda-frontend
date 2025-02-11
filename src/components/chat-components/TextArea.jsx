import PropTypes from "prop-types";
import "./TextArea.css";

const TextArea = ({ inputText, setInputText, onSendMessage, isLoading }) => {
  return (
    <div className="text-area">
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Escreva sua mensagem..."
        disabled={isLoading}
      />
      <button onClick={onSendMessage} disabled={isLoading}>
        {isLoading ? "Enviando..." : "Enviar"}
      </button>
    </div>
  );
};

TextArea.propTypes = {
  inputText: PropTypes.string.isRequired,
  setInputText: PropTypes.func.isRequired,
  onSendMessage: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default TextArea;
