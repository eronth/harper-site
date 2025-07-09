import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import Home from './pages/Home/HomePage'
import VacaStayca from './pages/VacaStayca/VacaStaycaPage'
import FoodRecipes from './pages/FoodRecipes/FoodRecipesPage'
import DrinkRecipes from './pages/DrinkRecipes/DrinkRecipesPage'
import WinterVillage from './pages/WinterVillage/WinterVillagePage'
import './App.css'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  return (
    <div className="app">
      <Header onMenuToggle={toggleSidebar} />
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={closeSidebar}
      />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vacations" element={<VacaStayca />} />
          <Route path="/food-recipes" element={<FoodRecipes />} />
          <Route path="/drink-recipes" element={<DrinkRecipes />} />
          <Route path="/winter-village" element={<WinterVillage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
