import { useState, useMemo } from 'react';
import { 
  ChevronRightIcon, DocumentTextIcon, CodeBracketIcon, 
  BookOpenIcon, QuestionMarkCircleIcon, ClipboardDocumentIcon,
  /*CommandLineIcon ,*/ SunIcon, MoonIcon, MagnifyingGlassIcon,
  ArrowTopRightOnSquareIcon, ChevronUpDownIcon, LockClosedIcon, XMarkIcon
} from '@heroicons/react/24/outline';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

const DocumentationPage = () => {
  const [activeSection, setActiveSection] = useState('getting-started');
  const [expandedEndpoint, setExpandedEndpoint] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState('v2.1.4');
  const [copiedCode, setCopiedCode] = useState(null);
  const [expandedTOC, setExpandedTOC] = useState(true);
  const [activeExample, setActiveExample] = useState(0);

  const documentationSections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: <BookOpenIcon className="w-5 h-5" />,
      content: `
        ## Welcome to AI Studio
        
        ### Key Features:
        - Natural Language Processing
        - Computer Vision Models
        - Speech Recognition
        - Real-time Inference
        - Batch Processing
        
        ### Quick Start Guide
        1. **Create Account**: Register at [portal.aistudio.com](https://portal.aistudio.com)
        2. **Get API Key**: Navigate to Dashboard → Security → API Keys
        3. **Install SDK**: 
        \`\`\`bash
        npm install ai-studio-sdk@latest
        # or
        pip install ai-studio
        \`\`\`
        4. **First API Call**:
        \`\`\`javascript
        import AIStudio from 'ai-studio-sdk';
        
        const client = new AIStudio({
          apiKey: 'YOUR_KEY',
          version: '${selectedVersion}'
        });
        
        client.chat.completions.create({
          model: 'gpt-4-turbo',
          messages: [{ role: 'user', content: 'Hello AI!' }]
        });
        \`\`\`
        
        ### Requirements
        - Node.js 18+ / Python 3.10+
        - 512MB+ RAM
        - Stable internet connection
      `
    },
    // Expanded API Reference section
    {
      id: 'api-reference',
      title: 'API Reference',
      icon: <CodeBracketIcon className="w-5 h-5" />,
      endpoints: [
        {
          id: 'text-completion',
          name: 'Text Completion',
          method: 'POST',
          path: '/v1/completions',
          parameters: [
            { name: 'model', type: 'string', required: true, description: 'Model ID' },
            { name: 'prompt', type: 'string|array', required: true },
            { name: 'max_tokens', type: 'integer', default: 100 }
          ],
          example: `const response = await client.completions.create({
  model: "gpt-4",
  prompt: "Hello world",
  max_tokens: 100,
  temperature: 0.7
});`,
          responseSchema: {
            id: "string",
            object: "text_completion",
            created: "timestamp",
            model: "string",
            choices: [{
              text: "string",
              index: "integer",
              logprobs: "object",
              finish_reason: "string"
            }]
          },
          errorCodes: [
            { code: 400, message: "Invalid request parameters" },
            { code: 429, message: "Rate limit exceeded" }
          ]
        },
        // Additional endpoints...
      ]
    },
    // Expanded Guides section
    {
      id: 'guides',
      title: 'Guides & Tutorials',
      icon: <DocumentTextIcon className="w-5 h-5" />,
      content: `
        ## Comprehensive Guides
        
        ### Best Practices
        - **Rate Limiting**: Implement exponential backoff
        - **Error Handling**:
        \`\`\`javascript
        try {
          const response = await client.apiCall();
        } catch (error) {
          if (error.status === 429) {
            // Handle rate limit
          }
        }
        \`\`\`
        - **Cost Optimization**: Use streaming for long responses
        
        ### Tutorial: Build a Chatbot
        1. Initialize client
        2. Create message handler
        3. Implement conversation history
        4. Add error boundaries
        
        ### Migration Guide (v1 → v2)
        - Updated response schema
        - New authentication flow
        - Deprecated endpoints
      `
    },
    // Expanded Support section
    {
      id: 'support',
      title: 'Help & Support',
      icon: <QuestionMarkCircleIcon className="w-5 h-5" />,
      content: `
        ## Comprehensive Support
        
        ### FAQ
        **Q: How to handle rate limits?**  
        A: Implement retry logic with 429 status detection
        
        **Q: Model versioning policy?**  
        A: Major versions supported for 6 months
        
        ### Support Channels
        - **Email**: support@aistudio.com (response <4hrs)
        - **Community Forum**: [forum.aistudio.com](https://forum.aistudio.com)
        - **Emergency**: +1-800-AI-STUDIO
        
        ### Service Status
        - API: Operational
        - Dashboard: Maintenance planned 2024-03-20
      `
    }
  ];

  // Advanced search functionality
  const filteredSections = useMemo(() => {
    if (!searchQuery) return documentationSections;
    
    const query = searchQuery.toLowerCase();
    return documentationSections.map(section => ({
      ...section,
      endpoints: section.endpoints?.filter(endpoint =>
        endpoint.name.toLowerCase().includes(query) ||
        endpoint.method.toLowerCase().includes(query) ||
        endpoint.path.toLowerCase().includes(query) ||
        endpoint.example?.toLowerCase().includes(query)
      ),
      content: section.content?.toLowerCase().includes(query) ? section.content : null
    })).filter(section => 
      section.content || 
      (section.endpoints && section.endpoints.length > 0)
    );
  }, [searchQuery]);

  // Code copy functionality
  const copyToClipboard = (code, sectionId) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(sectionId);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Dark mode toggle
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
  };

  // Version selector
  const versions = [
    'v2.1.4 (current)',
    'v2.0.0',
    'v1.4.3',
    'v1.3.9'
  ];

  // Table of contents generator
  const generateTOC = (content) => {
    const headings = content.match(/#{2,3}\s.+$/gm) || [];
    return headings.map(heading => ({
      level: heading.startsWith('###') ? 3 : 2,
      title: heading.replace(/#{2,3}\s/, ''),
      anchor: heading.toLowerCase().replace(/#{2,3}\s/g, '').replace(/ /g, '-')
    }));
  };

  const currentSection = documentationSections.find(s => s.id === activeSection);
  const toc = currentSection?.content ? generateTOC(currentSection.content) : [];

  return (
    <div className={`min-h-screen w-[1450px] bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-8">




        <div className="flex flex-col md:flex-row gap-8">
          {/* Enhanced Sidebar */}
          <div className="w-full md:w-72 lg:w-80 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold dark:text-white">Documentation</h2>
              <div className="flex gap-2">
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {darkMode ? (
                    <SunIcon className="w-5 h-5 dark:text-white" />
                  ) : (
                    <MoonIcon className="w-5 h-5" />
                  )}
                </button>
                <select
                  value={selectedVersion}
                  onChange={(e) => setSelectedVersion(e.target.value)}
                  className="px-2 py-1 rounded-lg border dark:bg-gray-800 dark:text-white"
                >
                  {versions.map(version => (
                    <option key={version} value={version}>{version}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="relative">
              <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search documentation..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Table of Contents */}
            {toc.length > 0 && (
              <div className="border rounded-lg p-4 dark:bg-gray-800">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium dark:text-white">Contents</h3>
                  <button
                    onClick={() => setExpandedTOC(!expandedTOC)}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  >
                    <ChevronUpDownIcon className="w-5 h-5 dark:text-white" />
                  </button>
                </div>
                {expandedTOC && (
                  <nav className="space-y-2">
                    {toc.map((item, index) => (
                      <a
                        key={index}
                        href={`#${item.anchor}`}
                        className={`block text-sm ${item.level === 3 ? 'pl-4' : ''} 
                          text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400`}
                      >
                        {item.title}
                      </a>
                    ))}
                  </nav>
                )}
              </div>
            )}

            {/* Navigation */}
            <nav className="space-y-1">
              {filteredSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => {
                    setActiveSection(section.id);
                    setSearchQuery('');
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-2 text-left rounded-lg
                    ${activeSection === section.id 
                      ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                >
                  {section.icon}
                  <span>{section.title}</span>
                  {section.endpoints && (
                    <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">
                      {section.endpoints.length} endpoints
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>























          {/* Enhanced Main Content */}
          <div className=" w-3/5 bg-white dark:bg-gray-800 rounded-xl  shadow-sm ml-9 p-6 lg:p-8">
            
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold dark:text-white">
                {currentSection?.title}
                <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                  {selectedVersion}
                </span>
              </h1>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <ArrowTopRightOnSquareIcon className="w-5 h-5 dark:text-white" />
              </button>
            </div>



            {/* Interactive Examples */}
            <div className="mb-8 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex gap-2 mb-4">

                {['JavaScript', 'Python', 'cURL'].map((lang, idx) => (
                  <button
                    key={lang}
                    onClick={() => setActiveExample(idx)}
                    className={`px-4 py-2 rounded-md ${
                      activeExample === idx
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500'
                    }`}
                    
                  >
                    {lang}
                  </button>
                ))}
              </div>

              <SyntaxHighlighter 
                language={['javascript', 'python', 'bash'][activeExample]}
                style={darkMode ? atomDark : vs}
                className="rounded-lg"
              >

                {currentSection?.endpoints?.[0]?.example || ''}
              </SyntaxHighlighter>
              <button
                onClick={() => copyToClipboard(currentSection?.endpoints?.[0]?.example, currentSection.id)}
                className="mt-2 text-sm text-purple-600 dark:text-purple-400 hover:underline flex items-center"
              >
                <ClipboardDocumentIcon className="w-4 h-4 mr-1" />
                {copiedCode === currentSection?.id ? 'Copied!' : 'Copy Code'}
              </button>
            </div>

            {/* Dynamic Content */}
            <div className="space-y-8 dark:text-gray-300">
              {currentSection?.content ? (
                <Markdown
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    code({ /*node , */ inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || '');
                      return !inline && match ? (
                        <div className="relative">
                          <SyntaxHighlighter
                            style={darkMode ? atomDark : vs}
                            language={match[1]}
                            PreTag="div"
                            {...props}
                          >
                            {String(children).replace(/\n$/, '')}
                          </SyntaxHighlighter>
                          <button
                            onClick={() => copyToClipboard(String(children))}
                            className="absolute top-2 right-2 p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                          >
                            <ClipboardDocumentIcon className="w-4 h-4 dark:text-white" />
                          </button>
                        </div>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    }
                  }}
                >
                  {currentSection.content}
                </Markdown>
              ) : currentSection?.endpoints?.map(endpoint => (
                <div key={endpoint.id} className="border rounded-lg overflow-hidden dark:border-gray-700">
                  {/* Expanded Endpoint Documentation */}
                  <div 
                    className="p-4 bg-gray-50 dark:bg-gray-700 flex justify-between items-center cursor-pointer"
                    onClick={() => setExpandedEndpoint(expandedEndpoint === endpoint.id ? null : endpoint.id)}
                  >
                    <div>
                      <span className={`font-mono px-2 py-1 rounded mr-2 
                        ${endpoint.method === 'POST' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' : 
                          'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400'}`}>
                        {endpoint.method}
                      </span>
                      <span className="font-medium dark:text-white">{endpoint.name}</span>
                    </div>
                    <ChevronRightIcon className={`w-5 h-5 transform transition-transform ${
                      expandedEndpoint === endpoint.id ? 'rotate-90' : ''
                    } dark:text-white`} />
                  </div>
                  
                  {expandedEndpoint === endpoint.id && (
                    <div className="p-4 bg-white dark:bg-gray-800 space-y-6">
                      {/* Endpoint Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-medium mb-2 dark:text-white">Endpoint</h3>
                          <code className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
                            https://api.aistudio.com{endpoint.path}
                          </code>
                        </div>
                        <div>
                          <h3 className="font-medium mb-2 dark:text-white">Authentication</h3>
                          <div className="flex items-center space-x-2">
                            <LockClosedIcon className="w-4 h-4 dark:text-white" />
                            <span className="text-sm dark:text-gray-300">Bearer Token Required</span>
                          </div>
                        </div>
                      </div>

                      {/* Parameters Table */}
                      <div>
                        <h3 className="font-medium mb-2 dark:text-white">Parameters</h3>
                        <div className="border rounded-lg overflow-hidden dark:border-gray-700">
                          <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                              <tr>
                                <th className="px-4 py-2 text-left dark:text-white">Name</th>
                                <th className="px-4 py-2 text-left dark:text-white">Type</th>
                                <th className="px-4 py-2 text-left dark:text-white">Required</th>
                                <th className="px-4 py-2 text-left dark:text-white">Description</th>
                              </tr>
                            </thead>
                            <tbody>
                              {endpoint.parameters?.map((param, idx) => (
                                <tr key={idx} className="border-t dark:border-gray-700">
                                  <td className="px-4 py-2 font-mono dark:text-gray-300">{param.name}</td>
                                  <td className="px-4 py-2 dark:text-gray-300">{param.type}</td>
                                  <td className="px-4 py-2 dark:text-gray-300">
                                    {param.required ? 'Yes' : 'No'}
                                  </td>
                                  <td className="px-4 py-2 dark:text-gray-300">{param.description}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Example Request */}
                      <div>
                        <h3 className="font-medium mb-2 dark:text-white">Example Request</h3>
                        <SyntaxHighlighter 
                          language="javascript" 
                          style={darkMode ? atomDark : vs}
                          className="rounded-lg"
                        >
                          {endpoint.example}
                        </SyntaxHighlighter>
                      </div>

                      {/* Response Schema */}
                      <div>
                        <h3 className="font-medium mb-2 dark:text-white">Response Schema</h3>
                        <SyntaxHighlighter 
                          language="json" 
                          style={darkMode ? atomDark : vs}
                          className="rounded-lg"
                        >
                          {JSON.stringify(endpoint.responseSchema, null, 2)}
                        </SyntaxHighlighter>
                      </div>

                      {/* Error Handling */}
                      <div>
                        <h3 className="font-medium mb-2 dark:text-white">Error Codes</h3>
                        <div className="space-y-2">
                          {endpoint.errorCodes?.map((error, idx) => (
                            <div key={idx} className="flex items-center space-x-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                              <span className="font-mono w-12">{error.code}</span>
                              <span className="flex-1 dark:text-gray-300">{error.message}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Feedback Section */}
            <div className="mt-12 pt-8 border-t dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium dark:text-white">Was this helpful?</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Help us improve our documentation
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400">
                    Yes
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400">
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>








      </div>
    </div>
  );
};

export default DocumentationPage;