import { useNavigate } from "react-router-dom";
import Button from "../../components/shared-components/Button";
import Config from "../../components/trainer-components/Config";
import "./Trainer.css";

const Trainer = () => {
  const navigate = useNavigate();

  return (
    <div className="trainer-page">
      <div className="trainer-container">
        <h1>Trainer</h1>
        <Config />
        <div className="question">
          <label htmlFor="config-dropdown">Qual assunto treinar:</label>
          <select id="config-dropdown" className="dropdown-select">
            <option value="option1">Pergunta 1</option>
            <option value="option2">Pergunta 2</option>
            <option value="option3">Pergunta 3</option>
          </select>
          <textarea name="" id="" rows="3" cols="1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit?
          </textarea>
        </div>
        <div className="answer">
          <label htmlFor="config-dropdown">
            Selecione uma resposta ou crie sua própria:
          </label>
          <select id="config-dropdown" className="dropdown-select">
            <option value="option1">Resposta 1</option>
            <option value="option2">Resposta 2</option>
            <option value="option3">Resposta 3</option>
          </select>
          <textarea name="" id="" rows="4" cols="50">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            efficitur orci rutrum, feugiat tortor eget, cursus tellus. Curabitur
            gravida, libero eget volutpat feugiat, odio erat rhoncus elit, vitae
            feugiat eros diam vitae ipsum. Nunc erat elit, interdum vel faucibus
            sit amet, finibus ac velit. Phasellus in nisl felis. Proin ornare
            dignissim dignissim. Aliquam tellus massa, suscipit quis laoreet
            quis, vestibulum laoreet lacus. Suspendisse dignissim enim non augue
            efficitur commodo.
          </textarea>
        </div>
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
