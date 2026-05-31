// Centralized Express Error Handling Intermediary
export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    
    const statusCode = err.message === 'Job not found' ? 404 : 400;
    res.status(statusCode).json({
        error: err.message || 'Internal Server Error'
    });
};\n