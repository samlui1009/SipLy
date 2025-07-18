import './DailySummary.css';
import './CurrentDrinkLog.jsx';
import CurrentDrinkLog from './CurrentDrinkLog.jsx';

function DailySummary({setDeletedData}) {
    return(
        <div className="daily-log-container">
            <h1>📝 Today's Log</h1>
            <CurrentDrinkLog setNewBeverageData={setDeletedData}></CurrentDrinkLog>
        </div>
    );
}

export default DailySummary