import SadSlime from '../assets/Sad_Slime.png'
import NeutralSlime from '../assets/Neutral_Slime.png'
import HappySlime from '../assets/Happy_Slime.png';
import ExcitedSlime from '../assets/Excited_Slime.png';
import ThirstySlime from '../assets/Thirsty_Slime.png';

import ProgressBar from './ProgressBar.jsx';

import './HappinessMeter.css';

function HappinessMeter({happinessState, thirsty}) {
    
    let moodSprite;
    // Let the "moodSprite" variable exist without anything associated with it first

    if (thirsty) {
        moodSprite = ThirstySlime;
    } else {
        switch (happinessState) {
            case 0:
                moodSprite = SadSlime;
                break;
            case 1:
                moodSprite = NeutralSlime;
                break;
            case 2:
                moodSprite = HappySlime;
                break;
            case 3:
                moodSprite = ExcitedSlime;
                break;
        }    
    }

    return(
        <div className="happiness-meter">
            <h1>SipLy's Happiness Meter</h1>
            <img src={moodSprite} className="mascot-status"/>
            <ProgressBar happinessState={happinessState} thirsty={thirsty}></ProgressBar>
        </div>
    );
}

export default HappinessMeter