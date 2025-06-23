import { useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'
import './App.css'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  const handleSectionSelect = (section: string) => {
    setActiveSection(section)
  }

  return (
    <div className="app">
      <Header onMenuToggle={toggleSidebar} />
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={closeSidebar}
        onSectionSelect={handleSectionSelect}
      />
      <MainContent activeSection={activeSection} />
    </div>
  )
}

export default App
