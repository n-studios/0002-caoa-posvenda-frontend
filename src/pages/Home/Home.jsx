import { useNavigate } from "react-router-dom";
import Button from "../../components/shared-components/Button";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const handleButtonClick = (path) => {
    navigate(path);
  };

  return (
    <div className="home-container">
      <Button onClick={() => handleButtonClick("/chat")} buttonText={"CHAT"} />
      <Button
        onClick={() => handleButtonClick("/trainer")}
        buttonText={"TRAINER"}
      />
    </div>
  );
};

export default Home;
