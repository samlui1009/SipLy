import { useState } from 'react';
import './NewProfile.css';
import { GrFormNextLink } from "react-icons/gr";

function NewProfile() {

    const [user, setUser] = useState(null);
    const [displayUserForm, setDisplayUserForm] = useState(true)
    const [healthGoalsPanel, setHealthGoalsPanel] = useState(false);
    // States to show the panel for health goals
    const [userForm, setUserForm] = useState({
        name:"",
        age:"",
        weight:"",
        gender:""
        // Initial states for first form, just like how it's set in UserProfile
    })

    // This will be used to handle submissions for the "first" form that shows up
    const handleFirstFormSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:8080/api/user/setup-user/${id}', {
            method:'PUT',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify(userForm),
            })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to update this new users' demographics!");
                }
                return res.json();
            })
            .then((updatedUserData) => {
                setUser(updatedUserData);
                setUserForm({
                    name:"",
                    age:"",
                    weight:"",
                    gender:""
                })
            })
            .catch((err) => {
                console.error("Error in updating this new users' demographics!", err);
            })
        };

    return(
        <div>
            <div className="introduction-container">
                <h1>Welcome to SipLy! It's so nice to meet you.</h1>
                <h1>We can't wait to help you out in getting your health goals on track!</h1>
                <div className="general-profile-info-container">
                    <h3>First things first, tell me a little bit about yourself!</h3>
                    <form className="general-info-form">
                        <label className="form-labels">What's your name?</label>
                        <input type="text" 
                               className="form-inputs"
                               value={userForm.name}
                               onChange={(e) => setUserForm({ ...userForm, name: e.target.value})}></input>
                        <label className="form-labels">What's your age?</label>
                        <input type="number" 
                               className="form-inputs"
                               value={userForm.age}
                               onChange={(e) => setUserForm({ ...userForm, age: e.target.value})}></input>
                        <label className="form-labels">What's your current weight in kilograms?</label>
                        <input type="number" 
                               className="form-inputs"
                               value={userForm.weight}
                               onChange={(e) => setUserForm({ ...userForm, weight: e.target.value})}></input>
                        <label className="form-labels">What are your preferred pronouns?</label>
                        <input type="text" 
                               className="form-inputs"
                               value={userForm.gender}
                               onChange={(e) => setUserForm({ ...userForm, gender: e.target.value})}></input>
                    </form>
                    <input type="button" className="next-btn"
                            value="Next" 
                            onClick={(e) => {
                                handleFirstFormSubmit(e); 
                                setHealthGoalsPanel(true);}}></input>
                </div>

                {healthGoalsPanel && (
                    <div className="health-goals-panel">
                        <h3>Great! Now, tell me about your current health goals.</h3>
                        <form>
                            <label>What is the daily intake limit for calories for beverages that you want to set?</label>
                            <input type="number"></input>
                            <label>What is the daily intake limit for sugar (in grams) for beverages that you want to set?</label>
                            <input type="number"></input>
                            <label>What is the daily intake limit for caffeine (in milligrams) for beverages that you want to set?</label>
                            <input type="number"></input>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

export default NewProfile