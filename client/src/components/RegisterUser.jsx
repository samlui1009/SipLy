import './RegisterUser.css';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function RegisterUser() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // Initial states for email and password fields

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:8080/api/user/register-user', {
            method:'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                userEmail: email,
                userPassWord: password
            })
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Failed to register the user!");
            }
            return res.json();
        })
        .then((userData) => {
            localStorage.setItem("userId", userData.userId);
            // localStorage.setItem("userEmail", userData.userEmail);
            // localStorage.setItem("userPassword", userData.userPassword);
            navigate('/new-user');

        })
        .catch((err) => {
            console.error("Error in registering this user, user may already be registered", err);
        })
    }

    return(
        <div>
            <div className="user-registration-form-container">
                <h1 className="sign-up-header">Sign Up for SipLy</h1>
                <form className="sign-up-form">
                    <div className="form-group">
                        <label className="form-labels">Email</label>
                        <input type="text" className="form-inputs"></input>
                    </div>
                    <div className="form-group">
                        <label className="form-labels">Password</label>
                        <input type="password" className="form-inputs"></input>
                    </div>
            </form>
                    {/* <div className="remember-me-div">
                        <label>Remember me?</label>
                        <input type="checkbox" className="checkbox"></input>
                    </div> */}
                    <div className="button-div">
                        <input type="button" value="Register User" className="register-button"></input>
                        <p>Already have an account? <Link to='/login-to-siply'>Login here!</Link></p>
                    </div>
            </div>
        </div>
    );
}

export default RegisterUser