import { useState } from 'react';
import ContentDisplay from './components/Render';  // Import Render.jsx component
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponse('');
    setError('');
    setIsLoading(true);

    try {
      const responseStream = await fetch('http://localhost:3000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: message }),
      });

      if (!responseStream.ok) {
        throw new Error('Something went wrong. Please try again later.');
      }

      const reader = responseStream.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        setResponse((prev) => prev + chunk);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>Chat with AI</h1>
      <form onSubmit={handleSubmit} className="chat-form">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message"
          className="message-input"
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>

      {isLoading && <div className="loading">Loading...</div>}

      {error && <div className="error">{error}</div>}

      <div className="response">
        {/* Pass the AI response to the ContentDisplay component */}
        <ContentDisplay content={response} />
      </div>
    </div>
  );
}

export default App;