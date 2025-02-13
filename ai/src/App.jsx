import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Logout from './pages/Logout.jsx';
import { ChatProvider } from './contexts/SecondPage.jsx';
import { AIStudioHeaderProvider, HistoryProvider, SignUpProvider } from './contexts/FirstPage.jsx';
import SignUpPage from './pages/SignUp.jsx';
import DocumentationPage from './pages/Documentation.jsx';
import FeaturesPage from './pages/Features.jsx';


function App() {
  return (
    
    <Router>
      <SignUpProvider>
        <AIStudioHeaderProvider>
          <HistoryProvider>
                <ChatProvider>
            
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/login" element={<Login />} />
                      <Route path='signup' element={<SignUpPage/>} />
                      <Route path="/logout" element={<Logout />} />
                      <Route path='/features' element={<FeaturesPage/>} />
                      <Route path='/documentation' element={<DocumentationPage/>}/> 
                    </Routes>

              </ChatProvider>
            </HistoryProvider>
        </AIStudioHeaderProvider>

       </SignUpProvider>
    </Router>
    
  );
}

export default App;