// filepath: /c:/Users/vishr/OneDrive/Documents/Lumaa/lumaa-spring-2025-swe/backend/controllers/authController.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../models/userModel.js';

const register = (req, res) => {
    const { name, email, password } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 8);

    const queryText = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *';
    db.query(queryText, [name, email, hashedPassword])
        .then(result => {
            const user = result.rows[0];
            const token = jwt.sign({ id: user.id, email: user.email }, 'secret', { expiresIn: 86400 });
            res.status(201).json({ auth: true, token });
        })
        .catch(err => {
            console.error("Error registering user", err.stack);
            res.status(500).json({ error: 'Error registering user' });
        });
};

const login = (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);

    const queryText = 'SELECT * FROM users WHERE email = $1';
    db.query(queryText, [email])
        .then(result => {
            const user = result.rows[0];
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            const passwordIsValid = bcrypt.compareSync(password, user.password);
            if (!passwordIsValid) {
                return res.status(401).json({ auth: false, token: null });
            }

            const token = jwt.sign({ id: user.id, email: user.email }, 'secret', { expiresIn: 86400 });
            res.status(200).json({ auth: true, token });
            console.log("User logged in successfully");
        })
        .catch(err => {
            console.error("Error logging in user", err.stack);
            res.status(500).json({ error: 'Error logging in user' });
        });
};

export { register, login };