import { React, useState, useEffect } from 'react';
import './CurrentDrinkLog.css';

function CurrentDrinkLog() {

    const [user, setUser] = useState(null);
    const [dailyLog, setDailyLog] = useState([]);
    const [hasLoggedDrinks, setHasLoggedDrinks] = useState(false);

    const currDate = new Date().toLocaleDateString();
    const currTime = new Date().toLocaleTimeString();

    useEffect(() => {
        fetch('http://localhost:8080/api/beverage-log/get-all-beverages/1')
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
    }, []);

    return(
        <div className="current-log">
            <h2>Date: {currDate}</h2>
            {hasLoggedDrinks ? (
                <ul className="complete-list"> 
                {dailyLog.map((bev, index) => (
                    <li key={index}>
                        {bev.name}
                    </li>
                ))}
                </ul> 
                ) : 
                (<p>🌊 Nothing logged yet! Get to hydrating! ( ᵕ༚ᵕ )\̅_̅/̷̚ʾ</p>)}
        </div>
    );
}

export default CurrentDrinkLog