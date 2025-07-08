import './UserProfile.css';
import DefaultUser from '../assets/Default_User.png';

function UserProfile() {
    return(
        <div className="profile-container">
            <div className="profile-content">
                <h1>Your Profile</h1>
                <img src={DefaultUser} className="profile-pic"></img>
                <div className="profile-demographics">
                    <li>Name: </li>
                    <li>Age: </li>
                    <li>Weight: </li>
                    <li>Gender: </li>
                </div>
                <button className="edit-button">Edit Profile</button>
            </div>
        </div>
    );
}

export default UserProfile