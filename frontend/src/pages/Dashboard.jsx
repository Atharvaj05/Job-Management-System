import React, { useEffect, useState } from 'react';
import { api } from '../services/api';

export default function Dashboard({ logOut }) {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [taskDate, setTaskDate] = useState('');
    const [taskTime, setTaskTime] = useState('');
    const [selectedTaskLogs, setSelectedTaskLogs] = useState(null);
    const [loadingLogsId, setLoadingLogsId] = useState(null);

    const reloadData = async () => {
        try { 
            setTasks(await api.getTasks()); 
        } catch (err) { 
            console.error(err.message); 
        }
    };

    useEffect(() => { 
        reloadData(); 
        const interval = setInterval(reloadData, 5000); // UI auto-refresh every 5s
        return () => clearInterval(interval);
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!title.trim() || !taskDate || !taskTime) {
            return alert("Please specify a task name, execution date, and execution time.");
        }
        try {
            // Combine separate date and time fields into the 'YYYY-MM-DD HH:mm:ss' database standard format
            const safeIsoTime = `${taskDate} ${taskTime}:00`;
            
            await api.createTask({ title, description: "Automated pipeline process.", executeAt: safeIsoTime });
            setTitle('');
            setTaskDate('');
            setTaskTime('');
            reloadData();
        } catch (err) { 
            alert(err.message); 
        }
    };

    const viewLogs = async (id) => {
        setLoadingLogsId(id);
        try {
            const logs = await api.getTaskLogs(id);
            setSelectedTaskLogs({ taskId: id, list: logs });
        } catch (err) { 
            alert(err.message); 
        } finally {
            setLoadingLogsId(null);
        }
    };

    const getStatusBadge = (status) => {
        const styles = {
            Scheduled: { bg: '#fef3c7', text: '#d97706' },
            Running: { bg: '#dbeafe', text: '#2563eb' },
            Completed: { bg: '#d1fae5', text: '#059669' },
            Failed: { bg: '#fee2e2', text: '#dc2626' }
        };
        const current = styles[status] || { bg: '#e5e7eb', text: '#374151' };
        
        return (
            <span style={{
                backgroundColor: current.bg,
                color: current.text,
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
            }}>
                {status}
            </span>
        );
    };

    return (
        <div style={{
            maxWidth: '800px',
            margin: '2rem auto',
            padding: '2rem',
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            color: '#1e293b',
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        }}>
            {/* Corrected Header Layout */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between', // Fixed CSS property case name
                alignItems: 'center',
                borderBottom: '1px solid #e2e8f0',
                paddingBottom: '1.5rem',
                marginBottom: '2rem'
            }}>
                <div>
                    <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700', color: '#0f172a' }}>Task Scheduler</h2>
                    <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: '#64748b' }}>Manage and monitor background executions</p>
                </div>
                <button onClick={logOut} style={{
                    backgroundColor: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '0.5rem 1rem',
                    fontWeight: '600',
                    fontSize: '0.875rem',
                    cursor: 'pointer'
                }}>
                    Sign Out
                </button>
            </div>

            {/* Form Container with Separated Date and Time Components */}
            <div style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '1.5rem',
                marginBottom: '2.5rem'
            }}>
                <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', color: '#334155', fontWeight: '600' }}>Schedule New Task</h4>
                <form onSubmit={handleCreate} style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                    <input 
                        type="text" 
                        placeholder="Task Name (e.g., Database Backup)" 
                        value={title} 
                        onChange={e => setTitle(e.target.value)} 
                        style={{
                            flex: '2 1 250px',
                            padding: '0.625rem',
                            border: '1px solid #cbd5e1',
                            borderRadius: '6px',
                            fontSize: '0.875rem',
                            outline: 'none'
                        }} 
                    />
                    {/* Dedicated Date Picker Input */}
                    <input 
                        type="date" 
                        value={taskDate} 
                        onChange={e => setTaskDate(e.target.value)} 
                        style={{
                            flex: '1 1 140px',
                            padding: '0.625rem',
                            border: '1px solid #cbd5e1',
                            borderRadius: '6px',
                            fontSize: '0.875rem',
                            outline: 'none',
                            color: '#475569'
                        }} 
                    />
                    {/* Dedicated Time Picker Input */}
                    <input 
                        type="time" 
                        value={taskTime} 
                        onChange={e => setTaskTime(e.target.value)} 
                        style={{
                            flex: '1 1 110px',
                            padding: '0.625rem',
                            border: '1px solid #cbd5e1',
                            borderRadius: '6px',
                            fontSize: '0.875rem',
                            outline: 'none',
                            color: '#475569'
                        }} 
                    />
                    <button type="submit" style={{
                        flex: '1 1 100%',
                        padding: '0.625rem',
                        background: '#2563eb',
                        color: 'white',
                        fontWeight: '600',
                        fontSize: '0.875rem',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer'
                    }}>
                        Add to Timeline
                    </button>
                </form>
            </div>

            {/* Task Pipeline List */}
            <h3 style={{ fontSize: '1.125rem', marginBottom: '1rem', color: '#1e293b', fontWeight: '600' }}>Task Pipeline</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {tasks.length === 0 ? (
                    <p style={{ color: '#94a3b8', textAlign: 'center', padding: '2rem' }}>No scheduled tasks running in this workspace.</p>
                ) : (
                    tasks.map(t => (
                        <div key={t.id} style={{
                            padding: '1rem 1.25rem',
                            backgroundColor: '#ffffff',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                        }}>
                            <div>
                                <strong style={{ fontSize: '1rem', color: '#0f172a' }}>{t.title}</strong>
                                <div style={{ marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Target: {t.executeAt}</span>
                                    {getStatusBadge(t.status)}
                                </div>
                            </div>
                            <button 
                                onClick={() => viewLogs(t.id)} 
                                disabled={loadingLogsId === t.id}
                                style={{
                                    padding: '0.5rem 0.75rem',
                                    background: '#f1f5f9',
                                    color: '#475569',
                                    fontSize: '0.75rem',
                                    fontWeight: '600',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: 'pointer'
                                }}
                            >
                                {loadingLogsId === t.id ? 'Loading...' : 'Audit Logs'}
                            </button>
                        </div>
                    ))
                )}
            </div>

            {/* Audit Logs Drawer Panel */}
            {selectedTaskLogs && (
                <div style={{
                    marginTop: '2.5rem',
                    padding: '1.5rem',
                    background: '#0f172a',
                    color: '#f8fafc',
                    borderRadius: '8px',
                    boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.2)'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #334155', paddingBottom: '0.5rem' }}>
                        <h4 style={{ margin: 0, fontSize: '0.875rem', letterSpacing: '0.05em', color: '#94a3b8' }}>SYSTEM AUDIT LOG TRACKER // TASK #{selectedTaskLogs.taskId}</h4>
                        <button onClick={() => setSelectedTaskLogs(null)} style={{ background: 'none', color: '#94a3b8', border: 'none', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold' }}>[CLOSE]</button>
                    </div>
                    {selectedTaskLogs.list.length === 0 ? (
                        <p style={{ color: '#64748b', fontSize: '0.875rem', margin: 0 }}>No active processing history available yet for this task record.</p>
                    ) : (
                        selectedTaskLogs.list.map(l => (
                            <div key={l.id} style={{ fontSize: '0.85rem', fontFamily: 'monospace', padding: '0.5rem 0', borderBottom: '1px dashed #1e293b' }}>
                                <div style={{ color: '#cbd5e1' }}>
                                    <span style={{ color: '#64748b' }}>[TIME]</span> Run: {l.startedAt} → Done: {l.completedAt || 'Processing'}
                                </div>
                                {l.result && <div style={{ color: '#4ade80', marginTop: '0.25rem' }}><span style={{ color: '#64748b' }}>[OUT]</span> {l.result}</div>}
                                {l.errorMessage && <div style={{ color: '#f87171', marginTop: '0.25rem' }}><span style={{ color: '#64748b' }}>[ERR]</span> {l.errorMessage}</div>}
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}