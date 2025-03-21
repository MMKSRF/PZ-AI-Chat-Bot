import { useContext, useState, useEffect, useRef, memo } from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import Loader from "../components/Loader";
import { ChatContext } from "../contexts/SecondPage";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import MathCodeRenderer from "../components/MathCodeRenderer";

const MemoizedMathCodeRenderer = memo(MathCodeRenderer);

function Chat() {
  const {
    response,
    handleSubmit,
    inputRef,
    isLoading,
    userPromptHistory
  } = useContext(ChatContext);

  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [userPromptHistory, response]);

  const handleEnhancedSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      handleSubmit();
      setInputValue("");
    }
  };

  return (
      <div className="flex flex-col  h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <div ref={containerRef} className="flex-1 overflow-y-auto p-6">

          {userPromptHistory.length === 0 && (
              <div className="text-center py-12">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AI Chat</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Start a conversation with the AI assistant.
                </p>
              </div>
          )}



          {userPromptHistory.map((entry, index) => (
              <div key={index} className=" space-y-4 mt-4">
                {/* User Question */}
                <div className="p-4 bg-white dark:bg-gray-700  align-super rounded-lg shadow-md w-4/5 self-end">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    User :
                  </h3>
                  <div className="text-gray-700 dark:text-gray-300">
                    <MemoizedMathCodeRenderer content={entry.userQuestion} />
                  </div>
                </div>

                {/* AI Response */}
                {entry.userAnswer && (
                    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        AI Response :
                      </h3>
                      <div className="text-gray-700 dark:text-gray-300">
                        <MemoizedMathCodeRenderer
                            content={index === userPromptHistory.length - 1 ? response : entry.userAnswer}
                        />
                      </div>
                    </div>
                )}
              </div>
          ))}




          {/*/!* Loading indicator *!/*/}
          {/*{isLoading && (*/}
          {/*    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">*/}
          {/*      <Loader size="md" type="spinner" />*/}
          {/*    </div>*/}
          {/*)}*/}

          <div ref={messagesEndRef} />
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
                onChange={(e) => setInputValue(e.target.value)}
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