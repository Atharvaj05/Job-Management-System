import React from 'react';

const statusColors = {
    'Pending': '#f59e0b',
    'In Progress': '#3b82f6',
    'Completed': '#10b981',
    'Failed': '#ef4444'
};

export default function JobCard({ job, onDelete, onEdit }) {
    return (
        <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h3 style={{ margin: '0 0 0.5rem 0' }}>{job.title}</h3>
                <span style={{ 
                    backgroundColor: statusColors[job.status], 
                    color: 'white', 
                    padding: '0.25rem 0.75rem', 
                    borderRadius: '9999px', 
                    fontSize: '0.85rem',
                    fontWeight: 'bold'
                }}>
                    {job.status}
                </span>
            </div>
            <p style={{ color: '#4b5563', margin: '0 0 1rem 0' }}>{job.description || 'No description provided.'}</p>
            <div style={{ fontSize: '0.8rem', color: '#9ca3af', marginBottom: '1rem' }}>
                Created: {new Date(job.createdAt).toLocaleString()}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                    onClick={() => onEdit(job.id)}
                    style={{ backgroundColor: '#f3f4f6', border: '1px solid #d1d5db', color: '#374151', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer' }}
                >
                    Edit / Update Status
                </button>
                <button 
                    onClick={() => onDelete(job.id)}
                    style={{ backgroundColor: '#fee2e2', border: 'none', color: '#dc2626', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer' }}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}