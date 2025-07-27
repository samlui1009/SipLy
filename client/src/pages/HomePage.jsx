import { useState, useEffect } from 'react'

import Header from '../components/Header.jsx';
import HeaderButtons from '../components/HomePageHeaderButtons.jsx';
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



    const currentId = localStorage.getItem("userId");
    // const currentEmail = localStorage.getItem("userEmail")
    // The "parent" component that all of the children will need to use 


    return (
      <>
        <div className="app-container">
          <Header></Header>
          <div className="grid-container">
              <div className="profile-panel">
                  <UserProfile passedUserId={(currentId)}></UserProfile>
              </div>
              <div className="add-bev-panel">
                  <MainMenu passedUserId={(currentId)} setNewBeverageData={setRefreshData}></MainMenu>
              </div>
              <div className="daily-log-panel">
                  <DailySummary setNewBeverageData={setRefreshData} setDeletedData={setRefreshData}></DailySummary>
              </div>
              <div className="happiness-panel">
                  <HappinessMeter happinessState = {happinessLevel} thirsty = {isThirsty}></HappinessMeter>
              </div>
              <div className="update-goals-panel">
                  <GoalsMenu passedUserId = {(currentId)} setNewHealthGoals={setRefreshData}></GoalsMenu>
              </div>
              <div className="daily-viz-panel">
                  <DailyViz passedUserId = {(currentId)} setHappinessLevel = {setHappinessState} setThirstyLevel = {setIsThirsty} newData = {refreshData}></DailyViz>
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