import { useNavigate } from "react-router-dom";
import Button from "../../components/shared-components/Button";
import Config from "../../components/trainer-components/Config";
import TrainerSection from "../../components/trainer-components/TrainerSection";
import "./Trainer.css";

const Trainer = () => {
  const navigate = useNavigate();

  return (
    <div className="trainer-page">
      <div className="trainer-container">
        <h1>Trainer</h1>
        <Config />
        <TrainerSection
          label="Qual assunto treinar:"
          dropdownId="question-dropdown"
          options={[
            { value: "option1", label: "Pergunta 1" },
            { value: "option2", label: "Pergunta 2" },
            { value: "option3", label: "Pergunta 3" },
          ]}
          textareaRows={3}
          textareaContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit?"
        />
        <TrainerSection
          label="Selecione uma resposta ou crie sua própria:"
          dropdownId="answer-dropdown"
          options={[
            { value: "option1", label: "Resposta 1" },
            { value: "option2", label: "Resposta 2" },
            { value: "option3", label: "Resposta 3" },
          ]}
          textareaRows={6}
          textareaContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        />
        <button className="generic-button">Sample Text</button>
      </div>
      <Button
        onClick={() => navigate("/")}
        buttonText={"Página inicial"}
        className="return-button"
      />
    </div>
  );
};

export default Trainer;
