import { useContext, useState } from 'react';
import Button from '../components/Button';
import LlmBox from "../components/LlmBox";
import AIStudioHeader from "./AIStudioHeader";
import { AIStudioHeaderContext } from '../contexts/FirstPage';
import CustomLlm from './CustomLlm';

function AIStudio() {
  const [selectedLLM, setSelectedLLM] = useState(null);
  const { LLM_CONFIG , data , cancel ,setCancel} = useContext(AIStudioHeaderContext);

  let Data ;

  if (data){

    Data = data;

  }
  else{
    Data = LLM_CONFIG
  }

  console.log(Data)

  const handleLLMChange = (key) => {
    setSelectedLLM(key);
    console.log(key);
  }
  
  return (
    <>
   
   {
   
   cancel ?


  <CustomLlm />
  :
   <>
   
   
   <AIStudioHeader />
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
    {/* Main Content Area */}
    
   <LlmBox >

      <button
          className={`flex items-center gap-3 px-3 py-2 rounded-lg 
            ${'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 mb-3 dark:hover:bg-gray-600'}
            transition-colors w-full text-left`}
          onClick={() => setCancel(true)}
        >
          <span className="text-lg">🤖</span> {/* Replace with your icon */}
          <span className="text-sm">Custom LLM</span>
        </button>
      
    {Object.entries(Data).map(([key, llm]) => (
      <Button
        key={key}
        onClick={() => handleLLMChange(key)}
        variant={selectedLLM === key ? 'dark' : 'lightGray'}
        className="w-full text-left mb-2"
      >
        <span className="text-lg mr-2">{llm.icon}</span>
        <span className="text-sm">{llm.name}</span>
      </Button>
    ))}
   </LlmBox>

     
    </div>
  
 
   
     
    </>}
  
    </>
   
  );
}

export default AIStudio;