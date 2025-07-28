import { useState, useEffect } from 'react';
// This is CRITICAL!
import './UserProfile.css';
import Mascot from '../assets/Mascot_Pixel.gif';

function UserProfile({ passedUserId }) {

    const [user, setUser] = useState(null);
    const userId = passedUserId || localStorage.getItem("userId");
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
        // Prevents default behaviour of a form submission, causing the page to refresh 
        // This is necessary, especially for React projects so it doesn't reload the full thing!

        fetch(`http://localhost:8080/api/user/update-user/${userId}`, {
            method:'PUT',
            // Sends a PUT request to the backend to update the user with ID 1, mapping is from what we worked on prior
            headers: {
                'Content-Type':'application/json',
            },
            // We are sending JSON data in the request body
            body: JSON.stringify(form),
            // Converts the form state object into a JSON string, including details like the name, age, weight and gender
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Failed to update the user");
            }
            // If the response was successful, then it parses JSON response from the user as seen below
            // Otherwise, it should throw the error message
            return res.json();
        })
        .then((updatedUser) => {
            setUser(updatedUser);
            setEditing(false);
            setForm({
                name:"",
                age:"",
                weight:"",
                gender:""
            })
        })
        // User State has to be updated
        // Then, we exit the form and exit editing mode
        .catch((err) => {
            console.error("Error updating the user", err);
        });
    };
    
    useEffect(() => {
        fetch(`http://localhost:8080/api/user/get-user/${userId}`)
         .then((res) => {
            if (!res.ok) throw new Error("Failed to fetch user");
            return res.json();
        }) 
        .then((data) => setUser(data))
        .catch(() => console.error("Error in loading the user"));
    },[userId]);
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
                        <li>Pronouns: {user.gender}</li>
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
                            <label>Updated Pronouns: </label>
                            <input type="text"
                                   value={form.gender}
                                   onChange={(e) => setForm({ ...form, gender: e.target.value})}
                            />
                        </form>
                        <div className="edit-buttons">
                            <button className="finalize-button" onClick={(handleSubmit)}>Finalize Information</button>
                            <button className="return-button" onClick={() => setEditing(false)}>Go Back</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserProfile