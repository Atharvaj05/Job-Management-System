import React, { useState, useEffect } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

export default function App() {
    const [auth, setAuth] = useState(!!localStorage.getItem('token'));
    const [page, setPage] = useState({ name: auth ? 'dashboard' : 'login' });

    const logOut = () => {
        localStorage.removeItem('token');
        setAuth(false);
        setPage({ name: 'login' });
    };

    return (
        <div style={{ backgroundColor: '#f9fafb', minHeight: '100vh', padding: '1rem' }}>
            {page.name === 'login' && <Login setPage={setPage} setAuth={setAuth} />}
            {page.name === 'register' && <Register setPage={setPage} />}
            {page.name === 'dashboard' && auth && <Dashboard setPage={setPage} logOut={logOut} />}
        </div>
    );
}