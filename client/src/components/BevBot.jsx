import { useState } from 'react';

import './BevBot.css';
import Bot from '../assets/BevBot.gif';

function BevBot({ passedUserId }) {

    const [showInstructions, setShowInstructions] = useState(true);
    // Needed to ensure there is a "transition" between instructions and response
    const [showResponse, setShowResponse] = useState("");
    // Use this to replace the instructions with a proper response
    const userId = passedUserId || localStorage.getItem("userId");

    const handleResetResponse = (e) => {
        e.preventDefault();
        setShowInstructions(true);
        setShowResponse(false);
    }

    const handleAnalysis = (e) => {
        e.preventDefault();

        fetch(`http://localhost:8080/api/ai/bev-bot-analysis/${userId}`, {
            method:'GET',
            headers: {
                'Content-Type':'application/json',
            }
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Failed to generate a response from BevBot!");
            }
            return res.text();
        })
        .then((bevBotResponse) => {
            setShowResponse(bevBotResponse);
            setShowInstructions(false);
        })
        .catch((err) => {
            console.error("Error in generating a response from BevBot", err);
        })
    }

    return(
        <div className="bev-bot-container">
                {showInstructions && !showResponse && (
                    <div className="bev-bot-content">
                        <img src={Bot} className="robot-gif"></img>
                        <p className="chat-instructions">As BevBot, I'll help analyze your beverages for the day and guide you towards making better, more informed decisions!</p>
                        <button className="chat-button" onClick={(handleAnalysis)}>Analyze!</button>
                   </div> 
                )}
                {!showInstructions && showResponse && (
                    <div className="bev-bot-response">
                        <img src={Bot} className="robot-gif"></img>
                        <p className="bot-reply">{showResponse}</p>
                        <button className="reset-button" onClick={(handleResetResponse)}>Reset BevBot!</button>
                    </div>
                )}
            </div>
    );
}

export default BevBot