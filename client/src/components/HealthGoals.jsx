import './HealthGoals.css';

function HealthGoals() {
    return(
        <div className="goals-container">
            <h3>🔧 What would you like to update?</h3>
            <div className="button-options">
                <button className="button">Calories</button>
                <button className="button">Sugar Intake (grams)</button>
                <button className="button">Caffeine Intake (milligrams)</button>
            </div>
        </div>
    );
}

export default HealthGoals