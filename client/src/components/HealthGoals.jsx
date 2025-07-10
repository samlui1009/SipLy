import { useState, useEffect } from 'react';
import './HealthGoals.css';

function HealthGoals() {

    const [user, setUser] = useState(null);
    // This is necessary as this should then be connected to the Daily Log/
    // Progress panels to indicate how user is performing for this date
    // Null = No data yet 
    const [editing, setEditing] = useState(false);
    // At the initial start - Should NOT be in editing mode
    const [calories, setCalories] = useState({
        calories:""
    });
    const [sugar, setSugar] = useState({
        sugar:""
    });
    const [caffeine, setCaffeine] = useState({
        caffeine:""
    });
    // Individual states required

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("New parameters adjusted!");
    }
    // Bare-bone actions for now - Function needed

    // useEffect needed?

    return(
        <div className="goals-container">
            {!editing && (
                <>
                <h2>🔧 What would you like to update?</h2>
                <div className="button-options">
                    <button className="button" onClick={() => setCalories(true)}>Calories</button>
                    <button className="button" onClick={() => setSugar(true)}>Sugar Intake (grams)</button>
                    <button className="button" onClick={() => setCaffeine(true)}>Caffeine Intake (milligrams)</button>
                </div>
                </>
            )}

            {editing && setCalories && (
                <>
                <div className="calories-form">
                    <form onSubmit={handleSubmit}>
                        <label>Adjust your daily calorie intake: </label>
                    </form>
                </div>
                </>
            )}

            {editing && setSugar && (
                <>
                <div className="sugar-form">
                    <form onSubmit={handleSubmit}>
                        <label>Adjust your daily sugar intake: </label>
                    </form>
                </div>
                </>
            )}

            {editing && setCaffeine && (
                <>
                <div className="caffeine-form">
                    <form onSubmit={handleSubmit}>
                        <label>Adjust your daily caffeine intake: </label>
                    </form>
                </div>
                </>
            )}
        </div>
    );
}

export default HealthGoals