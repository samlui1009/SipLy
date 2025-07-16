import DefaultUser from '../assets/Default_User.png'
import Mascot from '../assets/Mascot_Pixel.gif';
import Test from '../assets/Test_Trial.gif';
import './HappinessMeter.css';

function HappinessMeter({happinessState}) {
    
    let moodSprite;
    // Let the "moodSprite" variable exist

    switch (happinessState) {
        case 0:
            moodSprite = DefaultUser;
            break;
        case 1:
            moodSprite = Mascot;
            break;
        case 2:
            moodSprite = Test;
            break;
        case 3:
            moodSprite = DefaultUser;
            break;
        default:
            moodSprite = DefaultUser;
            break;
    }

    return(
        <div className="happiness-meter">
            <h1>SipLy's Happiness Meter</h1>
            <img src={moodSprite} className="mascot-status"/>
        </div>
    );
}

export default HappinessMeter