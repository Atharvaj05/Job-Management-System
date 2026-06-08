import React, { useEffect, useState } from 'react';
import { api } from '../services/api';

export default function Dashboard({ setPage, logOut }) {
    const [jobs, setJobs] = useState([]);
    const [title, setTitle] = useState('');

    const reloadData = async () => {
        try { setJobs(await api.getJobs()); } catch (err) { alert(err.message); }
    };

    useEffect(() => { reloadData(); }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        try {
            await api.createJob({ title, description: 'Tenant task array operational runtime sequence profile.' });
            setTitle('');
            reloadData();
        } catch (err) { alert(err.message); }
    };

    const handleDelete = async (id) => {
        try {
            await api.deleteJob(id);
            reloadData();
        } catch (err) { alert(err.message); }
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h2>Your isolated jobs workspace</h2>
                <button onClick={logOut} style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '0.5rem' }}>Disconnect</button>
            </div>
            <form onSubmit={handleCreate} style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
                <input type="text" placeholder="Quick Deploy Title" value={title} onChange={e => setTitle(e.target.value)} style={{ flexGrow: 1, padding: '0.5rem' }} />
                <button type="submit" style={{ padding: '0.5rem', backgroundColor: 'green', color: 'white', border: 'none' }}>+ Deploy</button>
            </form>
            <div>
                {jobs.map(j => (
                    <div key={j.id} style={{ padding: '1rem', backgroundColor: '#fff', border: '1px solid #ccc', margin: '0.5rem 0', display: 'flex', justifyContent: 'space-between' }}>
                        <span><strong>{j.title}</strong> [{j.status}]</span>
                        <button onClick={() => handleDelete(j.id)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>Remove</button>
                    </div>
                ))}
            </div>
        </div>
    );
}