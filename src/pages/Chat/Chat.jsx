import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/shared-components/Button";
import Sidebar from "../../components/chat-components/Sidebar";
import ChatDisplay from "../../components/chat-components/ChatDisplay";
import TextArea from "../../components/chat-components/TextArea";
import Loader from "../../components/chat-components/Loader";
import ErrorDisplay from "../../components/chat-components/ErrorDisplay";
import "./Chat.css";

const API_BASE_URL =
  "https://0002-caoa-posvenda-api-agents.azurewebsites.net/api/v1";

const mockUserIdBasedOnPhone = "11999999999";

const Chat = () => {
  const navigate = useNavigate();
  const [namespaces, setNamespaces] = useState([]);
  const [selectedNamespace, setSelectedNamespace] = useState("");
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNamespaces = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/info/get-namespaces`);
      if (!response.ok) throw new Error("Failed to fetch namespaces");
      const data = await response.json();
      setNamespaces(data);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  useEffect(() => {
    fetchNamespaces();
  }, [fetchNamespaces]);

  const formatMessageWithLinks = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    let match;
    const parts = [];
    let lastIndex = 0;

    while ((match = urlRegex.exec(text)) !== null) {
      const url = new URL(match[0]);
      const manual = url.searchParams.get("manual");
      const page = url.searchParams.get("page");
      let manualName;
      if (manual === "Tiggo7ProHybrid") {
        manualName = "Tiggo7ProHybrid";
      } else {
        manualName = "Tiggo8ProPHEV";
      }
      const newUrl = `${window.location.origin}/manual?manual=${manualName}&page=${page}`;

      parts.push(text.slice(lastIndex, match.index));
      parts.push(
        `<a href="${newUrl}" target="_blank" rel="noopener noreferrer">${newUrl}</a>`
      );

      lastIndex = match.index + match[0].length;
    }

    parts.push(text.slice(lastIndex));
    return parts.join("");
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || !selectedNamespace) {
      setError("Por favor escreva sua pergunta e selecione um manual");
      return;
    }

    setIsLoading(true);
    setError(null);

    const messageData = {
      message: inputText,
      user_id: mockUserIdBasedOnPhone,
      namespace: selectedNamespace,
    };

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: inputText },
    ]);

    try {
      const response = await fetch(`${API_BASE_URL}/chat/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(messageData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to send message");
      }

      const responseData = await response.json();
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: formatMessageWithLinks(responseData.message) },
      ]);

      setInputText("");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-page">
      <Sidebar
        namespaces={namespaces}
        selectedNamespace={selectedNamespace}
        onSelectNamespace={setSelectedNamespace}
      />
      <div className="chat-container">
        <ChatDisplay messages={messages} />
        <TextArea
          inputText={inputText}
          setInputText={setInputText}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
        {error && <ErrorDisplay error={error} />}
        {isLoading && <Loader />}
      </div>
      <div className="return-button">
        <Button onClick={() => navigate("/")} buttonText={"Página Inicial"} />
      </div>
    </div>
  );
};

export default Chat;
