import React from "react";
import { errorS, modal, modelButton, wrong } from "./Style";
import { Box, Button, Fade, Modal, Typography, Backdrop } from "@mui/material";

interface MainModalProps {
    open: boolean;
    error: string | null;
    handleClose: () => void;
};

const MainModal: React.FC<MainModalProps> = ({ open, error, handleClose }) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{ timeout: 500 }}
        >
            <Fade in={open}>
                <Box sx={modal}>
                    <Typography variant="h6" sx={wrong}>
                        Oops! Something Went Wrong
                    </Typography>
                    <Typography variant="body1" sx={errorS}>
                        {error || 'An unexpected error occurred. Please try again later.'}
                    </Typography>
                    <Button
                        onClick={handleClose}
                        variant="contained"
                        color="primary"
                        sx={modelButton}
                    >
                        Close
                    </Button>
                </Box>
            </Fade>
        </Modal>
    );
};

export default MainModal;
