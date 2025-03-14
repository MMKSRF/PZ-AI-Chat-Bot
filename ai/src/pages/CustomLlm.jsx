import { X } from 'lucide-react';
import { AIStudioHeaderContext } from '../contexts/FirstPage';
import { useContext } from 'react';

function CustomLlm() {
 
  const { 
    customLLM,
    url,
    setUrl,
    isTooltipVisible,
    setTooltipVisible,
    setCustomLLM,
    errors,
    setErrors,
    setCancel } = useContext(AIStudioHeaderContext);




  const validateForm = () => {
    const newErrors = {};
    if (!customLLM.trim()) {
      newErrors.customLLM = "Custom LLM name is required";
    }
    if (!url.trim()) {
      newErrors.url = "URL is required";
    } else if (!/^https?:\/\//i.test(url)) {
      newErrors.url = 'URL must start with "http://" or "https://"';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Custom LLM:", customLLM);
      console.log("URL:", url);
      // Add your submission logic here
    }
  };

  return (
    <div className="h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 w-full flex flex-col">
      <div className='flex justify-start mx-6 mt-4'>
        <X className="h-6 w-6 text-white dark:text-gray-100 hover:bg-gray-700 " onClick={() => setCancel(false)} />
      </div>

      <form onSubmit={handleSubmit} className="p-6 rounded-lg shadow-lg">
        {/* Custom LLM Input */}
        <div className="mb-6">
          <label htmlFor="customLLM" className="block text-sm font-medium text-white dark:text-gray-200 mb-2">
            Custom LLM
          </label>
          <input
            type="text"
            id="customLLM"
            value={customLLM}
            onChange={(e) => setCustomLLM(e.target.value)}
            className={`mt-1 p-2.5 w-full bg-gray-800 text-white border ${
              errors.customLLM ? "border-red-500" : "border-gray-600  focus:ring-purple-500"
            } rounded-md focus:outline-none focus:ring-none `}
            placeholder="Name your Custom LLM"
          />
          {errors.customLLM && (
            <p className="text-red-400 text-sm mt-1.5">{errors.customLLM}</p>
          )}
        </div>

        {/* URL Input with Tooltip */}
        <div className="mb-6 relative">
          <label htmlFor="url" className="block text-sm font-medium text-white dark:text-gray-200 mb-2">
            URL
          </label>
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onMouseEnter={() => setTooltipVisible(true)}
            onMouseLeave={() => setTooltipVisible(false)}
            className={`mt-1 p-2.5 w-full bg-gray-800 text-white border ${
              errors.url ? "border-red-500  " : "border-gray-600  focus:ring-purple-500 "
            } rounded-md focus:outline-none focus:ring-none `}
            placeholder="Enter URL"
          />
          {isTooltipVisible && (
            <div className="absolute -top-8 left-0 bg-gray-700 text-white text-xs px-2 py-1 rounded-md">
              Please enter a valid URL starting with &quot;http://&quot; or &quot;https://&quot;
            </div>
          )}
          {errors.url && (
            <p className="text-red-400 text-sm mt-1.5">{errors.url}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-start">
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white py-2.5 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default CustomLlm;