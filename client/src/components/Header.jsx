import './Header.css';
import Mascot from '../assets/Siply_Mascot.png';

function Header() {
    return(
        <div className = "header">
            <p>SipLy | Level Up Your Hydration Game!</p>
            <img src={Mascot} className="mascot"></img>
        </div>
    );
}

export default Header