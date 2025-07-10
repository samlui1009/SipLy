import { useState, useEffect } from 'react';
// This is CRITICAL!
import './UserProfile.css';
import Mascot from '../assets/Mascot_Pixel.gif';

function UserProfile() {

    const [user, setUser] = useState(null);
    // We have a "User State" variable that indicates whether
    // a user profile has been loaded yet 
    // Value within useState can be anything - depending on what current needs are 
    // Null = No data yet
    // Booleans = Toggling between true or false states 
    const [editing, setEditing ] = useState(false);
    // Initially, we would NOT be in editing mode 
    const [form, setForm ] = useState({
        name:"",
        age:"",
        weight:"",
        gender:""
        // Initial states for the form
    });
    // Initially, we would NOT be showing the edit form either

    const handleSubmit =(e) => {
        e.preventDefault();
        console.log("Form submitted!", form);
    };
    // Bare-bone actions for now - A function that is needed to handle
    // The form submission
    
    useEffect(() => {
        fetch('http://localhost:8080/api/user/get-user/1')
         .then((res) => {
            if (!res.ok) throw new Error("Failed to fetch user");
            return res.json();
        }) 
        .then((data) => setUser(data))
        .catch(() => console.error("Error in loading the user"));
    },[]);
    // This entire block of code utilizes the API I wrote to fetch back the user
    // Res = Response, so I presume it's okay, if the response is "not ok", then we'll throw a new error
    // Otherwise, return the JSON object that is stored at User 1
    // Then, we set the state of setUser to be loaded with the data

    return(
        <div className="profile-container">
            <div className="profile-content">
                <h1>Your Profile</h1>
                <img src={Mascot} className="profile-pic"></img>
                {user && !editing && (
                    <div className="profile-demographics">
                        <li>Name: {user.name} </li>
                        <li>Age: {user.age}</li>
                        <li>Weight (Lbs): {user.weight}</li>
                        <li>Gender: {user.gender}</li>
                        <button className="edit-button" onClick={() => setEditing(true)}>Edit Profile</button>
                    </div>
                )}

                {/* To conditionally show something, we need to use the curly brackets to indicate that */
                editing && (
                    <div className="edit-form">
                        <form onSubmit={handleSubmit}>
                            <label>Updated Name: </label>
                            <input type="text"
                                   value={form.name}
                                   onChange={(e) => setForm({ ...form, name: e.target.value})}
                            />
                            <label>Updated Age: </label>
                            <input type="number"
                                   value={form.age}
                                   onChange={(e) => setForm({ ...form, age: e.target.value})}
                            />
                            <label>Updated Weight: </label>
                            <input type="number"
                                   value={form.weight}
                                   onChange={(e) => setForm({ ...form, weight: e.target.value})}
                            />
                            <label>Updated Gender: </label>
                            <input type="text"
                                   value={form.gender}
                                   onChange={(e) => setForm({ ...form, gender: e.target.value})}
                            />
                        </form>
                        <div className="edit-buttons">
                            <button className="finalize-button">Finalize Information</button>
                            <button className="return-button">Go Back</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserProfile