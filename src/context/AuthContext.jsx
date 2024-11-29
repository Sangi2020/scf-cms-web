import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState(() => {
        // Check for token and role in localStorage or sessionStorage
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        const role = localStorage.getItem('role') || sessionStorage.getItem('role');
        
        // Return initial state with values from storage
        return { token, role };
    });

    const login = (token, role, rememberMe) => {
        if (rememberMe) {
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
        } else {
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('role', role);
        }
        setAuthState({ token, role });
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('role');
        setAuthState({ token: null, role: null });
    };

    return (
        <AuthContext.Provider value={{ authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);
