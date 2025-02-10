import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/shared-components/Button";
import Config from "../../components/trainer-components/Config";
import TrainerSection from "../../components/trainer-components/TrainerSection";
import "./Trainer.css";

const API_BASE_URL =
  "https://0002-caoa-posvenda-api-evaluation.azurewebsites.net/api/v1";

const Trainer = () => {
  const navigate = useNavigate();

  const [rubrics, setRubrics] = useState([]);
  const [selectedRubric, setSelectedRubric] = useState("");
  const [newRubric, setNewRubric] = useState({
    rubric_id: "",
    rating_system: "",
    rubric: "",
  });

  useEffect(() => {
    fetchRubrics();
  }, []);

  const fetchRubrics = () => {
    fetch(`${API_BASE_URL}/rubrics/get_rubrics`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched rubrics:", data);
        setRubrics(data);
      })
      .catch((error) => console.error("Error fetching rubrics:", error));
  };
  

  const handleRubricChange = (e) => {
    setSelectedRubric(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRubric({ ...newRubric, [name]: value });
  };

  const handleCreateRubric = () => {
    const rubricData = {
      rating_system: newRubric.rating_system,
      rubric: newRubric.rubric,
    };

    fetch(`${API_BASE_URL}/rubrics/create_rubric`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rubricData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create rubric");
        }
        return response.json();
      })
      .then(() => {
        fetchRubrics();
        setNewRubric({ rating_system: "", rubric: "" });
      })
      .catch((error) => console.error("Error creating rubric:", error));
  };

  const handleUpdateRubric = () => {
    newRubric.rubric_id = selectedRubric;
    fetch(`${API_BASE_URL}/rubrics/update_rubric/${selectedRubric}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRubric),
    })
      .then((response) => response.json())
      .then(() => {
        fetchRubrics();
        setNewRubric({ rubric_id: "", rating_system: "", rubric: "" });
      })
      .catch((error) => console.error("Error updating rubric:", error));
  };

  const handleDeleteRubric = () => {
    fetch(`${API_BASE_URL}/rubrics/delete_rubric/${selectedRubric}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        fetchRubrics();
        setSelectedRubric("");
      })
      .catch((error) => console.error("Error deleting rubric:", error));
  };

  return (
    <div className="trainer-page">
      <div className="trainer-container">
        <h1>Trainer</h1>
        <Config
          rubrics={rubrics}
          selectedRubric={selectedRubric}
          onRubricChange={handleRubricChange}
          newRubric={newRubric}
          onInputChange={handleInputChange}
          onCreateRubric={handleCreateRubric}
          onUpdateRubric={handleUpdateRubric}
          onDeleteRubric={handleDeleteRubric}
        />
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
