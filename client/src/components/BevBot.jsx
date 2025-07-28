import { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
// Import as per the documentation

import './BevBot.css';
import Bot from '../assets/BevBot.gif';

function BevBot() {

    const [showResponse, setShowResponse] = useState("");
    // Use this to replace the instructions with a proper response

    // I need to include the API key

    return(
        <div className="bev-bot-container">
            <img src={Bot} className="robot-gif"></img>
            <p className="chat-instructions">As BevBot, I'll help analyze your beverages for the day and guide you towards making better, more informed decisions!</p>
            <button className="chat-button">Analyze!</button>
        </div>
    );
}

export default BevBot