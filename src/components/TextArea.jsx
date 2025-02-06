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

export default TextArea;
