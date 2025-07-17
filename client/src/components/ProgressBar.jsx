import { useState, useEffect } from 'react';
import './ProgressBar.css';

function ProgressBar({happinessState}) {

    let currentProgress = (happinessState/3)*100;
    // Returns back an integer value as a percent for what the conditional fill for the bar should be

    let siplyMood;
    // Assign a new variable called "siplyMood" to determine what Siply should be saying as feedback to the
    // user

    switch (happinessState) {
        case 0:
            siplyMood = "That's okay, you did your best! I'm sad but I'm still proud of you!";
            break;
        case 1:
            siplyMood = "Hmm. Not quite there yet!";
            break;
        case 2: 
            siplyMood = "You're making good progress!";
            break;
        case 3:
            siplyMood = "YAY, you did it! I'm so proud of you! ٩(^ᗜ^ )و ´-";
            break;
        default:
            siplyMood = "Man, I'm thirsty!";
            break;
    }
    
    return(
        <div className = "progress-bar-container">
            <div className="bar-label">
                {siplyMood}
            </div>
            <div className = "bar">
                <div className="bar-fill" 
                    style={{ width: `${currentProgress}%`}}>
                </div>
            </div>
            <p>Current Progress</p>
        </div>
    );
}

export default ProgressBar