import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';

const font = { fontFamily: 'Dosis', fontSize: 18 };
const task = { flexGrow: 1, fontFamily: 'Dosis', fontSize: 18 };

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    return (
        <AppBar position="sticky" color="primary">
            <Toolbar>
                <Typography variant="h6" sx={task}>
                    Lumaa Task Manager
                </Typography>
                <IconButton sx={font} color="inherit" onClick={() => navigate('/login')}>
                    Log Out
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar