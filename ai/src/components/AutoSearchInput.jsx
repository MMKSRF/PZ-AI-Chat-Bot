
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { debounce } from "lodash-es";

export default function AutoSearchInput() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  // Simulated search function
  const search = async (term) => {
    // In a real application, you would call an API here
    console.log("Searching for:", term);
    // Simulated results
    const simulatedResults = ["Apple", "Banana", "Cherry", "Date", "Elderberry"].filter((fruit) =>
      fruit.toLowerCase().includes(term.toLowerCase())
    );
    setResults(simulatedResults);
  };

  // Debounce the search function to avoid too many calls
  const debouncedSearch = debounce(search, 300);

  useEffect(() => {
    if (searchTerm) {
      debouncedSearch(searchTerm);
    } else {
      setResults([]);
    }

    // Cleanup
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm, debouncedSearch]); // Added debouncedSearch to dependencies

  return (
    <div className="w-full max-w-md">
      <Input
        type="text"
        placeholder="Start typing to search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      {results.length > 0 && (
        <ul className="bg-white border rounded-md shadow-sm">
          {results.map((result, index) => (
            <li key={index} className="px-4 py-2 hover:bg-gray-100">
              {result}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}






