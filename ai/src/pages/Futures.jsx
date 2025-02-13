import { useState } from 'react';
import { 
  SparklesIcon, CpuChipIcon, LockClosedIcon, 
  CommandLineIcon, ScaleIcon, GlobeAltIcon,
  ServerIcon, ChartBarIcon, CodeBracketIcon,
  BeakerIcon, ShieldCheckIcon, ArrowsPointingOutIcon
} from '@heroicons/react/24/outline';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import FeatureDiagram from '../components/FeatureDiagram';
import Loader from '../components/Loader';

const FeaturesPage = () => {
  const [activeTab, setActiveTab] = useState('ai');
  const [expandedFeature, setExpandedFeature] = useState(null);
  const [loadedDiagrams, setLoadedDiagrams] = useState(false);

  const features = {
    ai: [
      {
        id: 'nlp',
        title: "Natural Language Processing",
        icon: <SparklesIcon className="w-6 h-6" />,
        description: "Advanced text understanding and generation capabilities",
        capabilities: [
          "Sentiment analysis",
          "Text summarization",
          "Multi-language translation",
          "Contextual conversations"
        ],
        codeExample: `const analysis = await aiStudio.nlp.analyze({
  text: "Amazing product! Loved the experience.",
  features: ['sentiment', 'entities']
});`
      },
      // Add more AI features...
    ],
    infrastructure: [
      {
        id: 'scaling',
        title: "Auto-Scaling Infrastructure",
        icon: <ArrowsPointingOutIcon className="w-6 h-6" />,
        stats: "Handles 10M+ RPM automatically",
        description: "Dynamic resource allocation based on workload",
        diagram: 'scaling-architecture'
      },
      // Add more infrastructure features...
    ],
    security: [
      {
        id: 'encryption',
        title: "End-to-End Encryption",
        icon: <LockClosedIcon className="w-6 h-6" />,
        standards: ["AES-256", "TLS 1.3", "GDPR compliant"],
        certification: "SOC 2 Type II Certified"
      },
      // Add more security features...
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">AI Studio Features</h1>
          <p className="text-xl md:text-2xl mb-8">Powering the next generation of intelligent applications</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <button className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-full">
              Explore Use Cases
            </button>
            <button className="bg-white text-purple-600 hover:bg-gray-100 px-6 py-3 rounded-full">
              Start Free Trial
            </button>
          </div>
        </div>
      </div>

      {/* Features Navigation */}
      <nav className="sticky top-0 bg-white dark:bg-gray-800 shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto py-4 gap-6">
            {Object.keys(features).map(category => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                  activeTab === category 
                    ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {{
                  ai: <CpuChipIcon className="w-5 h-5" />,
                  infrastructure: <ServerIcon className="w-5 h-5" />,
                  security: <ShieldCheckIcon className="w-5 h-5" />
                }[category]}
                <span className="capitalize">{category}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* AI Features Grid */}
        {activeTab === 'ai' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.ai.map(feature => (
              <div 
                key={feature.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 relative overflow-hidden"
                onMouseEnter={() => setLoadedDiagrams(true)}
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold dark:text-white">{feature.title}</h3>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4">{feature.description}</p>
                
                {feature.capabilities && (
                  <div className="mb-4">
                    <h4 className="font-medium mb-2 dark:text-white">Key Capabilities</h4>
                    <ul className="space-y-2">
                      {feature.capabilities.map((capability, index) => (
                        <li 
                          key={index}
                          className="flex items-center gap-2 text-gray-600 dark:text-gray-400"
                        >
                          <div className="w-2 h-2 bg-purple-500 rounded-full" />
                          {capability}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {feature.codeExample && (
                  <div className="mt-4">
                    <SyntaxHighlighter 
                      language="javascript" 
                      style={atomDark}
                      className="rounded-lg text-sm"
                    >
                      {feature.codeExample}
                    </SyntaxHighlighter>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white dark:to-gray-800 pointer-events-none" />
              </div>
            ))}
          </div>
        )}

        {/* Infrastructure Features */}
        {activeTab === 'infrastructure' && (
          <div className="space-y-12">
            {features.infrastructure.map(feature => (
              <div 
                key={feature.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
              >
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        {feature.icon}
                      </div>
                      <h3 className="text-2xl font-bold dark:text-white">{feature.title}</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">{feature.description}</p>
                    <div className="bg-purple-50 dark:bg-gray-700 p-4 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <h4 className="font-medium dark:text-white">Performance Metrics</h4>
                          <p className="text-gray-600 dark:text-gray-300">{feature.stats}</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                          <ChartBarIcon className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:w-1/2">
                    {loadedDiagrams ? (
                      <FeatureDiagram diagramId={feature.diagram} />
                    ) : (
                      <div className="h-full bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                        <Loader size="md" type="dots" />
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {features.security.map(feature => (
              <div 
                key={feature.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold dark:text-white">{feature.title}</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-medium mb-2 dark:text-white">Security Standards</h4>
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

                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-medium mb-2 dark:text-white">Certifications</h4>
                    <p className="text-gray-600 dark:text-gray-300">{feature.certification}</p>
                  </div>

                  <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                    <div className="flex items-center gap-4">
                      <ShieldCheckIcon className="w-8 h-8 text-red-500" />
                      <div>
                        <h4 className="font-medium dark:text-white">Real-time Threat Detection</h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          24/7 monitoring and automatic mitigation
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Unified Feature Comparison */}
        <div className="mt-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-8 dark:text-white">Feature Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b dark:border-gray-700">
                  <th className="text-left py-4 dark:text-white">Feature</th>
                  <th className="text-left py-4 dark:text-white">Starter</th>
                  <th className="text-left py-4 dark:text-white">Pro</th>
                  <th className="text-left py-4 dark:text-white">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b dark:border-gray-700">
                  <td className="py-4 font-medium dark:text-white">API Calls/month</td>
                  <td className="py-4 dark:text-gray-300">10K</td>
                  <td className="py-4 dark:text-gray-300">1M</td>
                  <td className="py-4 dark:text-gray-300">Unlimited</td>
                </tr>
                {/* Add more rows... */}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Start Building Today</h2>
          <p className="text-xl mb-8">Join thousands of developers creating intelligent applications</p>
          <div className="flex justify-center gap-4">
            <button className="bg-white text-purple-600 px-8 py-3 rounded-full hover:bg-gray-100">
              Get Started Free
            </button>
            <button className="border border-white/30 hover:border-white/50 px-8 py-3 rounded-full">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;