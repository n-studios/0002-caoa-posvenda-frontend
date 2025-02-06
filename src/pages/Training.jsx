import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Training = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Training Page</h1>
      <p>Welcome to the Training section!</p>
      <Button onClick={() => navigate("/")} buttonText={"Return to Home"} />
    </div>
  );
};

export default Training;
