import '../styles/login.css'

import { useState } from 'react';
import { useAuth } from '../context/AuthContexts';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const { isSignIn, setIsSignIn } = useAuth();
    const [ isSignUp, setIsSignUp ] = useState();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ isWrong, setIsWrong ] = useState(false);

    const handleLogin = async (event) => {
        event.preventDefault();
        setIsWrong(false);

        const response = await fetch('http://localhost:8000/auth/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email, psw: password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data.user.id);
            setIsSignIn(true);
            setIsWrong(false);
            navigate('/');
        } else {
            setEmail('')
            setPassword('')
            setIsWrong(true);
            console.log('Login failed:', data.error);
        }
    }

    const handleRegister = async (event) => {
        event.preventDefault();

        const response = await fetch('http://localhost:8000/auth/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: username, email: email, psw: password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("token", data.token);
            setIsSignIn(true);
            navigate('/');
        } else {
            console.log('Register failed:', data.error);
        }
    }

    return (
        <div className={`container ${isSignUp ? 'right-panel-active' : ''}`} id="container">
        <div className="form-container sign-up-container">
            <form onSubmit={handleRegister}>
            <h1>Crea un Account</h1>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button>Registrati</button>
            </form>
        </div>
        
        <div className="form-container sign-in-container">
            <form onSubmit={handleLogin}>
            <h1>Accedi</h1>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            {isWrong && <p className="error-message" id='credentials-error'>Email o password errata.</p>}
            <button>Accedi</button>
            </form>
        </div>
        
        <div className="overlay-container">
            <div className="overlay">
            <div className="overlay-panel overlay-left">
                <h1>Ben tornato!</h1>
                <p>Per restare connesso, accedi con le tue credenziali!</p>
                <button className="ghost" onClick={() => setIsSignUp(false)}>
                Accedi
                </button>
            </div>
            <div className="overlay-panel overlay-right">
                <h1>Benvenuto!</h1>
                <p>Inserisci le tue credenziali, e inizia il tuo percorso con noi!</p>
                <button className="ghost" onClick={() => setIsSignUp(true)}>
                Registrati
                </button>
            </div>
            </div>
        </div>
        </div>
    );
}