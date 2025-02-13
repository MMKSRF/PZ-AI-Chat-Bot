import { useState, useEffect, Suspense } from 'react';
import PropTypes from 'prop-types';
import ScalingArchitecture from '../diagrams/scaling-architecture.svg?react';
import SecurityArchitecture from '../diagrams/security-architecture.svg?react';
import NLPFlow from '../diagrams/nlp-flow.svg?react';
import Loader from './Loader';

const FeatureDiagram = ({ diagramId, darkMode }) => {
  const [Diagram, setDiagram] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDiagram = async () => {
      try {
        let Component;
        switch (diagramId) {
          case 'scaling-architecture':
            Component = ScalingArchitecture;
            break;
          case 'security-architecture':
            Component = SecurityArchitecture;
            break;
          case 'nlp-flow':
            Component = NLPFlow;
            break;
          default:
            throw new Error('Diagram not found');
        }
        setDiagram(() => Component);
      } catch (err) {
        setError(err.message);
      }
    };

    loadDiagram();
  }, [diagramId]);

  if (error) {
    return (
      <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-600 dark:text-red-400">
        Error loading diagram: {error}
      </div>
    );
  }

  if (!Diagram) {
    return (
      <div className="h-96 flex items-center justify-center">
        <Loader size="lg" type="dots" />
      </div>
    );
  }

  return (
    <div className="relative group">
      <Suspense fallback={<Loader size="md" type="spinner" />}>
        <div className={`rounded-xl p-4 ${
          darkMode ? 'bg-gray-700' : 'bg-gray-100'
        }`}>
          <Diagram
            className={`w-full h-auto transition-opacity ${
              darkMode ? 'diagram-dark' : 'diagram-light'
            }`}
          />
        </div>
      </Suspense>

      {/* Interactive Hotspots */}
      <div className="absolute inset-0">
        {/* Example hotspot - you'd add these based on your diagram */}
        <button 
          className="absolute w-4 h-4 bg-purple-500/20 rounded-full 
            hover:bg-purple-500/30 transition-all duration-300 
            animate-pulse group-hover:animate-none"
          style={{ top: '30%', left: '45%' }}
          onClick={() => console.log('Node clicked')}
        >
          <span className="sr-only">Database Node</span>
        </button>
      </div>
    </div>
  );
};

FeatureDiagram.propTypes = {
  diagramId: PropTypes.string.isRequired,
  darkMode: PropTypes.bool
};

export default FeatureDiagram;