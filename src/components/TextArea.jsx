import "./TextArea.css";

const TextArea = ({ inputText, setInputText, onSendMessage, isLoading }) => {
  return (
    <div className="text-area">
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Type your message..."
        disabled={isLoading}
      />
      <button onClick={onSendMessage} disabled={isLoading}>
        {isLoading ? "Sending..." : "Send"}
      </button>
    </div>
  );
};

export default TextArea;