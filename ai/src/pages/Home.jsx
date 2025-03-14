import { useContext } from 'react'
import ChatHis from './AIStudio'
import Chat from './Chat'
import { AIStudioHeaderContext } from '../contexts/FirstPage'
import HistoryPage from './HistoryDisplay'
// import SignUpPage from './SignUp'

// import LoginPage from './Login'

function Home() {
  const { historyClicked } = useContext(AIStudioHeaderContext)
  return (
    <>
      <main className="grid grid-cols-[2fr_8fr] h-screen overflow-hidden">
        <div className=" h-screen overflow-y-auto">
          {<>{!historyClicked ? <ChatHis /> : <HistoryPage />}*/</>}
        </div>
        
        <div className=" border-l-2 black  h-screen overflow-y-auto"> 
          <Chat />
        </div>
      </main>
    </>
  )
}
 
export default Home

