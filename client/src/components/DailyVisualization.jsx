import { useState, useEffect } from 'react';
import './DailyVisualization.css';
import { ResponsiveContainer, ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function DailyVisualization({setHappinessLevel, setThirstyLevel, passedUserId, newData}) {

    const userId = passedUserId || localStorage.getItem("userId");
    const [userData, setUserData] = useState([]);
    // Will be utilized later to be put onto the graph as the maximum limits
    // Will be an array, as Recharts expects an array argument

    useEffect(() => {

        // console.log("Grabbing total counts");
        // This is running
        fetch(`http://localhost:8080/api/beverage-log/get-total-number-beverages/${userId}`)
        .then((res) => {
            if (!res.ok) throw new Error("Failed to fetch users' daily beverage count");
            return res.text();
        })
        .then((countStr) => {
            const count = parseInt(countStr);
            setThirstyLevel(count === 0);
        })

        Promise.all([
            fetch(`http://localhost:8080/api/health-goals/${userId}`)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch users' daily limits");
                return res.json();
            }),

            fetch(`http://localhost:8080/api/beverage-log/all-totals/${userId}`)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch users' daily totals");
                return res.json();
            })
        ])
        // Promise.all needed to ensure both API calls run asynchronously

        .then(([data, totalsData]) => {
            const combinedData = [
                {
                    name: "Calories",
                    totals: totalsData.Calories,
                    goal: data.maxCalories,
                },
                {
                    name: "Sugar (g)",
                    totals: totalsData.Sugar,
                    goal: data.maxSugar
                },
                {
                    name: "Caffeine (mg)",
                    totals: totalsData.Caffeine,
                    goal: data.maxCaffeine
                }
            ];
            setUserData(combinedData);
            const counts = combinedData.filter(item => item.totals < item.goal).length
            setHappinessLevel(counts);
            // Verified through console that counts is the correct value
            // Currently, through testing, the value of "counts" is going to be 0 because 
            // user went over all of their daily intake limits

            })            
        .catch(() => console.error("Error in fetching users' daily limits"));
        },[setHappinessLevel, setThirstyLevel, userId, newData]);

    return(
        <div className="daily-viz">
            <h1>Your Progress</h1>
            <h5>Beverage Breakdown</h5>
            <ResponsiveContainer width="100%" height={300} className="chart">
                <ComposedChart data={userData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 1000]}/>
                <Tooltip />
                <Legend />
                <Bar dataKey="totals" fill = "#63e4be" name="Totals"/>
                <Bar dataKey="goal" fill="#8884d8" name="Goal Limits"/>
            </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
}

export default DailyVisualization