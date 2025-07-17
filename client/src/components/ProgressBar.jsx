import './ProgressBar.css';

function ProgressBar({happinessState, thirsty}) {

    let currentProgress = (happinessState/3)*100;
    // Returns back an integer value as a percent for what the conditional fill for the bar should be

    let siplyMood;
    // Assign a new variable called "siplyMood" to determine what Siply should be saying as feedback to the
    // user

    if (thirsty) {
        siplyMood = "Man, I'm thirsty! (｡•́︿•̀｡)";
        currentProgress = 0;
    } else {
        switch (happinessState) {
            case 0:
                siplyMood = "That's okay, you did your best! I'm sad but I'm still proud of you!";
                break;
            case 1:
                siplyMood = "Hmm. Only 1/3 limits achieved today. Good effort!";
                break;
            case 2: 
                siplyMood = "Great job! 2/3 limits achieved today.";
                break;
            case 3:
                siplyMood = "YAY, you did it! I'm so proud of you! ٩(^ᗜ^ )و ´-";
                break;
            default:
                siplyMood = "Man, I'm thirsty!";
                break;
    
        }
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