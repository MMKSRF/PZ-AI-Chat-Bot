import { useEffect, useState, useRef } from "react";
import { createContext } from "react";
import PropTypes from "prop-types";

import axios from "axios";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

// Custom theme for bg-gray-900 (tailwind's dark background)
const customDarkTheme = {
  'code[class*="language-"]': {
    color: '#4c545e', // Light gray text (gray-100)
    background: 'none', // Transparent background
    fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
    fontSize: '14px',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    wordWrap: 'normal',
    lineHeight: '1.5',
    MozTabSize: '4',
    OTabSize: '4',
    tabSize: '4',
    WebkitHyphens: 'none',
    MozHyphens: 'none',
    msHyphens: 'none',
    hyphens: 'none',
  },
  'pre[class*="language-"]': {
    color: '#', // Light gray text (gray-100)
    background: '#0a0e14', // Darker background for code blocks
    padding: '1rem',
    margin: '0.5rem 0',
    borderRadius: '0.5rem', // Rounded corners
    overflow: 'auto',
    border: '1px solid #374151', // Border matching gray-700
  },
  ':not(pre) > code[class*="language-"]': {
    background: '#1f2937', // Slightly lighter than bg-gray-900
    padding: '0.1rem 0.3rem',
    borderRadius: '0.3rem',
    whiteSpace: 'normal',
  },
  comment: {
    color: '#6b7280', // Gray-500 for comments
  },
  prolog: {
    color: '#6b7280', // Gray-500
  },
  doctype: {
    color: '#6b7280', // Gray-500
  },
  cdata: {
    color: '#6b7280', // Gray-500
  },
  punctuation: {
    color: '#d1d5db', // Gray-300
  },
  property: {
    color: '#60a5fa', // Blue-400
  },
  tag: {
    color: '#60a5fa', // Blue-400
  },
  boolean: {
    color: '#60a5fa', // Blue-400
  },
  number: {
    color: '#f472b6', // Pink-400
  },
  constant: {
    color: '#f472b6', // Pink-400
  },
  symbol: {
    color: '#f472b6', // Pink-400
  },
  selector: {
    color: '#34d399', // Green-400
  },
  'attr-name': {
    color: '#34d399', // Green-400
  },
  string: {
    color: '#34d399', // Green-400
  },
  char: {
    color: '#34d399', // Green-400
  },
  builtin: {
    color: '#34d399', // Green-400
  },
  operator: {
    color: '#fbbf24', // Yellow-400
  },
  entity: {
    color: '#fbbf24', // Yellow-400
  },
  url: {
    color: '#fbbf24', // Yellow-400
  },
  keyword: {
    color: '#f472b6', // Pink-400
  },
  'atrule': {
    color: '#f472b6', // Pink-400
  },
  'attr-value': {
    color: '#34d399', // Green-400
  },
  function: {
    color: '#60a5fa', // Blue-400
  },
  regex: {
    color: '#f472b6', // Pink-400
  },
  important: {
    color: '#f472b6', // Pink-400
    fontWeight: 'bold',
  },
  variable: {
    color: '#f472b6', // Pink-400
  },
};

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setIsLoading(true);
    setInput(inputRef.current.value);
  };

  useEffect(() => {
    if (!isSubmitted || !input) {
      return;
    }

    async function getAiConetion() {
      try {
        const result = await axios.get("http://localhost:9000/ai");
        setResponse(result.data[0].choices[0].message.content);
      } catch (error) {
        console.error("Error:", error);
        setResponse("Failed to get a response from the AI.");
      } finally {
        setIsLoading(false);
        setIsSubmitted(false);
      }
    }

    getAiConetion();
  }, [input, isSubmitted]);

  const renderCode = (text) => {
    const codeBlockRegex = /```(\w*)\n/;
    const match = codeBlockRegex.exec(text);

    if (match) {
      const [fullMatch, lang] = match;
      const index = match.index;
      const code = text.slice(index + fullMatch.length);

      return (
        <>
          {text.slice(0, index)}
          <SyntaxHighlighter language={lang || "text"} style={customDarkTheme}>
            {code}
          </SyntaxHighlighter>
        </>
      );
    }

    return text;
  };

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
        renderCode,
        handleSubmit,
        setIsDarkTheme,
        history,
        setHistory, // Make sure setHistory is also provided
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