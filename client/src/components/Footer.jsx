import './Footer.css';

function Footer() {
    return(
        <div className = "footer">
            <p className="footer-content">&copy; SipLy {new Date().getFullYear()} | Built With Your Health In Mind By: Sam L. 🩵 | <a href="https://github.com/samlui1009/SipLy"> GitHub Repository </a></p>
        </div>
    );
}

export default Footer