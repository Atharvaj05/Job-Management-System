import React, { useState } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

export default function App() {
    const [authStatus, setAuthStatus] = useState(!!localStorage.getItem('token'));
    // Track whether the user wants to see the login or register screen
    const [authView, setAuthView] = useState('login'); 

    const logOut = () => {
        localStorage.removeItem('token');
        setAuthStatus(false);
        setAuthView('login');
    };

    // If not authenticated, render the correct split screen dynamically
    if (!authStatus) {
        return authView === 'login' ? (
            <Login setAuthStatus={setAuthStatus} switchToRegister={() => setAuthView('register')} />
        ) : (
            <Register setAuthStatus={setAuthStatus} switchToLogin={() => setAuthView('login')} />
        );
    }

    return <Dashboard logOut={logOut} />;
}