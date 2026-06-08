import React, { useEffect, useState } from 'react';
import { api } from '../services/api';

export default function EditJob({ pageState, setPage }) {
    const { jobId } = pageState;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Pending');
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const data = await api.getJob(jobId);
                setTitle(data.title);
                setDescription(data.description || '');
                setStatus(data.status);
            } catch (err) {
                alert('Error loading target item data matrix: ' + err.message);
                setPage({ name: 'dashboard' });
            } finally {
                setLoading(false);
            }
        };
        fetchJob();
    }, [jobId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdating(true);
        try {
            await api.updateJob(jobId, { title, description, status });
            setPage({ name: 'dashboard' });
        } catch (err) {
            alert('Failed compilation runtime modifications: ' + err.message);
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading active configuration profile...</div>;

    return (
        <div style={{ maxWidth: '500px', margin: '3rem auto', padding: '2rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <h2 style={{ marginTop: 0, marginBottom: '1.5rem' }}>Modify Active Payload #{jobId}</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Job Title</label>
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #d1d5db', boxSizing: 'border-box' }}
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Task Description</label>
                    <textarea 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        rows="4"
                        style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #d1d5db', boxSizing: 'border-box' }}
                    />
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>System Execution State</label>
                    <select 
                        value={status} 
                        onChange={(e) => setStatus(e.target.value)}
                        style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #d1d5db' }}
                    >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Failed">Failed</option>
                    </select>
                </div>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                    <button 
                        type="button" 
                        onClick={() => setPage({ name: 'dashboard' })}
                        style={{ backgroundColor: 'white', border: '1px solid #d1d5db', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        Go Back
                    </button>
                    <button 
                        type="submit" 
                        disabled={updating}
                        style={{ backgroundColor: '#3b82f6', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        {updating ? 'Saving Changes...' : 'Commit Operational Update'}
                    </button>
                </div>
            </form>
        </div>
    );
}