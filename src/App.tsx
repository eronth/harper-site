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

import SeasonalCheer from       './pages/SeasonalCheer/SeasonalCheerPage'
import SpringCheer from         './pages/SeasonalCheer/SpringCheer/SpringCheerPage'
import SummerCheer from         './pages/SeasonalCheer/SummerCheer/SummerCheerPage'
import AutumnCheer from         './pages/SeasonalCheer/AutumnCheer/AutumnCheerPage'
import WinterCheer from         './pages/SeasonalCheer/WinterCheer/WinterCheerPage'
import HolidayVillagePage from  './pages/SeasonalCheer/WinterCheer/HolidayVillage/HolidayVillagePage'
import BuildingAlbumPage from   './pages/SeasonalCheer/WinterCheer/HolidayVillage/BuildingAlbumPage'
import OrnamentsPage from       './pages/SeasonalCheer/WinterCheer/Ornaments/OrnamentsPage'
import PipeTreeForestPage from  './pages/SeasonalCheer/WinterCheer/PipeTreeForest/PipeTreeForestPage'

import WeddingRegistry from './pages/WeddingRegistry/WeddingRegistryPage'
import ProjectsAndCrafts from './pages/ProjectsAndCrafts/ProjectsAndCrafts'
import IndividualProjectPage from './pages/ProjectsAndCrafts/IndividualProjectPage/IndividualProjectPage'
import MagicTheGathering from './pages/MagicTheGathering/MagicTheGatheringPage'
import LittleWebTools from './pages/LittleWebTools/LittleWebTools'
import BookCorner from './pages/BookCorner/BookCorner'
import KirbyAirRidersPage from './pages/KirbyAirRiders/KirbyAirRidersPage'
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

          <Route path="/seasonal-cheering">
            <Route index element={<SeasonalCheer />} />
            <Route path="spring" element={<SpringCheer />} />
            <Route path="summer" element={<SummerCheer />} />
            <Route path="autumn" element={<AutumnCheer />} />
            <Route path="winter">
              <Route index element={<WinterCheer />} />
              <Route path="holiday-village" element={<HolidayVillagePage />} />
              <Route path="holiday-village/:buildingId" element={<BuildingAlbumPage />} />
              <Route path="ornaments" element={<OrnamentsPage />} />
              <Route path="pipe-tree-forest" element={<PipeTreeForestPage />} />
            </Route>
          </Route>

          <Route path="/wedding-registry" element={<WeddingRegistry />} />
          <Route path="/magic-the-gathering" element={<MagicTheGathering />} />
          <Route path="/book-corner" element={<BookCorner />} />
          <Route path="/kirby-air-riders" element={<KirbyAirRidersPage />} />
          <Route path="/little-web-tools/:toolId?" element={<LittleWebTools />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
