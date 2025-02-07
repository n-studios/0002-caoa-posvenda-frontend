import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Trainer = () => {
  const navigate = useNavigate();

  return (
    <div className="trainer-page">
      <div className="trainer-container">
        <h1>Trainer</h1>
        <div className="config">
          
        </div>
      </div>
      <Button onClick={() => navigate("/")} buttonText={"Página inicial"} />
    </div>
  );
};

export default Trainer;