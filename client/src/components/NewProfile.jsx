import './NewProfile.css';

function NewProfile() {

    return(
        <div>
            <div className="introduction-container">
                <h1>Welcome! My name is SipLy. It's so nice to meet you.</h1>
                <h1>I can't wait to help you out in getting your health goals on track!</h1>
                <h3>First things first, tell me a little bit about yourself!</h3>
                <form>
                    <label>What's your name?</label>
                    <input type="text"></input>
                    <label>What's your age?</label>
                    <input type="text"></input>
                    <label>What's your current weight in kilograms?</label>
                    <input type="number"></input>
                    <label>What are your preferred pronouns?</label>
                    <input type="text"></input>
                </form>
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
        </div>
    );
}

export default NewProfile