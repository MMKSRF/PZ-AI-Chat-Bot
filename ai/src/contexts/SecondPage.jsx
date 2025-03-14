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
  const [history, setHistory] = useState([]); // Initialize history as an empty array
  const inputRef = useRef(null);

  const handleSubmit = async () => {
    setIsSubmitted(true);
    setIsLoading(true);
    setInput(inputRef.current.value);
  };

  useEffect(() => {
    if (!isSubmitted || !input) {
      return;
    }

    async function getAiConnection() {
      try {
        const response = await fetch("http://localhost:3000/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question: input }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
 
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let aiResponse = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          aiResponse += decoder.decode(value);
          setResponse(aiResponse); // Update the response progressively
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