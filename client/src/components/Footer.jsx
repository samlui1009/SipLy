import './Footer.css';

function Footer() {
    return(
        <div className = "footer">
            <p className="footer-content">&copy; SipLy {new Date().getFullYear()} | Built With Your Health In Mind By: Sam L. 🩵 | GitHub Repository Here</p>
        </div>
    );
}

export default Footer