import './DailySummary.css';
import './CurrentDrinkLog.jsx';
import CurrentDrinkLog from './CurrentDrinkLog.jsx';

function DailySummary() {
    return(
        <div className="daily-log-container">
            <h1>📝 Today's Log</h1>
            <CurrentDrinkLog></CurrentDrinkLog>
        </div>
    );
}

export default DailySummary