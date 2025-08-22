import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isSignIn, setIsSignIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyToken = async () => {
            const token = localStorage.getItem("token");
            
            if (!token) {
                setIsSignIn(false);
                setLoading(false);
                return;
            }

            try {
                const response = await fetch('http://localhost:8000/auth/verify-token', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                setIsSignIn(response.ok);
                if (!response.ok) {
                    localStorage.removeItem("token");
                }
            } catch (error) {
                setIsSignIn(false);
                localStorage.removeItem("token");
            } finally {
                setLoading(false);
            }
        };

        verifyToken();
    }, []);

    const login = (token) => {
        localStorage.setItem("token", token);
        setIsSignIn(true);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        setIsSignIn(false);
    };

    return (
        <AuthContext.Provider value={{
            setIsSignIn, 
            isSignIn, 
            loading, 
            login, 
            logout 
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};