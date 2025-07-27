import { React, useState, useEffect } from 'react';
import SingleBev from './IndividualBeverage.jsx';
// Import required to be used later on

import './CurrentDrinkLog.css';

function CurrentDrinkLog({ setNewBeverageData, passedUserId }) {

    const userId = passedUserId || localStorage.getItem("userId");
    const [dailyLog, setDailyLog] = useState([]);
    const [hasLoggedDrinks, setHasLoggedDrinks] = useState(false);
    // Moved this logic from IndividualBeverage to HERE, as this is the parent component that will showcase all beverages

    const currDate = new Date().toLocaleDateString();

    const handleDeleteBeverage = (beverageID) => {

        fetch(`http://localhost:8080/api/beverage-log/remove-beverage/${userId}/${beverageID}`, {
            method:'DELETE'
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Failed to remove the users' beverage");
            }
            return res.text();
        })
        .then(() => {
            fetch(`http://localhost:8080/api/beverage-log/get-all-beverages/${userId}`)
                .then(res => res.json())
                .then(data => {
                    setDailyLog(data);
                    setNewBeverageData(data);
                });
        })        
        .catch((err) => {
            console.error("Error in removing the users' beverage", err);
        })
        console.log("Beverage successfully deleted!");
    }

    useEffect(() => {
        fetch(`http://localhost:8080/api/beverage-log/get-all-beverages/${userId}`)
        .then((res) => {
            if (!res.ok) throw new Error("Failed to fetch the users' beverage log");
            return res.json();
        })
        .then((data) => {
            setDailyLog(data);
            setHasLoggedDrinks(data.length > 0);
            // If the length of the data is > 0, then we know that there ARE beverages logged
        })
        .catch(() => console.error("Error in fetching the users' beverage log"));
    });

    return(
        <div className="current-log">
            <h2>Date: {currDate}</h2>
            {hasLoggedDrinks ? (
                <ul className="complete-list"> 
                    {dailyLog.map((bev, index) => (
                        <li key={index}>
                            <SingleBev className="ind-bev"
                                id = {bev.beverageID}
                                name = {bev.name}
                                cals = {bev.calories}
                                sug = {bev.sugar}
                                caffe = {bev.caffeineAmount}
                                onDelete = {handleDeleteBeverage}
                            ></SingleBev>
                        </li>
                ))}
                </ul> 
                ) : 
                (<p className="complete-list-alt">Nothing logged yet, but that's okay! Get to hydrating! ( ᵕ༚ᵕ )\̅_̅/̷̚ʾ</p>)}
        </div>
    );
}

export default CurrentDrinkLog