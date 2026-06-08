export const validateRegistration = (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Missing mandatory registration credentials.' });
    }
    if (password.length < 6) {
        return res.status(400).json({ error: 'Password must scale to at least 6 characters.' });
    }
    if (!email.includes('@')) {
        return res.status(400).json({ error: 'Invalid structure format detected for email.' });
    }
    next();
};

export const validateLogin = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password arrays are required.' });
    }
    next();
};