import './Header.css';
import Mascot from '../assets/Siply_Mascot.png';

function Header() {
    return(
        <div className = "header">
            <p>SipLy | Level Up Your Hydration Game!</p>
            <img src={Mascot} className="mascot"></img>
            <ul className="header-buttons-container">
                <button className="header-button"><li>Login</li></button>
                <button className="header-button"><li>Logout</li></button>
            </ul>
        </div>
    );
}

export default Header