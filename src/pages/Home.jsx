import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Home = () => {
  const navigate = useNavigate();


  const handleButtonClick = (path) => {
    navigate(path); 
  };

  return (
    <div>
      <Button onClick={() => handleButtonClick("/chat")} buttonText={"CHAT"} />
      <Button onClick={() => handleButtonClick("/training")} buttonText={"TRAINING"} />
      <Button onClick={() => handleButtonClick("/inventory")} buttonText={"INVENTORY"} />
    </div>
  );
};

export default Home;