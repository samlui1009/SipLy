import './BevBot.css';

import Bot from '../assets/BevBot.gif';

function BevBot() {
    return(
        <div className="bev-bot-container">
            <img src={Bot} className="robot-gif"></img>
            <p className="chat-instructions">As BevBot, I'll help analyze your beverages for the day and guide you towards making better, more informed decisions!</p>
            <button className="chat-button">Analyze!</button>
        </div>
    );
}

export default BevBot