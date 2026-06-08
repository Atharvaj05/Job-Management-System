import React, { useState } from 'react';
import { api } from '../services/api';

export default function Register({ setPage }) {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await api.register(form.name, form.email, form.password);
            alert('Registration complete. Proceeding to login console.');
            setPage({ name: 'login' });
        } catch (err) { alert(err.message); }
    };
    return (
        <div style={{ padding: '2rem', maxWidth: '400px', margin: 'auto' }}>
            <h2>System Registration</h2>
            <form onSubmit={handleRegister}>
                <input type="text" placeholder="Full Name" style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }} onChange={e => setForm({...form, name: e.target.value})} />
                <input type="email" placeholder="Email" style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }} onChange={e => setForm({...form, email: e.target.value})} />
                <input type="password" placeholder="Secure Password" style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }} onChange={e => setForm({...form, password: e.target.value})} />
                <button type="submit" style={{ width: '100%', padding: '0.5rem', backgroundColor: '#10b981', color: 'white', border: 'none' }}>Register Identity</button>
            </form>
            <p onClick={() => setPage({ name: 'login' })} style={{ cursor: 'pointer', color: 'blue', textAlign: 'center' }}>Existing profile? Login</p>
        </div>
    );
}