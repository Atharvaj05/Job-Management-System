import React from 'react';

export default function Navbar({ setPage }) {
    return (
        <nav style={{ backgroundColor: '#1e40af', padding: '1rem', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ margin: 0, cursor: 'pointer' }} onClick={() => setPage({ name: 'dashboard' })}>Job Control Panel</h2>
            <div>
                <button 
                    onClick={() => setPage({ name: 'dashboard' })}
                    style={{ background: 'none', border: 'none', color: 'white', marginRight: '1rem', cursor: 'pointer', fontSize: '1rem' }}
                >
                    Dashboard
                </button>
                <button 
                    onClick={() => setPage({ name: 'create' })}
                    style={{ backgroundColor: '#10b981', border: 'none', color: 'white', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem' }}
                >
                    + Create New Job
                </button>
            </div>
        </nav>
    );
}\n