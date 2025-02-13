import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ClipboardDocumentIcon, CommandLineIcon, ArrowPathIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Loader from './Loader';

const InteractiveDemo = ({ title, darkMode }) => {
  const [activeTab, setActiveTab] = useState('javascript');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [simulateError, setSimulateError] = useState(false);

  const demos = {
    security: {
      javascript: `const secureClient = new AIStudio({
  apiKey: 'sk_secure_123',
  encryption: 'aes-256',
  httpsStrict: true,
  timeout: 5000
});

async function fetchData() {
  try {
    const response = await secureClient.request({
      endpoint: '/v1/secure-data',
      method: 'GET',
      headers: {
        'Content-Security-Policy': 'default-src self'
      }
    });
    console.log('Secure data:', response.data);
  } catch (error) {
    console.error('Security error:', error);
  }
}`,
      response: `{
  "status": "success",
  "data": {
    "id": "enc_12345",
    "payload": "aes-256-encrypted-data",
    "timestamp": "2024-03-15T09:30:00Z"
  },
  "security": {
    "protocol": "TLS 1.3",
    "certificate": "SHA-256"
  }
}`,
      error: `{
  "status": "error",
  "code": 403,
  "message": "Security policy violation",
  "resolution": "Verify encryption headers"
}`
    }
  };

  useEffect(() => {
    setCode(demos.security[activeTab]);
  }, [activeTab]);

  const handleRunCode = async () => {
    setIsLoading(true);
    setOutput('');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    setIsLoading(false);
    setOutput(simulateError ? demos.security.error : demos.security.response);
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
        <h3 className="text-lg font-semibold dark:text-white">{title}</h3>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-1 text-sm dark:text-gray-300">
            <input
              type="checkbox"
              checked={simulateError}
              onChange={(e) => setSimulateError(e.target.checked)}
              className="rounded"
            />
            Simulate Error
          </label>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="flex gap-2 overflow-x-auto">
          {Object.keys(demos.security).filter(k => k !== 'response' && k !== 'error').map(lang => (
            <button
              key={lang}
              onClick={() => setActiveTab(lang)}
              className={`px-4 py-2 rounded-md text-sm ${
                activeTab === lang
                  ? 'bg-purple-600 text-white'
                  : `${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`
              }`}
            >
              {lang}
            </button>
          ))}
        </div>

        <div className="relative">
          <SyntaxHighlighter 
            language={activeTab} 
            style={darkMode ? atomDark : vs}
            className="rounded-lg"
          >
            {code}
          </SyntaxHighlighter>
          <button
            onClick={copyToClipboard}
            className="absolute top-2 right-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <ClipboardDocumentIcon className={`w-5 h-5 ${copied ? 'text-green-500' : 'text-gray-500'}`} />
          </button>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleRunCode}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader size="sm" type="spinner" />
                Executing...
              </>
            ) : (
              <>
                <CommandLineIcon className="w-5 h-5" />
                Run Code
              </>
            )}
          </button>

          <button
            onClick={() => setCode(demos.security[activeTab])}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            <ArrowPathIcon className="w-5 h-5" />
            Reset
          </button>
        </div>

        {output && (
          <div className={`mt-4 p-4 rounded-lg ${
            output.includes('error') 
              ? 'bg-red-50 dark:bg-red-900/20' 
              : 'bg-green-50 dark:bg-green-900/20'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheckIcon className={`w-5 h-5 ${
                output.includes('error') ? 'text-red-500' : 'text-green-500'
              }`} />
              <span className="font-medium dark:text-white">
                {output.includes('error') ? 'Security Alert' : 'Secure Response'}
              </span>
            </div>
            <SyntaxHighlighter 
              language="json" 
              style={darkMode ? atomDark : vs}
              className="rounded-lg"
            >
              {output}
            </SyntaxHighlighter>
          </div>
        )}
      </div>

      <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-b-xl">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <ShieldCheckIcon className="w-4 h-4" />
          <span>This demo uses mock data and doesn&apos;t make real API calls</span>
        </div>
      </div>
    </div>
  );
};
InteractiveDemo.propTypes = {
  title: PropTypes.string.isRequired,
  darkMode: PropTypes.bool.isRequired,
};

export default InteractiveDemo;
