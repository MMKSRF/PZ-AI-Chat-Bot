import { useContext, useEffect, useCallback } from 'react';
import { debounce } from 'lodash-es';
import { AIStudioHeaderContext } from '../contexts/FirstPage';
import HistoryPage from './HistoryDisplay';

const AIStudioHeader = () => {
  const { 
    showSearchInput, 
    historyClicked, 
    setHistoryClicked, 
    handleSearchSubmit, 
    setShowSearchInput, 
    searchQuery, 
    setSearchQuery ,

    searchTerm,
    setSearchTerm

  } = useContext(AIStudioHeaderContext);

  // Debounced search submission
  const debouncedSearch = useCallback(
    debounce((query) => {
      if (query) {
        handleSearchSubmit();
      }
    }, 300),
    [handleSearchSubmit]
  );

  useEffect(() => {
    // Trigger search when query changes
    debouncedSearch(searchQuery);
    
    // Cleanup debounce on unmount
    return () => debouncedSearch.cancel();
  }, [searchQuery, debouncedSearch]);

  if (historyClicked) {
    return <HistoryPage />;
  }

  return (
    <header className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-3 lg:px-5">
        <div className="flex items-center justify-between h-16">
          {/* Right Section - Controls */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {showSearchInput ? (
              <div className="flex flex-1 items-center gap-2 max-w-xl">
                <button
                  type="button"
                  onClick={() => {
                    setShowSearchInput(false);
                    setSearchQuery('');
                  }}
                  className="p-0 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                >
                  <svg 
                    className="w-6 h-6 text-gray-600 dark:text-gray-300"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M6 18L18 6M6 6l12 12" 
                    />
                  </svg>
                </button>
                
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search conversations..."
                  autoFocus
                  className="flex-grow px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-900 dark:focus:ring-gray-300 bg-transparent dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                />
              </div>
            ) : (
              <>
                <button
                  onClick={() => setHistoryClicked(e => !e)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                  aria-label="History"
                >
                  <svg 
                    className="w-6 h-6 text-gray-600 dark:text-gray-300"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                    />
                  </svg>
                </button>




                <button
                  onClick={() => setShowSearchInput(true)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                  aria-label="Search"
                >
                  <svg 
                    className="w-6 h-6 text-gray-600 dark:text-gray-300"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                    />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AIStudioHeader;