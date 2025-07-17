import { useState, useEffect } from 'react';
import './HealthGoals.css';

function HealthGoals() {

    const [user, setUser] = useState(null);
    // This is necessary as this should then be connected to the Daily Log/
    // Progress panels to indicate how user is performing for this date
    // Null = No data yet 
    const [editing, setEditing] = useState(false);
    // At the initial start - Should NOT be in editing mode
    const [showCaloriesForm, setShowCaloriesForm] = useState(false);
    const [showSugarForm, setShowSugarForm] = useState(false);
    const [showCaffeineForm, setShowCaffeineForm] = useState(false);

    const [calories, setCalories] = useState("");
    const [sugar, setSugar] = useState("");
    const [caffeine, setCaffeine] = useState("");


    // 3 separate functions to update calories, sugar and caffeine
    const handleCaloriesSubmit = (e) => {
        e.preventDefault();

        fetch(`http://localhost:8080/api/health-goals/update-calories/1/${calories}`, {
            method:'PUT',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify(calories)
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Failed to update the users' daily caloric goal");
            }
            return res.text();
        })
        .then((updatedUser) => {
            setCalories("")
            setUser(updatedUser);
            setEditing(false);
            setShowCaloriesForm(false);
        })
        .catch((err) => {
            console.error("Error updating the daily caloric limit", err);
        });
    }

    const handleSugarSubmit = (e) => {
        e.preventDefault();

        fetch(`http://localhost:8080/api/health-goals/update-sugar/1/${sugar}`, {
            method:'PUT',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify(sugar)
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Failed to update the users' daily sugar goal");
            }
            return res.json();
        })
        .then((updatedUser) => {
            setSugar("");
            setUser(updatedUser);
            setEditing(false);
            setShowSugarForm(false);
        })
        .catch((err) => {
            console.error("Error updating the daily sugar limit", err);
        });

    }

    const handleCaffeineSubmit = (e) => {
        e.preventDefault();

        fetch(`http://localhost:8080/api/health-goals/update-caffeine/1/${caffeine}`, {
            method:'PUT',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify(caffeine)
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Failed to update the users' daily caffeine goal");
            }
            return res.json();
        })
        .then((updatedUser) => {
            setCaffeine("");
            setUser(updatedUser);
            setEditing(false);
            setShowCaffeineForm(false);
        })
        .catch((err) => {
            console.error("Error updating the daily caffeine limit", err);
        });

    }

    useEffect(() => {
        fetch('http://localhost:8080/api/health-goals/1')
         .then((res) => {
            if (!res.ok) throw new Error("Failed to fetch user");
            return res.json();
        }) 
        .then((data) => setUser(data))
        .catch(() => console.error("Error in loading the user"));
    },[]);
    // useEffect - API to return back the health goals for User 1, which is just me
    // Basically, if the response is NOT okay, then we "fail to fetch the user"

    return(
        <div className="goals-container">
            {!editing && (
                <>
                <h2>🔧 What would you like to update?</h2>
                <div className="button-options">
                    <button className="button" 
                        onClick={() => {
                        setEditing(true);
                        setShowCaloriesForm(true);
                        setShowSugarForm(false);
                        setShowCaffeineForm(false);}}>Calorie Intake Limit</button>
                    <button className="button" 
                        onClick={() => {
                        setShowSugarForm(true);
                        setShowCaloriesForm(false);
                        setShowCaffeineForm(false);
                        setEditing(true)}}>Sugar Intake (grams)</button>
                    <button className="button" 
                        onClick={() => {
                        setShowCaffeineForm(true);
                        setShowCaloriesForm(false);
                        setShowSugarForm(false);
                        setEditing(true)}}>Caffeine Intake (milligrams)</button>
                </div>
                </>
            )}

            {editing && showCaloriesForm && (
                <>
                <div className="calories-form">
                    <form onSubmit={handleCaloriesSubmit}>
                        <h5 className="edit-labels">Adjust your daily calorie intake: </h5>
                        <input type="number"
                               value={calories}
                               onChange={(e) => setCalories(e.target.value)}
                        />
                    </form>
                    <div className="edit-buttons">
                            <button className="finalize-button" onClick={(handleCaloriesSubmit)}>Finalize Information</button>
                            <button className="return-button" onClick={() => setEditing(false)}>Go Back</button>
                    </div>
                </div>
                </>
            )}

            {editing && showSugarForm && (
                <>
                <div className="sugar-form">
                    <form onSubmit={handleSugarSubmit}>
                        <h5 className="edit-labels">Adjust your daily sugar intake: </h5>
                        <input type="number"
                               value={sugar}
                               onChange={(e) => setSugar(e.target.value)}
                        />
                    </form>
                    <div className="edit-buttons">
                            <button className="finalize-button" onClick={(handleSugarSubmit)}>Finalize Information</button>
                            <button className="return-button" onClick={() => setEditing(false)}>Go Back</button>
                    </div>
                </div>
                </>
            )}

            {editing && showCaffeineForm && (
                <>
                <div className="caffeine-form">
                    <form onSubmit={handleCaffeineSubmit}>
                        <h5 className="edit-labels">Adjust your daily caffeine intake: </h5>
                        <input type="number"
                               value={caffeine}
                               onChange={(e) => setCaffeine(e.target.value)}
                        />
                    </form>
                </div>
                <div className="edit-buttons">
                            <button className="finalize-button" onClick={(handleCaffeineSubmit)}>Finalize Information</button>
                            <button className="return-button" onClick={() => setEditing(false)}>Go Back</button>
                </div>
                </>
            )}
        </div>
    );
}

export default HealthGoals