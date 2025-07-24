import './RegisterUser.css';
import { useState, useEffect } from 'react';

function RegisterUser() {

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
                    <div className="remember-me-div">
                        <label>Remember me?</label>
                        <input type="checkbox" className="checkbox"></input>
                    </div>
                    <div className="button-div">
                        <input type="button" value="Register User" className="register-button"></input>
                        <p>Already have an account? Login here!</p>
                    </div>
            </div>
        </div>
    );
}

export default RegisterUser