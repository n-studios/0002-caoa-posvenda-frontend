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
  const [update, setUpdate] = useState(false);
  const [create, setCreate] = useState(false);

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

  const handleUpdateButton = () => {
    setUpdate(!update);
  };

  const handleSendUpdate = () => {
    setUpdate(false);
    onUpdateRubric();
  };

  const selectedRubricObject = rubrics.find((r) => r._id === selectedRubric);

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
            <p>{selectedRubricObject.rating_system}</p>
            <button className="generic-button" onClick={handleUpdateButton}>
              {update ? `Fechar` : `Editar`}
            </button>
            {update && (
              <div className="crud-rubric">
                <h2>Editar Rúbrica</h2>
                <input
                  type="text"
                  name="rating_system"
                  placeholder="Rating System"
                  value={selectedRubricObject.rating_system}
                  onChange={(e) =>
                    onInputChange(
                      selectedRubricObject._id,
                      "rating_system",
                      e.target.value
                    )
                  }
                />
                <input
                  type="text"
                  name="rubric"
                  placeholder="Rubric"
                  value={selectedRubricObject.rubric}
                  onChange={(e) =>
                    onInputChange(
                      selectedRubricObject._id,
                      "rubric",
                      e.target.value
                    )
                  }
                />
                <button className="generic-button" onClick={handleSendUpdate}>
                  Enviar
                </button>
                <button
                  className="generic-button"
                  onClick={() => onDeleteRubric(selectedRubricObject._id)}
                >
                  Deletar
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Config;
