import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SessionManager from "../../components/trainer-components/SessionManager";
import AnswerDisplay from "../../components/trainer-components/AnswerDisplay";
import Button from "../../components/shared-components/Button";
import "./TrainerEvaluation.css";

const API_BASE_URL =
  "https://0002-caoa-posvenda-api-evaluation.azurewebsites.net/api/v1";

const TrainerEvaluation = () => {
  const navigate = useNavigate();
  const [selectedSession, setSelectedSession] = useState("");

  const handleSessionSelect = (sessionId) => {
    console.log("Selected session:", sessionId);
    setSelectedSession(sessionId);
  };

  return (
    <div className="trainer-evaluation-page">
      <div className="trainer-evaluation-container">
        <h1>Avaliação</h1>
        <div className="trainer-evaluation-sidebar">
          <SessionManager
            API_BASE_URL={API_BASE_URL}
            handleSelectedSession={handleSessionSelect}
          />
        </div>
        <AnswerDisplay
          API_BASE_URL={API_BASE_URL}
          selectedSession={selectedSession}
        />
      </div>
      <div className="return-button">
        <Button
          id="evaluation"
          onClick={() => navigate("/trainer")}
          buttonText={"Configurações"}
        />
        <Button
          id="demo"
          onClick={() => navigate("/trainer/demo")}
          buttonText={"Demonstração"}
        />

        <Button onClick={() => navigate("/")} buttonText={"Página inicial"} />
      </div>
    </div>
  );
};

export default TrainerEvaluation;
