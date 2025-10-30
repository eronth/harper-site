import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import Home from './pages/Home/HomePage'
import VacaStayca from './pages/VacaStayca/VacaStaycaPage'
import FoodRecipes from './pages/Recipes/FoodRecipes/FoodRecipesPage'
import IndividualFoodRecipePage from './pages/Recipes/FoodRecipes/IndividualFoodRecipePage'
import DrinkRecipes from './pages/Recipes/DrinkRecipes/DrinkRecipesPage'
import IndividualDrinkRecipePage from './pages/Recipes/DrinkRecipes/IndividualDrinkRecipePage'
import WinterVillage from './pages/WinterVillage/WinterVillagePage'
import WeddingRegistry from './pages/WeddingRegistry/WeddingRegistryPage'
import ProjectsAndCrafts from './pages/ProjectsAndCrafts/ProjectsAndCrafts'
import IndividualProjectPage from './pages/ProjectsAndCrafts/IndividualProjectPage/IndividualProjectPage'
import MagicTheGathering from './pages/MagicTheGathering/MagicTheGatheringPage'
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
          <Route path="/food-recipes/recipe/:recipeId" element={<IndividualFoodRecipePage />} />
          <Route path="/drink-recipes" element={<DrinkRecipes />} />
          <Route path="/drink-recipes/recipe/:recipeId" element={<IndividualDrinkRecipePage />} />
          <Route path="/projects" element={<ProjectsAndCrafts />} />
          <Route path="/projects/project/:projectId" element={<IndividualProjectPage />} />
          <Route path="/winter-village" element={<WinterVillage />} />
          <Route path="/wedding-registry" element={<WeddingRegistry />} />
          <Route path="/magic-the-gathering" element={<MagicTheGathering />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
