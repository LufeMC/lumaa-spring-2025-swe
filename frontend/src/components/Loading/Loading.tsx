import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const loadingS = { 
    top: '50%', 
    left: '50%', 
    marginTop: '20px', 
    position: 'absolute', 
    transform: 'translate(-50%, -50%)' 
};

const Loading: React.FC = () => {
    return (
        <Box
            sx={loadingS}
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <CircularProgress />
        </Box>
    )
}

export default Loading;