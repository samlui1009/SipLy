import { useState } from 'react'

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import UserProfile from './components/UserProfile.jsx';
import MainMenu from './components/MainMenu.jsx';
import DailySummary from './components/DailySummary.jsx';
import GoalsMenu from './components/HealthGoals.jsx';
import DailyViz from './components/DailyVisualization.jsx';

import './App.css'

function App() {

  return (
    <>
      <div className="app-container">
        <Header></Header>
        <div className="grid-container">
            <UserProfile></UserProfile>
            <MainMenu></MainMenu>
            <DailySummary></DailySummary>
            <GoalsMenu className="goals"></GoalsMenu>
            <DailyViz></DailyViz>
        </div>
        <div className="site-footer">
            <Footer></Footer>
        </div>
      </div>
    </>
  )
}

export default App
