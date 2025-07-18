import { useState } from 'react'

import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import UserProfile from '../components/UserProfile.jsx';
import MainMenu from '../components/MainMenu.jsx';
import DailySummary from '../components/DailySummary.jsx';
import HappinessMeter from '../components/HappinessMeter.jsx';
import GoalsMenu from '../components/HealthGoals.jsx';
import DailyViz from '../components/DailyVisualization.jsx';
import BevBot from '../components/BevBot.jsx';

import './HomePage.css';

function HomePage() {

    const [happinessLevel, setHappinessState] = useState(0);
    const [refreshData, setRefreshData] = useState(0);
    // State that is required to be used by different children components for dynamic re-rendering
    const [isThirsty, setIsThirsty] = useState(false);  
  
    return (
      <>
        <div className="app-container">
          <Header></Header>
          <div className="grid-container">
              <div className="profile-panel">
                  <UserProfile></UserProfile>
              </div>
              <div className="add-bev-panel">
                  <MainMenu setNewBeverageData={setRefreshData}></MainMenu>
              </div>
              <div className="daily-log-panel">
                  <DailySummary setNewBeverageData={setRefreshData} setDeletedData={setRefreshData}></DailySummary>
              </div>
              <div className="happiness-panel">
                  <HappinessMeter happinessState = {happinessLevel} thirsty = {isThirsty}></HappinessMeter>
              </div>
              <div className="update-goals-panel">
                  <GoalsMenu setNewHealthGoals={setRefreshData}></GoalsMenu>
              </div>
              <div className="daily-viz-panel">
                  <DailyViz setHappinessLevel = {setHappinessState} setThirstyLevel = {setIsThirsty} newData = {refreshData}></DailyViz>
              </div>
              <div className="bev-bot-panel">
                  <BevBot></BevBot>
              </div>
          </div>
          <div className="site-footer">
              <Footer></Footer>
          </div>
        </div>
      </>
    )
  }

  export default HomePage