import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const AnswerDisplay = ({ API_BASE_URL, selectedSession }) => {
  const [answers, setAnswers] = useState([]);
  const [sessionAnswers, setSessionAnswers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [currentAnswerIndex, setCurrentAnswerIndex] = useState(0);
  const [noAnswers, setNoAnswers] = useState(false);
  const [sessionEvaluations, setSessionEvaluations] = useState([]);
  const [currentEvaluationIndex, setCurrentEvaluationIndex] = useState(0);
  const [noEvaluations, setNoEvaluations] = useState(false);

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
      return data;
    } catch (error) {
      console.error("Failed to fetch session:", error);
      return null;
    }
  };

  const fetchEvaluations = async () => {
    if (!selectedSession) {
      alert("Selecione uma sessão");
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/evaluation/evaluate_whatsapp_session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ session_id: selectedSession }),
        }
      );

      const result = await response.json();
      if (result.evaluations.length === 0) {
        setNoEvaluations(true);
        setSessionEvaluations([]);
      } else {
        setNoEvaluations(false);
        setSessionEvaluations(result.evaluations);
      }
    } catch (error) {
      console.error("Error fetching evaluations:", error);
    }
  };

  const getAnswersFromSession = async () => {
    setSessionAnswers([]);
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
  const currentEvaluation = sessionEvaluations[currentEvaluationIndex];

  const getUserName = (userId) => {
    const user = contacts.find((contact) => contact._id === userId);
    return user ? user.name : "Usuário Desconhecido";
  };

  return (
    <>
      <div className="answer-display">
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
            <div className="answer-card">
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
      </div>
      <div className="evaluation-display">
        <div>
          <button className="generic-button" onClick={fetchEvaluations}>
            Obter Avaliações
          </button>

          {noEvaluations && (
            <p className="no-evaluations">
              Nenhuma avaliação disponível para esta sessão.
            </p>
          )}

          {currentEvaluation && (
            <div className="evaluation-card">
              <p>
                <strong>Avaliação da resposta de</strong>{" "}
                {getUserName(
                  answers.find(
                    (answer) => answer._id === currentEvaluation.answer_id
                  )?.user_id
                )}
              </p>
              <p>
                <strong>Avaliação:</strong> {currentEvaluation.evaluation}
              </p>
              <p>
                <strong>Nota:</strong> {currentEvaluation.rubric_score}
              </p>
              <p>
                <strong>Classificação:</strong> {currentEvaluation.rating}
              </p>
              <div className="navigation-buttons">
                <button
                  onClick={() => setCurrentEvaluationIndex((prev) => prev - 1)}
                  disabled={currentEvaluationIndex === 0}
                >
                  Anterior
                </button>
                <button
                  onClick={() => setCurrentEvaluationIndex((prev) => prev + 1)}
                  disabled={
                    currentEvaluationIndex === sessionEvaluations.length - 1
                  }
                >
                  Próximo
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

AnswerDisplay.propTypes = {
  API_BASE_URL: PropTypes.string.isRequired,
  selectedSession: PropTypes.string.isRequired,
};

export default AnswerDisplay;
