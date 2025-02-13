import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Loader = ({
  size = 'md',
  type = 'spinner',
  isPageLoader = false,
  message,
  showProgress = false,
  progress = 0,
  className = '',
  spinSpeed = 'normal',
}) => {
  const [internalProgress, setInternalProgress] = useState(0);

  useEffect(() => {
    if (showProgress) {
      setInternalProgress(Math.min(Math.max(progress, 0), 100));
    }
  }, [progress, showProgress]);

  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  };

  const speedClasses = {
    slow: 'animate-spin-slow',
    normal: 'animate-spin',
    fast: 'animate-spin-fast',
  };

  const loaderContainerClasses = `flex flex-col items-center justify-center space-y-4 ${className} ${
    isPageLoader ? 'fixed inset-0 bg-white bg-opacity-95 z-50' : ''
  }`;

  const renderLoader = () => {
    switch (type) {
      case 'spinner':
        return (
          <div className="relative">
            <div
              className={`rounded-full border-2 border-t-transparent ${
                sizeClasses[size] || sizeClasses.md
              } ${speedClasses[spinSpeed]}`}
              style={{ 
                borderColor: 'currentColor',
                borderTopColor: 'transparent'
              }}
            >
              <span className="sr-only">Loading...</span>
            </div>
            {size === 'xl' && (
              <div
                className="absolute inset-0 border-2 border-t-transparent rounded-full"
                style={{
                  borderColor: 'currentColor',
                  borderTopColor: 'transparent',
                  animation: `spin 1.5s linear infinite reverse`,
                  opacity: 0.3
                }}
              />
            )}
          </div>
        );

      case 'dots':
        return (
          <div className="flex space-x-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`bg-current rounded-full ${
                  sizeClasses[size] || sizeClasses.md
                } ${speedClasses[spinSpeed]}`}
                style={{ 
                  animation: `bounce 1.5s infinite`,
                  animationDelay: `${i * 0.2}s`
                }}
              />
            ))}
          </div>
        );

      case 'skeleton':
        return (
          <div className="space-y-4 animate-pulse">
            <div className="bg-current rounded h-4 w-32" />
            <div className="bg-current rounded h-4 w-48" />
            <div className="bg-current rounded h-4 w-40" />
          </div>
        );

      case 'progress':
        return (
          <div className="w-48 h-2 bg-gray-300 rounded-full overflow-hidden">
            <div
              className="bg-current h-full transition-all duration-300"
              style={{ width: `${internalProgress}%` }}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={loaderContainerClasses}>
      {renderLoader()}
      
      {message && (
        <p className="text-current text-sm mt-2 font-medium">{message}</p>
      )}

      {showProgress && type === 'progress' && (
        <span className="text-current text-sm font-mono">
          {internalProgress}%
        </span>
      )}
    </div>
  );
};

Loader.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  type: PropTypes.oneOf(['spinner', 'dots', 'skeleton', 'progress']),
  isPageLoader: PropTypes.bool,
  message: PropTypes.string,
  showProgress: PropTypes.bool,
  progress: PropTypes.number,
  className: PropTypes.string,
  spinSpeed: PropTypes.oneOf(['slow', 'normal', 'fast']),
};

export default Loader;