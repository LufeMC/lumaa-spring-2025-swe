import React, { useState } from 'react';
import { Form, Loading, Modal } from '../../components';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import { BASE_URL } from '../../api/api';
import axios from 'axios';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleClose = () => setOpen(false);

    const handleLogin = async () => {
        setIsLoading(true);  // Set loading to true when request starts
        try {
            const response = await axios.post(`${BASE_URL}/auth/login`, {
                username,
                password,
            });

            // If login is successful, store the token and redirect
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                navigate('/');
            }
        } catch (err: any) {
            // If there's an error, display the error message in the modal
            setError(err.response?.data?.error || 'An error occurred. Please try again.');
            setOpen(true);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) return <Loading />;

    return (
        <Container maxWidth="sm">
            <Form
                topTitle="Welcome Back!"
                title="Login"
                buttonText="Login"
                username={username}
                password={password}
                setUsername={setUsername}
                setPassword={setPassword}
                onSubmit={handleLogin}
                linkText="Don't have an account?"
                linkTo="/register"
            />

            <Modal open={open} error={error} handleClose={handleClose} />
        </Container>
    );
};

export default Login;
