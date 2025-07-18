import { GoogleGenAI } from "@google/genai";
// Import as per the documentation

import './BevBot.css';
import Bot from '../assets/BevBot.gif';

function BevBot() {

    // const ai = new GoogleGenAI({});

    // async function main() {
    //     const response = await ai.models.generateContent({
    //         model: "gemini-2.5-flash",
    //         contents: "Say hello!",
    //     });
    //     console.log(response.text);
    // }

    // main();

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