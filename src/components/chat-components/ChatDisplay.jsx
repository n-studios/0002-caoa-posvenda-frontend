import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Message from "./Message";
import "./ChatDisplay.css";

const ChatDisplay = ({ messages }) => {
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-display" role="log" aria-live="polite">
      {messages.map((message, index) => (
        <Message key={index} sender={message.sender} text={message.text} />
      ))}
      <div ref={chatEndRef} />
    </div>
  );
};

ChatDisplay.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      sender: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ChatDisplay;
