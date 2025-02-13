
import { useState, useEffect } from 'react';
// Add ChevronDownIcon to the imports
import { 
  ChevronDownIcon, // Add this import
  CpuChipIcon, 
  LockClosedIcon, 
  ShieldCheckIcon, 
  ArrowsPointingOutIcon, 
  BookOpenIcon,
  CloudIcon, 
  CommandLineIcon as CLI, 
  PuzzlePieceIcon,
  WifiIcon, 
  ChatBubbleLeftRightIcon,
  
} from '@heroicons/react/24/outline'; // Make sure this line is present
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import FeatureDiagram from '../components/FeatureDiagram';
import Loader from '../components/Loader';
import InteractiveDemo from '../components/InteractiveDemo';
import PricingTable from '../components/PricingTable';
import TestimonialsCarousel from '../components/TestimonialsCarousel';
// In FeatureDiagram.jsx

const FeaturesPage = () => {
  const [activeTab, setActiveTab] = useState('ai');
  const [expandedFeature, setExpandedFeature] = useState(null);
  // const [loadedDiagrams, setLoadedDiagrams] = useState(false);
  let loadedDiagrams = false
  const [darkMode, setDarkMode] = useState(false);
  // const [activeDemo, setActiveDemo] = useState(0);
  const [language, setLanguage] = useState('javascript');

  const features = {
    ai: [
      {
        id: 'natural-language',
        title: "Natural Language Processing",
        icon: <ChatBubbleLeftRightIcon className="w-6 h-6" />,
        description: "Advanced text understanding and generation capabilities powered by GPT-4 architecture",
        capabilities: [
          "Sentiment analysis",
          "Text summarization",
          "Multi-language translation",
          "Contextual conversations",
          "Entity recognition",
          "Content generation"
        ],
        codeExample: {
          javascript: `const analysis = await ai.nlp.analyze({
  text: "Amazing product! Loved the experience.",
  features: ['sentiment', 'entities']
});`,
          python: `analysis = ai.nlp.analyze(
  text="Amazing product! Loved the experience.",
  features=['sentiment', 'entities']
)`,
          curl: `curl -X POST https://api.aistudio.com/v1/analyze \\
-H "Authorization: Bearer YOUR_API_KEY" \\
-H "Content-Type: application/json" \\
-d '{
  "text": "Amazing product! Loved the experience.",
  "features": ["sentiment", "entities"]
}'`
        },
        stats: [
          { label: "Supported Languages", value: "50+" },
          { label: "Accuracy", value: "98.7%" },
          { label: "Response Time", value: "<400ms" }
        ]
      },
      // Add more AI features...
    ],
    platform: [
      {
        id: 'scaling',
        title: "Auto-Scaling Infrastructure",
        icon: <ArrowsPointingOutIcon className="w-6 h-6" />,
        stats: "Handles 10M+ RPM automatically",
        description: "Dynamic resource allocation with intelligent load balancing",
        diagram: 'scaling-architecture',
        features: [
          "Global CDN network",
          "Real-time monitoring",
          "Predictive scaling",
          "Multi-cloud deployment"
        ]
      },
      // Add more platform features...
    ],
    security: [
      {
        id: 'encryption',
        title: "End-to-End Encryption",
        icon: <LockClosedIcon className="w-6 h-6" />,
        standards: ["AES-256", "TLS 1.3", "GDPR", "HIPAA"],
        certifications: ["SOC 2 Type II", "ISO 27001", "PCI DSS"],
        features: [
          "Data encryption at rest and in transit",
          "Regular security audits",
          "Role-based access control",
          "Automated vulnerability scanning"
        ]
      },
      // Add more security features...
    ],
    devtools: [
      {
        id: 'sdks',
        title: "Comprehensive SDKs",
        icon: <WifiIcon className="w-6 h-6" />,
        languages: ["JavaScript", "Python", "Java", "Go", "Ruby", ".NET"],
        features: [
          "TypeScript support",
          "Async/Await interface",
          "Automatic retries",
          "Local caching"
        ],
        codeExample: {
          javascript: `import AIStudio from 'ai-studio-sdk';
          
const client = new AIStudio({
  apiKey: process.env.AI_API_KEY,
  environment: 'production'
});`,
          python: `from ai_studio import AIStudio

client = AIStudio(
    api_key=os.getenv("AI_API_KEY"),
    environment="production"
)`
        }
      }
    ]
  };

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
  }, []);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 text-white py-24 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Powering Next-Gen AI Applications
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Enterprise-grade AI infrastructure with developer-friendly tools
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <button className="bg-white/10 hover:bg-white/20 px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105">
              <span className="flex items-center gap-2">
                <BookOpenIcon className="w-5 h-5" />
                Read Documentation
              </span>
            </button>
            <button className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105">
              Start Free Trial
            </button>
          </div>
        </div>
        <div className="absolute inset-0 opacity-10 bg-[url('/grid.svg')]" />
      </div>

      {/* Features Navigation */}
      <nav className="sticky top-0 bg-white dark:bg-gray-800 shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto py-4 gap-6">
            {Object.keys(features).map(category => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl min-w-max ${
                  activeTab === category 
                    ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                {{
                  ai: <CpuChipIcon className="w-5 h-5" />,
                  platform: <CloudIcon className="w-5 h-5" />,
                  security: <ShieldCheckIcon className="w-5 h-5" />,
                  devtools: <CLI className="w-5 h-5" />
                }[category]}
                <span className="capitalize">{category}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* AI Features */}
        {activeTab === 'ai' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {features.ai.map(feature => (
              <div 
                key={feature.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 relative"
              >
                <div className="mb-6 flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                      {feature.icon}
                    </div>
                    <h2 className="text-2xl font-bold dark:text-white">{feature.title}</h2>
                  </div>
                  <button 
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                    onClick={() => setExpandedFeature(expandedFeature === feature.id ? null : feature.id)}
                  >
                    <ChevronDownIcon className={`w-5 h-5 transition-transform ${
                      expandedFeature === feature.id ? 'rotate-180' : ''
                    }`} />
                  </button>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-6">{feature.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  {feature.stats?.map((stat, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {expandedFeature === feature.id && (
                  <div className="space-y-8">
                    <div className="border-t dark:border-gray-700 pt-8">
                      <h3 className="text-xl font-semibold mb-4 dark:text-white">Capabilities</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {feature.capabilities.map((capability, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                            <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0" />
                            <span className="dark:text-gray-300">{capability}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t dark:border-gray-700 pt-8">
                      <h3 className="text-xl font-semibold mb-6 dark:text-white">Code Examples</h3>
                      <div className="flex gap-4 mb-4 overflow-x-auto">
                        {Object.keys(feature.codeExample).map(lang => (
                          <button
                            key={lang}
                            onClick={() => setLanguage(lang)}
                            className={`px-4 py-2 rounded-full ${
                              language === lang
                                ? 'bg-purple-600 text-white'
                                : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                            }`}
                          >
                            {lang}
                          </button>
                        ))}
                      </div>
                      <SyntaxHighlighter 
                        language={language} 
                        style={darkMode ? atomDark : vs}
                        className="rounded-xl"
                      >
                        {feature.codeExample[language]}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Platform Features */}
        {activeTab === 'platform' && (
          <div className="space-y-16">
            {features.platform.map(feature => (
              <div 
                key={feature.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
              >
                <div className="flex flex-col lg:flex-row gap-12">
                  <div className="flex-1">
                    <div className="flex items-center gap-6 mb-8">
                      <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                        {feature.icon}
                      </div>
                      <h2 className="text-3xl font-bold dark:text-white">{feature.title}</h2>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">{feature.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {feature.features?.map((feat, index) => (
                        <div key={index} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                          <div className="text-purple-600 dark:text-purple-400 mb-2">
                            <WifiIcon className="w-6 h-6" />
                          </div>
                          <h3 className="text-lg font-semibold mb-2 dark:text-white">{feat}</h3>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:w-1/2">
                    {loadedDiagrams ? (
                      <FeatureDiagram 
                        diagramId={feature.diagram} 
                        darkMode={darkMode}
                      />
                    ) : (
                      <div className="h-full bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center">
                        <Loader size="lg" type="dots" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Security Features */}
        {activeTab === 'security' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {features.security.map(feature => (
              <div 
                key={feature.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
              >
                <div className="flex items-center gap-6 mb-8">
                  <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-xl">
                    {feature.icon}
                  </div>
                  <h2 className="text-3xl font-bold dark:text-white">{feature.title}</h2>
                </div>

                <div className="space-y-8">
                  <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                    <h3 className="text-xl font-semibold mb-4 dark:text-white">Compliance Standards</h3>
                    <div className="flex flex-wrap gap-2">
                      {feature.standards.map((standard, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-white dark:bg-gray-800 rounded-full text-sm"
                        >
                          {standard}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="border-l-4 border-green-500 pl-6 py-4">
                    <h3 className="text-xl font-semibold mb-4 dark:text-white">Certifications</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {feature.certifications.map((cert, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <ShieldCheckIcon className="w-5 h-5 text-green-500" />
                          <span className="dark:text-gray-300">{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <InteractiveDemo 
                    title="Security Architecture"
                    darkMode={darkMode}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Developer Tools */}
        {activeTab === 'devtools' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {features.devtools.map(feature => (
              <div 
                key={feature.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
              >
                <div className="flex items-center gap-6 mb-8">
                  <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                    {feature.icon}
                  </div>
                  <h2 className="text-3xl font-bold dark:text-white">{feature.title}</h2>
                </div>

                <div className="space-y-8">
                  <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                    <h3 className="text-xl font-semibold mb-4 dark:text-white">Supported Languages</h3>
                    <div className="flex flex-wrap gap-2">
                      {feature.languages.map((lang, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-white dark:bg-gray-800 rounded-full text-sm"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="border-l-4 border-purple-500 pl-6 py-4">
                    <h3 className="text-xl font-semibold mb-4 dark:text-white">Features</h3>
                    <div className="grid grid-cols-1 gap-4">
                      {feature.features.map((feat, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <PuzzlePieceIcon className="w-5 h-5 text-purple-500" />
                          <span className="dark:text-gray-300">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold dark:text-white">Quick Start</h3>
                    <SyntaxHighlighter 
                      language="bash" 
                      style={darkMode ? atomDark : vs}
                      className="rounded-xl"
                    >
                      &quot;npm install ai-studio-sdk&quot;
                    </SyntaxHighlighter>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pricing Section */}
        <PricingTable darkMode={darkMode} />

        {/* Testimonials */}
        <TestimonialsCarousel darkMode={darkMode} />

        {/* Final CTA */}
        <div className="mt-24 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Start Building with AI Studio</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of developers transforming industries with AI</p>
          <div className="flex justify-center gap-6">
            <button className="bg-white text-purple-600 px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
              Get Started Free
            </button>
            <button className="border-2 border-white/30 hover:border-white/50 px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;
