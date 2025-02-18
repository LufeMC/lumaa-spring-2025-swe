import React from "react";
import { Link } from "react-router-dom";
import { ask, button, font, form, inputS, main, titleS } from "./Style";
import { Box, Button, TextField, Typography } from "@mui/material";

interface FormProps {
    topTitle: string; // The top heading text
    title: string; // Form title
    buttonText: string; // Button text
    username: string;
    password: string;
    setUsername: (value: string) => void;
    setPassword: (value: string) => void;
    onSubmit: () => void;
    showRegisterLink?: boolean;
    linkText?: string; // Customizable link text (e.g., "Go to Register" or "Already have an account?")
    linkTo?: string; // Path for navigation (e.g., "/register" or "/login")
}

const Form: React.FC<FormProps> = ({
    topTitle,
    title,
    buttonText,
    username,
    password,
    setUsername,
    setPassword,
    onSubmit,
    showRegisterLink = true,
    linkText = "Register here", 
    linkTo = "/register",
}) => {
    return (
        <Box sx={main}>
            {/* Top Title */}
            <Typography sx={font} variant="h4" gutterBottom>
                {topTitle}
            </Typography>

            <Box component="form" sx={form} onSubmit={(e) => e.preventDefault()}>
                {/* Form Title */}
                <Typography variant="h4" sx={titleS}>
                    {title}
                </Typography>

                {/* Username Input */}
                <TextField
                    sx={inputS}
                    fullWidth
                    margin="normal"
                    label="Username"
                    variant="outlined"
                    value={username}
                    autoComplete="off"
                    onChange={(e) => setUsername(e.target.value)}
                />

                {/* Password Input */}
                <TextField
                    sx={inputS}
                    fullWidth
                    label="Password"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    value={password}
                    autoComplete="off"
                    onChange={(e) => setPassword(e.target.value)}
                />

                {/* Submit Button */}
                <Button fullWidth variant="contained" color="primary" sx={button} onClick={onSubmit}>
                    {buttonText}
                </Button>

                {/* Dynamic Navigation Link */}
                {showRegisterLink && (
                    <Typography variant="body2" sx={ask}>
                        {linkText}{" "}
                        <Link to={linkTo}>
                            Click here
                        </Link>
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default Form;
