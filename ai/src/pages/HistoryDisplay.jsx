import { X, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { useContext } from 'react';
import { AIStudioHeaderContext, HistoryContext } from '../contexts/FirstPage';
import Loader from '../components/Loader';

const HistoryPage = () => {
  const {
    searchQuery,
    setSearchQuery,
    filteredTopics,
    toggleTopic,
    expandedTopics,
    deleteTopic,
    isLoading,
  } = useContext(HistoryContext);
  const { setHistoryClicked } = useContext(AIStudioHeaderContext);

  return (
    <div className="h-full  bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 w-full flex flex-col">
      {/* Header Section */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
        <button
            onClick={() => setHistoryClicked(false)}
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X size={18} className="text-gray-600 dark:text-gray-300" />
          </button>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Chat History</h2>
         
        </div>


        

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search history..."
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:bg-gray-800 dark:text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search size={16} className="absolute right-3 top-2.5 text-gray-400 dark:text-gray-500" />
        </div>
      </div>




      {/* Loading State */}
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <Loader size="sm" type="spinner" />
        </div>
      ) : (
        /* History List */
        <div className="flex-1 overflow-y-auto p-2">
          {filteredTopics.length === 0 ? (
            <div className="text-center p-4 text-sm text-gray-500 dark:text-gray-400">
              No history found{searchQuery && ` for "${searchQuery}"`}
            </div>
          ) : (
            filteredTopics.map((topic) => (
              <div
                key={topic.topic}
                className="group mb-2 bg-white dark:bg-gray-800 rounded-lg shadow-xs hover:shadow-sm transition-shadow"
              >
                {/* Topic Header */}
                <div className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                  <div className="flex items-center flex-1 min-w-0">
                    <button
                      onClick={() => toggleTopic(topic.topic)}
                      className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white mr-2"
                    >
                      {expandedTopics[topic.topic] ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </button>
                    <div className="flex-1 truncate">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {topic.topic}
                      </h3>
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 space-x-2">
                        <span>{topic.interactions.length} chats</span>
                        <span>•</span>
                        <span>
                          {new Date(topic.lastUpdated).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteTopic(topic.topic)}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md text-gray-500 dark:text-gray-400 transition-opacity"
                  >
                    <X size={14} />
                  </button>
                </div>

                {/* Interactions List */}
                {expandedTopics[topic.topic] && (
                  <div className="pl-8 pr-2 pb-2 space-y-2">
                    {topic.interactions.map((interaction) => (
                      <div
                        key={interaction.id}
                        className="text-xs border-l-2 border-gray-200 dark:border-gray-600 pl-2"
                      >
                        <div className="mb-1 text-gray-700 dark:text-gray-300 line-clamp-2">
                          {interaction.question}
                        </div>
                        <div className="text-gray-500 dark:text-gray-400 text-xxs">
                          {new Date(interaction.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;