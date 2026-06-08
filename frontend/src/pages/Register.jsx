import React, { useState } from 'react';
import { api } from '../services/api';

export default function Register({ setAuthStatus, switchToLogin }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        
        try {
            const data = await api.register(name, email, password);
            localStorage.setItem('token', data.token);
            setAuthStatus(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f8fafc',
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}>
            <div style={{
                width: '100%',
                maxWidth: '400px',
                padding: '2.5rem',
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                border: '1px solid #e2e8f0'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ margin: '0', fontSize: '1.625rem', fontWeight: '700', color: '#0f172a' }}>Create Account</h2>
                    <p style={{ margin: '0.4rem 0 0', fontSize: '0.875rem', color: '#64748b' }}>Get started with custom task scheduling</p>
                </div>

                {error && (
                    <div style={{ padding: '0.75rem', marginBottom: '1.25rem', backgroundColor: '#fee2e2', color: '#dc2626', borderRadius: '6px', fontSize: '0.875rem', textAlign: 'center', fontWeight: '500' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#334155', marginBottom: '0.5rem' }}>Full Name</label>
                        <input 
                            type="text" 
                            placeholder="Your name"
                            required 
                            value={name} 
                            onChange={e => setName(e.target.value)}
                            style={{ width: '100%', padding: '0.625rem', border: '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box', outline: 'none', fontSize: '0.875rem' }} 
                        />
                    </div>
                    
                    <div>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#334155', marginBottom: '0.5rem' }}>Email Address</label>
                        <input 
                            type="email" 
                            placeholder="name@company.com"
                            required 
                            value={email} 
                            onChange={e => setEmail(e.target.value)}
                            style={{ width: '100%', padding: '0.625rem', border: '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box', outline: 'none', fontSize: '0.875rem' }} 
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#334155', marginBottom: '0.5rem' }}>Password</label>
                        <input 
                            type="password" 
                            placeholder="••••••••"
                            required 
                            value={password} 
                            onChange={e => setPassword(e.target.value)}
                            style={{ width: '100%', padding: '0.625rem', border: '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box', outline: 'none', fontSize: '0.875rem' }} 
                        />
                    </div>

                    <button type="submit" disabled={isLoading} style={{
                        marginTop: '0.5rem',
                        padding: '0.75rem',
                        backgroundColor: '#2563eb',
                        color: 'white',
                        fontWeight: '600',
                        fontSize: '0.875rem',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: isLoading ? 'not-allowed' : 'pointer',
                        opacity: isLoading ? 0.7 : 1
                    }}>
                        {isLoading ? 'Processing...' : 'Create Account'}
                    </button>
                </form>

                {/* Updated Action Link Area */}
                <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem', color: '#64748b' }}>
                    Already have an account?{' '}
                    <button 
                        type="button" 
                        onClick={switchToLogin} 
                        style={{ background: 'none', border: 'none', color: '#2563eb', fontWeight: '600', cursor: 'pointer', padding: 0, fontSize: '0.875rem' }}
                    >
                        Log in
                    </button>
                </div>
            </div>
        </div>
    );
}