import './NewProfile.css';
import { GrFormNextLink } from "react-icons/gr";

function NewProfile() {

    return(
        <div>
            <div className="introduction-container">
                <h1>Welcome to SipLy! It's so nice to meet you.</h1>
                <h1>We can't wait to help you out in getting your health goals on track!</h1>
                <div className="general-profile-info-container">
                    <h3>First things first, tell me a little bit about yourself!</h3>
                    <form className="general-info-form">
                        <label className="form-labels">What's your name?</label>
                        <input type="text" className="form-inputs"></input>
                        <label className="form-labels">What's your age?</label>
                        <input type="number" className="form-inputs"></input>
                        <label className="form-labels">What's your current weight in kilograms?</label>
                        <input type="number" className="form-inputs"></input>
                        <label className="form-labels">What are your preferred pronouns?</label>
                        <input type="text" className="form-inputs"></input>
                    </form>
                    <button className="next-btn"><GrFormNextLink></GrFormNextLink></button>
                </div>
                
                <h3>Great! Now, tell me about your current health goals.</h3>
                <form>
                    <label>What is the daily intake limit for calories for beverages that you want to set?</label>
                    <input type="number"></input>
                    <label>What is the daily intake limit for sugar (in grams) for beverages that you want to set?</label>
                    <input type="number"></input>
                    <label>What is the daily intake limit for caffeine (in milligrams) for beverages that you want to set?</label>
                    <input type="number"></input>
                </form>
                {/* This form needs to be part of a conditional/useState */}
            </div>
        </div>
    );
}

export default NewProfile