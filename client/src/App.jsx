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
            <div className="profile-panel">
                <UserProfile></UserProfile>
            </div>
            <div className="add-bev-panel">
                <MainMenu></MainMenu>
            </div>
            <div className="daily-log-panel">
                <DailySummary></DailySummary>
            </div>
            <div className="update-goals-panel">
                <GoalsMenu></GoalsMenu>
            </div>
            <div className="daily-viz-panel">
                <DailyViz></DailyViz>
            </div>
        </div>
        <div className="site-footer">
            <Footer></Footer>
        </div>
      </div>
    </>
  )
}

export default App
