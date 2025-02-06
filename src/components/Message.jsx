import "./Message.css";

const Message = ({ sender, text }) => {
  return (
    <div className={`message ${sender}`}>
      <p dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  );
};
export default Message;
