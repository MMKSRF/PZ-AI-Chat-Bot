
import LlmBox from "../components/LlmBox";
import AIStudioHeader from "./AIStudioHeader";

const LLM_CONFIG = {
  math: {
    name: "Math Expert",
    icon: '🧮',
    endpoint: '/api/math',
    color: 'bg-blue-500',
  },
  coding: {
    name: "Code Assistant",
    icon: '💻',
    endpoint: '/api/code',
    color: 'bg-green-500',
  },
  history: {
    name: "History Scholar",
    icon: '📜',
    endpoint: '/api/history',
    color: 'bg-purple-500',
  }
};

function AIStudio() {

  const handleLLMChange=(key)=>{
    console.log(key)
  }
  const selectedLLM = 123
 
  return (

    <>
    <AIStudioHeader
        onSearch={(query) => console.log('Search:', query)}
        onHistory={() => console.log('History clicked')}
      />
      
      
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">



     


        
      {/* Main Content Area */}
      
     <LlmBox >

     <button
  onClick={() => console.log("Custom LLM clicked")}
  className={`flex items-center gap-3 px-3 py-2 rounded-lg 
    ${'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 mb-3 dark:hover:bg-gray-600'}
    transition-colors w-full text-left`}
>
  <span className="text-lg">🤖</span> {/* Replace with your icon */}
  <span className="text-sm">Custom LLM</span>
</button>
      
      {Object.entries(LLM_CONFIG).map(([key, llm]) => (

        <>
              <button
                key={key}
                onClick={() => handleLLMChange(key)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg 
                  ${selectedLLM === key 
                    ? `${llm.color} text-white` 
                    : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'}
                  transition-colors w-full text-left`}
              >
                <span className="text-lg">{llm.icon}</span>
                <span className="text-sm">{llm.name}</span>
              </button>
        
        </>
            ))}
     </LlmBox>

       
    </div>
    </>
   
  );
}

export default AIStudio;