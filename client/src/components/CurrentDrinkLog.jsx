import { React, useState, useEffect } from 'react';
import { IoMdCheckmarkCircle } from "react-icons/io";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
// Following documentation
// import Confetti from 'react-confetti-explosion';
// Don't use the Confetti here - use it in BevBot (?)

import SingleBev from './IndividualBeverage.jsx';
// Import required to be used later on

import './CurrentDrinkLog.css';

function CurrentDrinkLog({ setNewBeverageData, passedUserId, setResetTrigger }) {

    const MySwal = withReactContent(Swal);

    const userId = passedUserId || localStorage.getItem("userId");
    const [dailyLog, setDailyLog] = useState([]);
    const [finalizedLog, setFinalizedLog] = useState(false);
    // Initially, the log should NOT be finalized
    const [hasLoggedDrinks, setHasLoggedDrinks] = useState(false);
    // Moved this logic from IndividualBeverage to HERE, as this is the parent component that will showcase all beverages
    const [disableFinalizeButton, setDisableFinalizeButton] = useState(false);
    // 

    const currDate = new Date().toLocaleDateString();

    const handleFinalizeLogPrompt = () => {
        MySwal.fire({
            title: "Are you sure you wish to finalize your daily log?",
            text: "You will not be able to make any more edits after this!",
            icon: "warning",
            showCancelButton: true,
            showConfirmButton: true,
            cancelButtonText: "Cancel",
            confirmButtonText: "Yes, finalize!",
            confirmButtonColor: "#78c1a3",
            cancelButtonColor: "#FF8D7B"
        })
        .then((result) => {
            if (result.isConfirmed) {
                Swal.fire("Finalized!", "", "success");
                setDisableFinalizeButton(true);
                handleFinalizeLog();
                // Call the method
            }
        })
    }

    const handleResetLogPrompt = () => {
        MySwal.fire({
            title: "Are you sure you wish to reset your daily log?",
            text: "Any logged beverages will not be erased permanently!",
            icon: "warning",
            showCancelButton: true,
            showConfirmButton: true,
            cancelButtonText: "Cancel",
            confirmButtonText: "Yes, reset for a new day!",
            confirmButtonColor: "#78c1a3",
            cancelButtonColor: "#FF8D7B"
        })
        .then((result) => {
            if (result.isConfirmed) {
                Swal.fire("Log reset!", "", "success");
                handleResetLog();
                // Call the method
            }
        }
    )}

    const handleFinalizeLog = () => {
        fetch(`http://localhost:8080/api/beverage-log/log-complete/${userId}`, {
            method:'PUT'
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Failed to finalize the users' beverage log");
            }
            return res.json();
        })
        .then(() => {
            setFinalizedLog(true);
        })
        .catch((err) => {
            console.error("Failed to finalize the users' beverage log", err);
        })
    }

    const handleResetLog = () => {
        fetch(`http://localhost:8080/api/beverage-log/reset-log/${userId}`, {
            method:'PUT'
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Failed to reset the users' beverage log");
            }
            return res.json();
        })
        .then(() => {
            setDailyLog([]);
            // Should empty the daily log(?)
            setFinalizedLog(false);
            setDisableFinalizeButton(false);
            setNewBeverageData(prev => prev + 1);
            // Ensures that there is NO beverage data at all
            setResetTrigger(prev => prev + 1);
            setHasLoggedDrinks(false);
            // This should now be false, because there is nothing left anymore
            // console.log("Beverage log cleared!");
            // For troubleshooting - This is working YAY :D
            // This should also be false, because we're resetting the log for a "new day"
        })
        .catch((err) => {
            console.error("Error in resetting the users' beverage log", err);
        })
    }
    // Generally fixed - for now, but need to ensure that ProgressBar and DailyVisualization actually reflects this clearing of data

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
                
                {finalizedLog && (
                    <div className="success-container">
                        {/* <Confetti
                            numberOfPieces = {50}/> */}
                            {/* Temporarily removed to be put elsewhere */}
                        <IoMdCheckmarkCircle className="checkmark"></IoMdCheckmarkCircle><p className="statement">Success! Log finalized for {currDate}. No further edits can be made.</p>
                    </div>
                )}
                {/* Conditional "component" that should only show when the user has clicked "Finalize" */}

                <div className="log-btn-container">
                    <button className="log-btn" disabled={disableFinalizeButton} onClick={(handleFinalizeLogPrompt)}>Finalize Your Daily Summary</button>
                    <button className="log-btn" onClick={(handleResetLogPrompt)}>Reset Your Daily Summary</button>
                </div>
        </div>
    );
}

export default CurrentDrinkLog