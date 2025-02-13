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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button and Header */}
        <div className="flex flex-col space-y-4 mb-6">
          <button
            onClick={() => setHistoryClicked(false)}
            className="px-4 py-2 text-black dark:text-white border-2 border-black dark:border-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm font-medium w-fit"
          >
            Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Interaction History</h1>
        </div>

        {/* Search Bar */}
        <div className="mb-6 sticky top-0 bg-gray-50 dark:bg-gray-900 py-4 z-10">
          <div className="relative">
            <input
              type="text"
              placeholder="Search history..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute right-3 top-3.5 text-gray-400 dark:text-gray-500" size={20} />
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center py-8">
            <Loader size="md" type="spinner" />
          </div>
        )}

        {/* Topics List */}
        {!isLoading && filteredTopics.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            No history found{searchQuery && ` for "${searchQuery}"`}
          </div>
        ) : (
          filteredTopics.map((topic) => (
            <div
              key={topic.topic}
              className="mb-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
            >
              {/* Topic Header */}
              <div className="flex justify-between items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => toggleTopic(topic.topic)}
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    {expandedTopics[topic.topic] ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </button>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {topic.topic}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {topic.interactions.length} interactions • 
                      Last updated: {new Date(topic.lastUpdated).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => deleteTopic(topic.topic)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Interactions List */}
              {expandedTopics[topic.topic] && (
                <div className="border-t border-gray-200 dark:border-gray-700 p-4 space-y-4">
                  {topic.interactions.map((interaction) => (
                    <div key={interaction.id} className="space-y-2">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row gap-4">
                            {/* User Question */}
                            <div className="flex-1 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                You asked:
                              </p>
                              <p className="text-gray-700 dark:text-gray-300 mt-1">
                                {interaction.question}
                              </p>
                            </div>
                            {/* AI Response */}
                            <div className="flex-1 bg-gray-100 dark:bg-gray-600 p-4 rounded-lg">
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                AI responded:
                              </p>
                              <p className="text-gray-700 dark:text-gray-300 mt-1">
                                {interaction.answer}
                              </p>
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                            {new Date(interaction.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HistoryPage;