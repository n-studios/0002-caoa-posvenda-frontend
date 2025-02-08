import { useState } from "react";
import "./Config.css";

const Config = ({
  rubrics,
  selectedRubric,
  onRubricChange,
  newRubric,
  onInputChange,
  onCreateRubric,
  onUpdateRubric,
  onDeleteRubric,
}) => {
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleToggle = () => {
    if (isConfigOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsConfigOpen(false);
        setIsClosing(false);
      }, 300);
    } else {
      setIsConfigOpen(true);
      setIsClosing(false);
    }
  };

  return (
    <div className="config">
      <div className="config-header" onClick={handleToggle}>
        <h3>Configurações</h3>
        <span className={`toggle-icon ${isConfigOpen ? "open" : ""}`}>►</span>
      </div>

      <div
        className={`config-content ${isConfigOpen ? "open" : ""} ${
          isClosing ? "closing" : ""
        }`}
      >
        <label htmlFor="rubric-dropdown">Tipo do Experimento:</label>
        <select
          id="rubric-dropdown"
          className="dropdown-select"
          value={selectedRubric}
          onChange={onRubricChange}
        >
          <option value="">Selecione uma rubrica</option>
          {rubrics.map((rubric) => (
            <option key={rubric._id} value={rubric._id}>
              {rubric.rubric}
            </option>
          ))}
        </select>

        {selectedRubric && (
          <>
            <h4>Descrição do Experimento</h4>
            <p>
              {rubrics.find((r) => r._id === selectedRubric)?.rating_system}
            </p>
          </>
        )}

        <div className="crud-rubric">
          <h2>Create/Update Rubric</h2>
          <input
            type="text"
            name="rubric_id"
            placeholder="Rubric ID"
            value={newRubric.rubric_id}
            onChange={onInputChange}
          />
          <input
            type="text"
            name="rating_system"
            placeholder="Rating System"
            value={newRubric.rating_system}
            onChange={onInputChange}
          />
          <input
            type="text"
            name="rubric"
            placeholder="Rubric"
            value={newRubric.rubric}
            onChange={onInputChange}
          />
          <button onClick={onCreateRubric}>Create Rubric</button>
          <button onClick={onUpdateRubric}>Update Rubric</button>
          <button onClick={onDeleteRubric}>Delete Rubric</button>
        </div>
      </div>
    </div>
  );
};

export default Config;
