import './BevBot.css';

import Bot from '../assets/BevBot.gif';

function BevBot() {
    return(
        <div className="bev-bot-container">
            <img src={Bot} className="robot-gif"></img>
            <p className="chat-instructions">Not meeting your goals and need some advice? Come talk to me, BevBot, for tailored recommendations!</p>
            <button className="chat-button">Chat here!</button>
        </div>
    );
}

export default BevBot