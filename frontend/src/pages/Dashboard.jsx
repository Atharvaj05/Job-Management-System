import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import JobCard from '../components/JobCard';

export default function Dashboard({ setPage }) {
    const [jobs, setJobs] = useState([]);
    const [filter, setFilter] = useState('All');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchJobs = async () => {
        try {
            const data = await api.getJobs();
            setJobs(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this job?')) {
            try {
                await api.deleteJob(id);
                setJobs(jobs.filter(job => job.id !== id));
            } catch (err) {
                alert('Failed to delete job: ' + err.message);
            }
        }
    };

    const filteredJobs = filter === 'All' ? jobs : jobs.filter(j => j.status === filter);

    if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading dashboard execution data...</div>;
    if (error) return <div style={{ padding: '2rem', color: 'red' }}>Error: {error}</div>;

    return (
        <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h1 style={{ margin: 0 }}>Cluster Engine Jobs</h1>
                <div>
                    <label style={{ marginRight: '0.5rem', fontWeight: 'bold' }}>Filter System Status:</label>
                    <select 
                        value={filter} 
                        onChange={(e) => setFilter(e.target.value)}
                        style={{ padding: '0.4rem', borderRadius: '4px', border: '1px solid #ccc' }}
                    >
                        <option value="All">All Statuses</option>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Failed">Failed</option>
                    </select>
                </div>
            </div>

            {filteredJobs.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#6b7280', marginTop: '3rem' }}>No telemetry data matching current target filters.</p>
            ) : (
                filteredJobs.map(job => (
                    <JobCard 
                        key={job.id} 
                        job={job} 
                        onDelete={handleDelete} 
                        onEdit={(id) => setPage({ name: 'edit', jobId: id })} 
                    />
                ))
            )}
        </div>
    );
}\n