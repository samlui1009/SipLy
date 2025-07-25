import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './LoginComponent.css';

function LoginComponent() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // Initial states for the email and password input fields

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:8080/api/user/login', {
            method:'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                emailAddress: email,
                passWord: password
            })
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Failed to log the user in!");
            }
            return res.json();
        })
        .then((userData) => {
            console.log("User data returned from backend:", userData);
            localStorage.setItem("userId", userData.userId);
            localStorage.setItem("userEmail", userData.userEmail);
            navigate('/siply-home');

        })
        .catch((err) => {
            console.error("Error in logging in. Please check your credentials", err);
        })
    }

    return(
        <div>
            <div className="user-login-form-container">
                <h1 className="login-header">Login to SipLy</h1>
                <form className="login-form">
                    <div className="form-group">
                        <label className="form-labels">Email</label>
                        <input type="text"
                               value={email}
                               onChange={(e) => setEmail(e.target.value)} 
                               className="form-inputs"></input>
                    </div>
                    <div className="form-group">
                        <label className="form-labels">Password</label>
                        <input type="password"
                               value={password}
                               onChange={(e) => setPassword(e.target.value)} 
                               className="form-inputs"></input>
                    </div>
                </form>
                    {/* <div className="remember-me-div">
                        <label>Remember me?</label>
                        <input type="checkbox" className="checkbox"></input>
                        <p>Forgot password?</p>
                    </div> */}
                    {/* Remove this for now to ensure a deployable MVP */}
                    <div className="button-div">
                        <input type="button" value="Login" className="login-button" onClick={(handleSubmit)}></input>
                        <p className="new-user-tagline">New user? <Link to='/register-user'>Register here!</Link></p>
                    </div>
            </div>
        </div>
    );
}

export default LoginComponent