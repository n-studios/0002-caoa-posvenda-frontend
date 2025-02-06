import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Chat = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Chat Page</h1>
      <p>Welcome to the Chat section!</p>
      <Button onClick={() => navigate("/")} buttonText={"Return to Home"} />
    </div>
  );
};

export default Chat;
