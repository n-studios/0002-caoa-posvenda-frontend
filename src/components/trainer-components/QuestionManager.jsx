import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./QuestionManager.css";

const QuestionManager = ({
  label,
  dropdownId,
  options,
  questionData,
  onQuestionChange,
  onCreateQuestion,
  onUpdateQuestion,
  onDeleteQuestion,
}) => {
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [update, setUpdate] = useState(false);
  const [create, setCreate] = useState(false);
  const [question, setQuestion] = useState(questionData || {});

  useEffect(() => {
    setQuestion(questionData || {});
  }, [questionData]);

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

  const handleNewQuestionButton = () => {
    setCreate(!create);
    setUpdate(false);
  };

  const handleUpdateButton = () => {
    setUpdate(!update);
    setCreate(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuestion((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSendCreate = () => {
    if (question.question && question.ground_truth && question.category) {
      onCreateQuestion(question);
      setCreate(false);
      setQuestion({ question: "", ground_truth: "", category: "" });
    } else {
      alert("Por favor, preencha todos os campos!");
    }
  };

  const handleSendUpdate = () => {
    if (question.question && question.ground_truth && question.category) {
      onUpdateQuestion(question);
      setUpdate(false);
    } else {
      alert("Por favor, preencha todos os campos!");
    }
  };

  const handleDelete = () => {
    onDeleteQuestion(question._id);
    setCreate(false);
    setUpdate(false);
  };

  const handleQuestionChange = (event) => {
    onQuestionChange(event);
    if (event.target.value === "") {
      setUpdate(false);
      setCreate(false);
    }
  };

  return (
    <div className="trainer-section">
      <div className="trainer-header" onClick={handleToggle}>
        <h3>{label}</h3>
        <span className={`toggle-icon ${isConfigOpen ? "open" : ""}`}>►</span>
      </div>

      <div
        className={`trainer-content ${isConfigOpen ? "open" : ""} ${isClosing ? "closing" : ""}`}
      >
        <label htmlFor={dropdownId}>Selecionar Pergunta</label>
        <select
          id={dropdownId}
          className="dropdown-select"
          value={question._id || ""}
          onChange={handleQuestionChange}
        >
          <option value="">Selecione uma pergunta</option>
          {options.map((option, index) => (
            <option key={option.value} value={option.value}>
              {`Pergunta ${index + 1}`}
            </option>
          ))}
        </select>

        {!update && !question._id && (
          <button className="generic-button" onClick={handleNewQuestionButton}>
            {create ? `Fechar` : `Nova Pergunta`}
          </button>
        )}

        {create && !question._id && (
          <div className="crud-question">
            <h2>Criar Nova Pergunta</h2>
            <textarea
              name="question"
              placeholder="Escreva sua Pergunta"
              value={question.question}
              onChange={handleInputChange}
            />
            <textarea
              name="ground_truth"
              placeholder="Verdade Fundamental"
              value={question.ground_truth}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="category"
              placeholder="Categoria"
              value={question.category}
              onChange={handleInputChange}
            />
            <button className="generic-button" onClick={handleSendCreate}>
              Enviar
            </button>
          </div>
        )}

        {question._id && (
          <>
            {!create && (
              <button className="generic-button" onClick={handleUpdateButton}>
                {update ? `Fechar` : `Editar Pergunta`}
              </button>
            )}

            {update && (
              <div className="crud-question">
                <h2>Editar Pergunta</h2>
                <textarea
                  name="question"
                  value={question.question}
                  onChange={handleInputChange}
                />
                <textarea
                  name="ground_truth"
                  value={question.ground_truth}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="category"
                  value={question.category}
                  onChange={handleInputChange}
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

QuestionManager.propTypes = {
  label: PropTypes.string.isRequired,
  dropdownId: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  questionData: PropTypes.shape({
    _id: PropTypes.string,
    question: PropTypes.string,
    ground_truth: PropTypes.string,
    category: PropTypes.string,
  }),
  onQuestionChange: PropTypes.func.isRequired,
  onCreateQuestion: PropTypes.func.isRequired,
  onUpdateQuestion: PropTypes.func.isRequired,
  onDeleteQuestion: PropTypes.func.isRequired,
};

QuestionManager.defaultProps = {
  questionData: {},
};

export default QuestionManager;
