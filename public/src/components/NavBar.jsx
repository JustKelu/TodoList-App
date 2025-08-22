import { useAuth } from "../context/AuthContexts";
import { Link } from "react-router-dom";
import '../styles/navbar.css'
import logo from '../utils/logo.png'

export default function NavBar() {
    const { isSignIn, logout } = useAuth();
    
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/" className="brand-link">
                    <img src={logo} className="brand-icon" />
                    <span className="brand-text">Noctive</span>
                </Link>
            </div>
            
            <div className="navbar-menu">
                <Link to="/" className="nav-link">Home</Link>
                
                {isSignIn ? (
                    <>
                        <Link to="/todos" className="nav-link">My Todos</Link>
                        <button onClick={logout} className="logout-btn">
                            Logout
                        </button>
                    </>
                ) : (
                    <Link to="/login" className="login-link">Login</Link>
                )}
            </div>
            
            {/* Mobile menu toggle (per dopo se vuoi) */}
            <div className="mobile-menu-toggle">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </nav>
    );
}