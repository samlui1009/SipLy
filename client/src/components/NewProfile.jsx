import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewProfile.css';

function NewProfile() {


    const id = localStorage.getItem("userId");
    // Return back the ID that we want for this user 
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [displayUserForm, setDisplayUserForm] = useState(true);
    // State that is necessary to display the initial user form
    const [healthGoalsPanel, setHealthGoalsPanel] = useState(false);
    // States to show the panel for health goals
    const [userForm, setUserForm] = useState({
        name:"",
        age:"",
        weight:"",
        gender:""
        // Initial states for first form, just like how it's set in UserProfile
    })
    const [healthGoalsForm, setHealthGoalsForm] = useState({
        maxCalories:"",
        maxSugar:"",
        maxCaffeine:""
    })
    // Initial states for the second form, just like how it's set in HealthGoals

    // This will be used to handle submissions for the "first" form that shows up
    const handleFirstFormSubmit = (e) => {
        e.preventDefault();

        fetch(`http://localhost:8080/api/user/setup-user/${id}`, {
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
                console.log("Going to next form!")
                setUserForm({
                    name:"",
                    age:"",
                    weight:"",
                    gender:""
                })
                setDisplayUserForm(false);
                setHealthGoalsPanel(true);
                // This needs to be set to false
            })
            .catch((err) => {
                console.error("Error in updating this new users' demographics!", err);
            })
        };

    const handleHealthGoalsFormSubmit = (e) => {
        e.preventDefault();
        
        fetch(`http://localhost:8080/api/health-goals/update-health-goals/${id}`, {
            method:'PUT',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify(healthGoalsForm),
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Failed to update this new users' health goals!");
            }
            return res.json();
        })
        .then((updatedHealthGoals) => {
            setUser(updatedHealthGoals);
            setHealthGoalsForm({
                maxCalories:"",
                maxSugar:"",
                maxCaffeine:""
            })
            navigate('/siply-home');
        })
    }

    return(
        <div>
            <div className="introduction-container">
                <h1>Welcome to SipLy! It's so nice to meet you.</h1>
                <h1>We can't wait to help you out in getting your health goals on track!</h1>

                {displayUserForm && (
                <div className="general-profile-info-container">
                <h3>First things first, tell me a little bit about yourself!</h3>
                <form className="general-info-form" onSubmit={handleFirstFormSubmit}>
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
                    <button type="submit" className="next-btn">Next        
                    </button>
                </form>
                </div>
                )}

                {!displayUserForm && healthGoalsPanel && (
                    <div className="health-goals-panel">
                        <h3>Great! Now, tell me about your current health goals.</h3>
                        <form className="health-goals-form" onSubmit={handleHealthGoalsFormSubmit}>
                            <label className="form-labels">Set your daily caloric intake limit.</label>
                            <input type="number"
                                   value={healthGoalsForm.maxCalories}
                                   className="form-inputs"
                                   onChange={(e) => setHealthGoalsForm({ ...healthGoalsForm, maxCalories: e.target.value})}></input>
                            <label className="form-labels">Set your daily sugar intake limit (in grams).</label>
                            <input type="number"
                                   value={healthGoalsForm.maxSugar}
                                   className="form-inputs"
                                   onChange={(e) => setHealthGoalsForm({ ...healthGoalsForm, maxSugar: e.target.value})}></input>
                            <label className="form-labels">Set your daily caffeine intake limit (in milligrams).</label>
                            <input type="number"
                                   value={healthGoalsForm.maxCaffeine}
                                   className="form-inputs"
                                   onChange={(e) => setHealthGoalsForm({ ...healthGoalsForm, maxCaffeine: e.target.value})}></input>
                            <button type="submit" 
                                   className="submit-btn">
                                    Submit!
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

export default NewProfile

{/* Difference between onSubmit vs. onClick => 
onSubmit is primarily used for submission of forms like here 
onClick is for standalone buttons */} 
