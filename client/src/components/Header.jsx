import './Header.css';
import Mascot from '../assets/Siply_Mascot.png';

function Header() {
    return(
        <div className = "header">
            <p>SipLy</p>
            <img src={Mascot} className="mascot"></img>
            <p className="tagline">Level Up Your Hydration Game!</p>
        </div>
    );
}

export default Header