import { createContext, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import useSearch from '../hooks/Search';


const sampleHistory = [
  {
    topic: 'React Components',
    interactions: [
      {
        id: 1,
        question: "How to create reusable components in React?",
        answer: "You can create reusable components by...",
        timestamp: "2024-03-15T09:30:00"
      },
      {
        id: 2,
        question: "Best practices for component composition",
        answer: "Component composition can be achieved through...",
        timestamp: "2024-03-15T10:15:00"
      }
    ],
    lastUpdated: "2024-03-15T10:15:00"
  },
  {
    topic: 'AI Ethics',
    interactions: [
      {
        id: 3,
        question: "Ethical considerations in AI development",
        answer: "Key ethical considerations include...",
        timestamp: "2024-03-14T14:45:00"
      }
    ],
    lastUpdated: "2024-03-14T14:45:00"
  }
];





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







const HistoryContext = createContext();
const AIStudioHeaderContext = createContext()
const SignUpContext = createContext()
// const SearchModale = createContext(null)



function HistoryProvider({ children }){
  const [expandedTopics, setExpandedTopics] = useState({});
  const {
    searchTerm: searchQuery,
    setSearchTerm: setSearchQuery,
    searchData,
    setSearchData
  } = useSearch();

  useEffect(() => {
    setTimeout(() => {
      setSearchData(sampleHistory);
    }, 500);
  }, []);

  const filteredTopics = searchData(sampleHistory, {
    keys: ["topic", "interactions.question", "interactions.answer"],
    caseSensitive: false
  });

  const toggleTopic = (topic) => {
    setExpandedTopics(prev => ({
      ...prev,
      [topic]: !prev[topic]
    }));
  };

  const deleteTopic = (topicToDelete) => {
    setSearchData(prev => prev.filter(topic => topic.topic !== topicToDelete));
  };

  return (
    <HistoryContext.Provider value={{
      searchQuery,
      setSearchQuery,
      filteredTopics,
      toggleTopic,
      expandedTopics,
      deleteTopic,
    }}>
      {children}
    </HistoryContext.Provider>
  );
}















function AIStudioHeaderProvider({ children }) {

  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [historyClicked, setHistoryClicked] = useState(false);
  const {searchTerm,setSearchTerm,searchData} = useSearch()

  const [customLLM, setCustomLLM] = useState("");
  const [url, setUrl] = useState("");
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const [errors, setErrors] = useState({});

  const [cancel, setCancel] = useState(false);


  const handleSearchSubmit = useCallback((e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Add your search logic here
      console.log('Searching for:', searchQuery);
      setShowSearchInput(false);
      setSearchQuery('');
    }
  }, [searchQuery]);

  const data = searchData(
    LLM_CONFIG , {
      keys: ["name"],
      caseSensitive: false
    }
  )

  // console.log(data)

  const value = {
    showSearchInput,
    historyClicked,
    setHistoryClicked,
    handleSearchSubmit,
    setShowSearchInput,

    searchTerm,
    setSearchTerm,
    data,

    searchQuery,
    setSearchQuery,
    LLM_CONFIG,


    customLLM,
    url,
    setUrl,
    isTooltipVisible,
    setTooltipVisible,
    setCustomLLM,
    errors,
    setErrors,


    cancel,
    setCancel




  };

  return (
    <AIStudioHeaderContext.Provider value={value}>
      {children}
    </AIStudioHeaderContext.Provider>
  );
}

















function SignUpProvider({children}){



  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const navigate = useNavigate();

  const passwordRequirements = [
    { id: 1, text: 'Minimum 8 characters', regex: /.{8,}/ },
    { id: 2, text: 'At least one number', regex: /\d/ },
    { id: 3, text: 'Both uppercase and lowercase', regex: /(?=.*[a-z])(?=.*[A-Z])/ },
    { id: 4, text: 'Special character (!@#$%^&*)', regex: /[!@#$%^&*]/ },
  ];

  useEffect(() => {
    document.title = "Sign Up - AI Studio";
  }, []);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else {
      passwordRequirements.forEach(req => {
        if (!req.regex.test(formData.password)) {
          newErrors.password = newErrors.password || [];
          newErrors.password.push(req.text);
        }
      });
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!acceptedTerms) {
      newErrors.terms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (error) {
      setErrors({ api: error.message || 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuth = (provider) => {
    window.location.href = `https://api.yourservice.com/auth/${provider}`;
  };






  return <SignUpContext.Provider value={{
    handleSubmit,
    errors,
    formData,
    setFormData,
    setShowPassword,
    showPassword,
    isLoading,
    success,
    setAcceptedTerms,
    handleOAuth,
    acceptedTerms,
    


  }}>
    {children}
  </SignUpContext.Provider>
}


HistoryProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

AIStudioHeaderProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

SignUpProvider.propTypes ={
  children: PropTypes.node.isRequired,
}


export {
  HistoryProvider,HistoryContext,
  AIStudioHeaderProvider,AIStudioHeaderContext,
  SignUpProvider,SignUpContext
} 