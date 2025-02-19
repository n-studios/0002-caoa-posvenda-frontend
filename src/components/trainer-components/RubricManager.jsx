import { useState } from "react";
import PropTypes from "prop-types";
import "./RubricManager.css";


const RubricManager = ({
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

  const selectedRubricObject =
    rubrics.find((r) => r._id === selectedRubric) || {};

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

  const handleNewRubricButton = () => {
    setCreate(!create);
    setUpdate(false);
  };

  const handleUpdateButton = () => {
    setUpdate(!update);
    setCreate(false);
  };

  const handleSendCreate = () => {
    if (newRubric.rating_system.trim() && newRubric.rubric.trim()) {
      onCreateRubric();
      setCreate(false);
    } else {
      alert("Por favor, preencha todos os campos!");
    }
  };

  const handleSendUpdate = () => {
    if (newRubric.rating_system.trim() && newRubric.rubric.trim()) {
      if (selectedRubric) {
        onUpdateRubric();
        setUpdate(false);
      }
    } else {
      alert("Por favor, preencha todos os campos!");
    }
  };

  const handleDelete = () => {
    onDeleteRubric(selectedRubric);
    setCreate(false);
    setUpdate(false);
  };

  const handleRubricChange = (event) => {
    onRubricChange(event);
    if (event.target.value === "") {
      setUpdate(false);
      setCreate(false);
    }
  };

  return (
    <div className="config">
      <div className="config-header" onClick={handleToggle}>
        <h3>Configurações</h3>
        <span className={`toggle-icon ${isConfigOpen ? "open" : ""}`}>►</span>
      </div>

      <div
        className={`config-content ${isConfigOpen ? "open" : ""} ${isClosing ? "closing" : ""}`}
      >
        <label htmlFor="rubric-dropdown">Tipo do Experimento:</label>
        <select
          id="rubric-dropdown"
          className="dropdown-select"
          value={selectedRubric}
          onChange={handleRubricChange}
        >
          <option value="">Selecione uma rúbrica</option>
          {rubrics.map((rubric) => (
            <option key={rubric._id} value={rubric._id}>
              {rubric.rubric}
            </option>
          ))}
        </select>

        {!update && selectedRubric === "" && (
          <button className="generic-button" onClick={handleNewRubricButton}>
            {create ? `Fechar` : `Nova Rúbrica`}
          </button>
        )}

        {create && selectedRubric === "" && (
          <div className="crud-rubric">
            <h2>Nova Rúbrica</h2>
            <input
              type="text"
              name="rubric"
              placeholder="Rúbrica"
              value={newRubric.rubric}
              onChange={onInputChange}
            />
            <textarea
              name="rating_system"
              placeholder="Sistema de avaliação"
              value={newRubric.rating_system}
              onChange={onInputChange}
              rows={3}
            />
            <button className="generic-button" onClick={handleSendCreate}>
              Enviar
            </button>
          </div>
        )}

        {selectedRubric && selectedRubricObject._id && (
          <>
            {!update && !create && (
              <div className="rubric-display">
                <h4>Descrição do Experimento</h4>
                <p>
                  {selectedRubricObject.rating_system ||
                    "Sem descrição disponível"}
                </p>
              </div>
            )}

            {!create && (
              <button className="generic-button" onClick={handleUpdateButton}>
                {update ? `Fechar` : `Editar`}
              </button>
            )}

            {update && (
              <div className="crud-rubric">
                <h2>Editar Rúbrica</h2>
                <input
                  type="text"
                  name="rubric"
                  placeholder="Rúbrica"
                  value={newRubric.rubric}
                  onChange={onInputChange}
                />
                <textarea
                  name="rating_system"
                  placeholder="Sistema de avaliação"
                  value={newRubric.rating_system}
                  onChange={onInputChange}
                  rows={3}
                />
                <div className="controls">
                  <button className="generic-button" onClick={handleSendUpdate}>
                    Enviar
                  </button>
                  <button className="generic-button" onClick={handleDelete}>
                    Deletar
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

RubricManager.propTypes = {
  rubrics: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      rubric: PropTypes.string.isRequired,
      rating_system: PropTypes.string,
    })
  ).isRequired,
  selectedRubric: PropTypes.string,
  onRubricChange: PropTypes.func.isRequired,
  newRubric: PropTypes.shape({
    rating_system: PropTypes.string,
    rubric: PropTypes.string,
  }).isRequired,
  onInputChange: PropTypes.func.isRequired,
  onCreateRubric: PropTypes.func.isRequired,
  onUpdateRubric: PropTypes.func.isRequired,
  onDeleteRubric: PropTypes.func.isRequired,
};

export default RubricManager;
