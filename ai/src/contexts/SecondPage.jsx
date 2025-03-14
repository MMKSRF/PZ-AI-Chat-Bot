import { useEffect, useState, useRef } from "react";
import { createContext } from "react";
import PropTypes from "prop-types";

const ChatContext = createContext();

function ChatProvider({ children }) {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [LogedIn, setLogedIn] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [history, setHistory] = useState([]);
  const inputRef = useRef(null);

  const [userPrompt, setUserPrompt] = useState("");
  const [userPromptHistory, setUserPromptHistory] = useState([]); // Fixed: Now using state

  const handleSubmit = async () => {
    setIsSubmitted(true);
    setIsLoading(true);
    const currentInput = inputRef.current.value;

    // Update state with new prompt
    setInput(currentInput);
    setUserPrompt(currentInput);

    // Add to history immediately with empty answer
    setUserPromptHistory(prev => [
      ...prev,
      {
        userQuestion: currentInput,
        userAnswer: "" // Will be updated when response arrives
      }
    ]);
  };

  useEffect(() => {
    if (!isSubmitted || !input) return;

    async function getAiConnection() {
      try {
        const response = await fetch("http://localhost:3000/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question: input }),
        });

        if (!response.ok) throw new Error("Network response was not ok");

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let aiResponse = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          aiResponse += decoder.decode(value);
          setResponse(aiResponse);

          // Update history with the latest response
          setUserPromptHistory(prev => {
            const newHistory = [...prev];
            if (newHistory.length > 0) {
              newHistory[newHistory.length - 1].userAnswer = aiResponse;
            }
            return newHistory;
          });
        }
      } catch (error) {
        console.error("Error:", error);
        setResponse("Failed to get a response from the AI.");
      } finally {
        setIsLoading(false);
        setIsSubmitted(false);
      }
    }

    getAiConnection();
  }, [input, isSubmitted]);

  return (
      <ChatContext.Provider
          value={{
            input,
            response,
            isLoading,
            isSubmitted,
            inputRef,
            LogedIn,
            isDarkTheme,
            setLogedIn,
            handleSubmit,
            setIsDarkTheme,
            history,
            setHistory,
            userPrompt,
            userPromptHistory // Now properly persisted
          }}
      >
        {children}
      </ChatContext.Provider>
  );
}

ChatProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ChatProvider, ChatContext };