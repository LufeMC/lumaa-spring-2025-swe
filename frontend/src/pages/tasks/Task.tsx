import { Container } from "@mui/material";
import React from "react";
import { Navbar, Tasks } from "../../components";

const Task: React.FC = () => {
    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Navbar />
            <Tasks />
        </Container>
    );
};

export default Task;
