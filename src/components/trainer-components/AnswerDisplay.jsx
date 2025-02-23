import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const AnswerDisplay = ({ API_BASE_URL, selectedSession }) => {
  const [answers, setAnswers] = useState([]);
  const [sessionAnswers, setSessionAnswers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [currentAnswerIndex, setCurrentAnswerIndex] = useState(0);
  const [noAnswers, setNoAnswers] = useState(false);

  useEffect(() => {
    fetchAnswers();
    fetchContacts();
  }, []);

  const fetchAnswers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/answers/get_answers`);
      const data = await response.json();
      setAnswers(data);
    } catch (error) {
      console.error("Failed to fetch answers:", error);
    }
  };

  const fetchContacts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/get_users`);
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const fetchSession = async () => {
    if (!selectedSession) {
      alert("Selecione uma sessão");
      return null;
    }
    try {
      const response = await fetch(
        `${API_BASE_URL}/whatsapp_session/get_session/${selectedSession}`
      );
      const data = await response.json();
      return data; // Return session data instead of setting state
    } catch (error) {
      console.error("Failed to fetch session:", error);
      return null;
    }
  };

  const getAnswersFromSession = async () => {
    setSessionAnswers([]); // Clear previous answers
    setCurrentAnswerIndex(0);
    setNoAnswers(false);

    const sessionData = await fetchSession();
    if (
      !sessionData ||
      !sessionData.answer_ids ||
      sessionData.answer_ids.length === 0
    ) {
      console.warn("No answers found for this session.");
      setNoAnswers(true);
      return;
    }

    const filteredAnswers = answers.filter((answer) =>
      sessionData.answer_ids.includes(answer._id)
    );

    if (filteredAnswers.length === 0) {
      setNoAnswers(true);
    } else {
      setSessionAnswers(filteredAnswers);
    }
  };

  const currentAnswer = sessionAnswers[currentAnswerIndex];

  const getUserName = (userId) => {
    const user = contacts.find((contact) => contact._id === userId);
    return user ? user.name : "Usuário Desconhecido";
  };

  return (
    <div>
      <button className="generic-button" onClick={getAnswersFromSession}>
        Obter Respostas
      </button>

      {noAnswers && (
        <p className="no-answers">
          Nenhuma resposta disponível para esta sessão.
        </p>
      )}

      {currentAnswer && (
        <div className="answer-display">
          <p>
            <strong>Nome:</strong> {getUserName(currentAnswer.user_id)}
          </p>
          <p>
            <strong>Resposta:</strong> {currentAnswer.answer}
          </p>

          <div className="navigation-buttons">
            <button
              onClick={() => setCurrentAnswerIndex((prev) => prev - 1)}
              disabled={currentAnswerIndex === 0}
            >
              Anterior
            </button>

            <button
              onClick={() => setCurrentAnswerIndex((prev) => prev + 1)}
              disabled={currentAnswerIndex === sessionAnswers.length - 1}
            >
              Próximo
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

AnswerDisplay.propTypes = {
  API_BASE_URL: PropTypes.string.isRequired,
  selectedSession: PropTypes.string.isRequired,
};

export default AnswerDisplay;
