import { useState, useEffect } from 'react';
import './DailyVisualization.css';
import { ResponsiveContainer, ComposedChart, Line, Area, Bar, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function DailyVisualization() {

    const [userData, setUserData] = useState([]);
    // Will be utilized later to be put onto the graph as the maximum limits
    // Will be an array, as Recharts expects an array argument

    useEffect(() => {
        Promise.all([
            fetch('http://localhost:8080/api/health-goals/1')
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch users' daily limits");
                return res.json();
            }),

            fetch('http://localhost:8080/api/beverage-log/all-totals/1')
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch users' daily totals");
                return res.json();
            })
        // Will be able to properly return back the response as JSON object now that it's been updated instead of a String
        ])
        // Promise.all needed to ensure both API calls run asynchronously

        .then(([data, totalsData]) => {  
            const combinedData = [
                {
                    name: "Calories",
                    goal: data.maxCalories,
                    totals: totalsData.Calories
                },
                {
                    name: "Sugar (g)",
                    goal: data.maxSugar,
                    totals: totalsData.Sugar
                },
                {
                    name: "Caffeine (mg)",
                    goal: data.maxCaffeine,
                    totals: totalsData.Caffeine
                }
            ];
            setUserData(combinedData);
            })
        .catch(() => console.error("Error in fetching users' daily limits"));
        },[]);

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