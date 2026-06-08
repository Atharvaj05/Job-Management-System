import React, { useState } from 'react';
import { api } from '../services/api';

export default function Login({ setPage, setAuth }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = await api.login(email, password);
            localStorage.setItem('token', data.token);
            setAuth(true);
            setPage({ name: 'dashboard' });
        } catch (err) { alert(err.message); }
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '400px', margin: 'auto' }}>
            <h2>System Authentication Console</h2>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email Input" style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }} value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder="Password Entry" style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }} value={password} onChange={e => setPassword(e.target.value)} />
                <button type="submit" style={{ width: '100%', padding: '0.5rem', backgroundColor: '#1e40af', color: 'white', border: 'none' }}>Initialize Handshake</button>
            </form>
            <p onClick={() => setPage({ name: 'register' })} style={{ cursor: 'pointer', color: 'blue', textAlign: 'center' }}>Need a profile? Register</p>
        </div>
    );
}