import { useEffect, useRef } from "react";
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

export default ChatDisplay;

