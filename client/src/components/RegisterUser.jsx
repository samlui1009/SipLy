import './RegisterUser.css';

import { FaUser, FaLock } from "react-icons/fa";
import { IoMail } from "react-icons/io5";

function RegisterUser() {

    return(
        <div>
            <div className="user-registration-form-container">
                <h1 className="sign-up-header">Sign Up for SipLy</h1>
                <form className="sign-up-form">
                    <div className="form-group">
                        <label className="form-labels">Username <FaUser></FaUser></label>
                        <input type="text" className="form-inputs"></input>
                    </div>
                    <div className="form-group">
                        <label className="form-labels">Password <FaLock></FaLock></label>
                        <input type="text" className="form-inputs"></input>
                    </div>
                    <div className="form-group">
                        <label className="form-labels">Email <IoMail></IoMail></label>
                        <input type="text" className="form-inputs"></input>
                    </div>
            </form>
                    <div className="remember-me-div">
                        <label>Remember Me?</label>
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