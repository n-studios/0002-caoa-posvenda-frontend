import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/shared-components/Button";
import Config from "../../components/trainer-components/Config";
import TrainerSection from "../../components/trainer-components/TrainerSection";
import ChatDisplay from "../../components/chat-components/ChatDisplay";
import TextArea from "../../components/chat-components/TextArea";
import ErrorDisplay from "../../components/chat-components/ErrorDisplay";
import Loader from "../../components/chat-components/Loader";
import EvaluationButton from "../../components/trainer-components/EvaluationButton";
import "./Trainer.css";

const API_BASE_URL =
  "https://0002-caoa-posvenda-api-evaluation.azurewebsites.net/api/v1";

const ANSWER_BASE_URL =
  "https://0002-caoa-posvenda-api-evaluation.azurewebsites.net";

const Trainer = () => {
  const navigate = useNavigate();

  const [rubrics, setRubrics] = useState([]);
  const [selectedRubric, setSelectedRubric] = useState("");
  const [newRubric, setNewRubric] = useState({
    rating_system: "",
    rubric: "",
  });
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRubrics();
    fetchQuestions();
  }, []);

  const fetchRubrics = () => {
    fetch(`${API_BASE_URL}/rubrics/get_rubrics`)
      .then((response) => response.json())
      .then((data) => {
        setRubrics(data);
      })
      .catch((error) => console.error("Error fetching rubrics:", error));
  };

  const handleRubricChange = (e) => {
    const selectedId = e.target.value;
    setSelectedRubric(selectedId);

    const selectedRubricData = rubrics.find(
      (rubric) => rubric._id === selectedId
    );
    if (selectedRubricData) {
      setNewRubric({
        rating_system: selectedRubricData.rating_system || "",
        rubric: selectedRubricData.rubric || "",
      });
    } else {
      setNewRubric({ rating_system: "", rubric: "" });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRubric((prev) => ({
      ...prev,
      [name]: value,
    }));
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
    const updatedRubric = {
      rubric_id: selectedRubric,
      rating_system: newRubric.rating_system,
      rubric: newRubric.rubric,
    };

    fetch(`${API_BASE_URL}/rubrics/update_rubric`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedRubric),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update rubric");
        }
        return response.json();
      })
      .then(() => {
        fetchRubrics();
        setNewRubric({ rating_system: "", rubric: "" });
        setSelectedRubric("");
      })
      .catch((error) => console.error("Error updating rubric:", error));
  };

  const handleDeleteRubric = (rubric_id) => {
    fetch(`${API_BASE_URL}/rubrics/delete_rubric/${rubric_id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        fetchRubrics();
        setSelectedRubric("");
        setNewRubric({ rating_system: "", rubric: "" });
      })
      .catch((error) => console.error("Error deleting rubric:", error));
  };

  const fetchQuestions = () => {
    fetch(`${API_BASE_URL}/questions/get_questions`)
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
      })
      .catch((error) => console.error("Error fetching questions:", error));
  };

  const handleQuestionChange = (e) => {
    const selectedId = e.target.value;
    const selectedQuestion = questions.find((q) => q._id === selectedId);
    setSelectedQuestion(selectedQuestion);
  };

  const handleCreateQuestion = (question) => {
    fetch(`${API_BASE_URL}/questions/create_question`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(question),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to create question");
        return response.json();
      })
      .then(() => {
        fetchQuestions();
      })
      .catch((error) => console.error("Error creating question:", error));
  };

  const handleUpdateQuestion = (question) => {
    fetch(`${API_BASE_URL}/questions/update_question`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...question,
        question_id: selectedQuestion._id,
      }),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to update question");
        return response.json();
      })
      .then(() => {
        fetchQuestions();
        setSelectedQuestion(null);
      })
      .catch((error) => console.error("Error updating question:", error));
  };

  const handleDeleteQuestion = (questionId) => {
    fetch(`${API_BASE_URL}/questions/delete_question/${questionId}`, {
      method: "DELETE",
    })
      .then(() => {
        fetchQuestions();
        setSelectedQuestion(null);
      })
      .catch((error) => console.error("Error deleting question:", error));
  };

  const handleSendAnswer = async () => {
    if (!inputText.trim() || !selectedQuestion || !selectedRubric) {
      setError(
        "Por favor selecione uma rúbrica, uma pergunta e escreva uma resposta"
      );
      return;
    }

    setIsLoading(true);
    setError(null);

    const questionId =
      questions.findIndex((q) => q._id === selectedQuestion._id) + 1;
    const rubricId = rubrics.findIndex((r) => r._id === selectedRubric) + 1;

    const answerData = {
      id: questionId,
      input: inputText,
      experiment_id: rubricId,
    };

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: inputText },
    ]);

    try {
      const response = await fetch(`${ANSWER_BASE_URL}/answer/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answerData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to send message");
      }

      const responseData = await response.json();
      let formattedText = `Avaliação: ${responseData.evaluation}
      `;

      if (responseData.score) {
        formattedText += `Nota: ${responseData.score}\n`;
      }

      if (responseData.rating) {
        formattedText += `Rating: ${responseData.rating}\n`;
      }

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: formattedText },
      ]);

      setInputText("");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendEvaluation = async () => {
    if (!inputText.trim() || !selectedQuestion || !selectedRubric) {
      setError(
        "Por favor selecione uma rúbrica, uma pergunta e escreva uma resposta"
      );
      return;
    }

    setIsLoading(true);
    setError(null);

    const getRubric = rubrics.find((r) => r._id === selectedRubric);

    const evaluationData = {
      question: selectedQuestion.question,
      ground_truth: selectedQuestion.ground_truth,
      rubric: getRubric.rubric,
      rating_system: getRubric.rating_system,
      user_input: inputText,
    };

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: inputText },
    ]);

    try {
      const response = await fetch(
        `${API_BASE_URL}/evaluation/evaluate_response`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(evaluationData),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to send message");
      }

      const responseData = await response.json();
      console.log(responseData);
      let formattedText = `Avaliação: ${responseData.evaluation}
      `;

      if (responseData.rubric_score) {
        formattedText += `Nota da Rúbrica: ${responseData.rubric_score}\n`;
      }

      if (responseData.rating) {
        formattedText += `Rating: ${responseData.rating}\n`;
      }

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: formattedText },
      ]);

      setInputText("");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="trainer-page">
      <div className="trainer-sidebar">
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
          options={questions.map((q) => ({
            value: q._id,
            label: q.question,
          }))}
          textareaRows={3}
          onQuestionChange={handleQuestionChange}
          questionData={selectedQuestion}
          onCreateQuestion={handleCreateQuestion}
          onUpdateQuestion={handleUpdateQuestion}
          onDeleteQuestion={handleDeleteQuestion}
        />
      </div>
      <div className="trainer-container">
        <h1>Trainer</h1>
        {selectedQuestion && (
          <div className="question-display">
            <h4>Pergunta: {selectedQuestion.question}</h4>
          </div>
        )}
        <ChatDisplay messages={messages} />
        <TextArea
          inputText={inputText}
          setInputText={setInputText}
          onSendMessage={handleSendAnswer}
          isLoading={isLoading}
        />
        {error && <ErrorDisplay error={error} />}
        {isLoading && <Loader />}
        <EvaluationButton
          buttonText="Avaliar"
          className={`generic-button ${isLoading ? "load" : ""}`}
          onClick={handleSendEvaluation}
        />
      </div>
      <div className="return-button">
        <Button onClick={() => navigate("/")} buttonText={"Página inicial"} />
      </div>
    </div>
  );
};

export default Trainer;
