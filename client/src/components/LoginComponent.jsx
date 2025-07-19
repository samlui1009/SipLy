import './LoginComponent.css';

function LoginComponent() {

    return(
        <div>
            <div className="user-login-form-container">
                <h1 className="login-header">Login to SipLy</h1>
                <form className="login-form">
                    <div className="form-group">
                        <label className="form-labels">Username</label>
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
                        <p>Forgot password?</p>
                    </div>
                    <div className="button-div">
                        <input type="button" value="Login" className="login-button"></input>
                        <p className="new-user-tagline">New user? Register here!</p>
                    </div>
            </div>
        </div>
    );
}

export default LoginComponent