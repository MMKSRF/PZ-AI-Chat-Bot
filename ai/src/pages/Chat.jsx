import { useContext, useState, useEffect, useRef } from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import Loader from "../components/Loader";
import { ChatContext } from "../contexts/SecondPage";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

function Chat() {
  const { response, renderCode, handleSubmit, inputRef, isLoading } = useContext(ChatContext);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [response]);

  // Handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Enhanced submit handler
  const handleEnhancedSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      handleSubmit(e);
      setInputValue("");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="flex-1 overflow-y-auto p-6">
        {!response && (
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AI Chat</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Start a conversation with the AI assistant.
            </p>
          </div>
        )}

        {response && (
          <div className="space-y-4">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                AI Response:
              </h3>
              <div className="text-gray-700 dark:text-gray-300">
                {renderCode(response)}
              </div>
            </div>
            <div ref={messagesEndRef} /> {/* Auto-scroll anchor */}
          </div>
        )}
      </div>

      {/* Input Form */}
      <form
        onSubmit={handleEnhancedSubmit}
        className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4"
      >


        <div className="flex items-center gap-2">
          <input
            type="text"
            ref={inputRef}
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Ask me anything..."
            className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
            disabled={isLoading}
          />
          <Button
            type="submit"
            className="p-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
            disabled={isLoading || !inputValue.trim()}
          >
            {isLoading ? (
              <Loader size="sm" type="spinner" />
            ) : (
              <PaperAirplaneIcon className="w-5 h-5" />
            )}
          </Button>
        </div>


        
      </form>
    </div>
  );
}

export default Chat;