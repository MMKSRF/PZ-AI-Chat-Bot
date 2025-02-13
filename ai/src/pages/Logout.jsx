import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader  from '../components/Loader';

const LogoutPage = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Clear local authentication state
        localStorage.removeItem('authToken');
        sessionStorage.removeItem('userSession');
        
        // Redirect after logout
        setTimeout(() => navigate('/login'), 1000);
      } catch (err) {
        setError(`Logout failed. Please try again.${err}`);
        setIsLoggingOut(false);
      }
    };

    performLogout();
  }, [navigate]);

  const handleManualLogout = async () => {
    setIsLoggingOut(true);
    setError(null);
    try {
      // Retry logout
      await new Promise(resolve => setTimeout(resolve, 1000));
      localStorage.removeItem('authToken');
      navigate('/login');
    } catch (err) {
      setError(`Still unable to logout. Please clear cookies manually.${err}`);
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl text-center">
        {isLoggingOut ? (
          <div className="space-y-4">
            <Loader size="lg" type="spinner" className="text-purple-600 mx-auto" />
            <h2 className="text-2xl font-bold text-gray-900">Logging Out...</h2>
            <p className="text-gray-600">Cleaning up your session</p>
          </div>
        ) : error ? (
          <div className="space-y-4">
            <div className="text-red-600 text-lg font-semibold">{error}</div>
            <button
              onClick={handleManualLogout}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Try Again
            </button>
            <button
              onClick={() => window.location.reload()}
              className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Refresh Page
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-green-600">Logged Out Successfully!</h2>
            <p className="text-gray-600">Redirecting to login page...</p>
          </div>
        )}
        
        {!isLoggingOut && !error && (
          <div className="mt-4 text-sm text-gray-500">
            Not redirecting? <a href="/login" className="text-purple-600 hover:text-purple-500">Click here</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogoutPage;