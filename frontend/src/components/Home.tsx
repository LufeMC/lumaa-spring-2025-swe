import React, { useState, useEffect } from 'react';
import './styles.css';
import Tasks from './Tasks';
import axiosInstance from '../utils/axiosInstance';

const Home: React.FC = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const url = `auth/${isRegister ? 'register' : 'login'}`;
        try {
            const response = await axiosInstance.post(url, { username, password });
            if (!isRegister) {
                const { token } = response.data;
                localStorage.setItem('token', token);
                setIsLoggedIn(true);
            }
        } catch (error) {
            console.error('There was an error!', error);
            setErrorMessage('Invalid username or password. Please try again.');
        }
    };

    if (isLoggedIn) {
        return <Tasks />;
    }

    return (
        <React.Fragment>
            <h2>{isRegister ? 'Register' : 'Login'}</h2>
            {errorMessage && <p className="error">{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
            </form>
            <button onClick={() => setIsRegister(!isRegister)}>
                {isRegister ? 'Switch to Login' : 'Switch to Register'}
            </button>
        </React.Fragment>
    );
};

export default Home;