import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
  Box,
  CircularProgress,
  Alert,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useSnackbar } from 'notistack';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateInput = () => {
    let isValid = true;
    setUsernameError('');
    setPasswordError('');
    setConfirmPasswordError('');

    if (!username.trim()) {
      setUsernameError('Username is required');
      isValid = false;
    } else if (username.length < 3) {
      setUsernameError('Username must be at least 3 characters');
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    }

    if (!confirmPassword.trim()) {
      setConfirmPasswordError('Please confirm your password');
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInput()) return;

    try {
      setLoading(true);
      await register({ username, password });
      enqueueSnackbar('Registration successful! Redirecting to tasks...', { 
        variant: 'success',
        autoHideDuration: 2000
      });
      setTimeout(() => navigate('/tasks'), 2000);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Registration failed';
      setUsernameError(errorMessage);
      enqueueSnackbar(errorMessage, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setUsernameError('');
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError('');
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordError('');
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" align="center" gutterBottom color="primary">
            Create Account
          </Typography>
          <Typography variant="body2" align="center" color="textSecondary" sx={{ mb: 3 }}>
            Join us to manage your tasks efficiently
          </Typography>
          <form onSubmit={handleSubmit}>
            {(usernameError || passwordError || confirmPasswordError) && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {usernameError || passwordError || confirmPasswordError}
              </Alert>
            )}
            <TextField
              fullWidth
              label="Username"
              margin="normal"
              value={username}
              onChange={handleUsernameChange}
              required
              error={!!usernameError}
              helperText={usernameError}
              disabled={loading}
              inputProps={{
                minLength: 3,
                maxLength: 50,
                'data-testid': 'username-input'
              }}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              margin="normal"
              value={password}
              onChange={handlePasswordChange}
              required
              error={!!passwordError}
              helperText={passwordError}
              disabled={loading}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              inputProps={{
                minLength: 6,
                maxLength: 50,
                'data-testid': 'password-input'
              }}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              margin="normal"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
              error={!!confirmPasswordError}
              helperText={confirmPasswordError}
              disabled={loading}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              inputProps={{
                minLength: 6,
                maxLength: 50,
                'data-testid': 'confirm-password-input'
              }}
              sx={{ mb: 3 }}
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={loading}
              sx={{ 
                mt: 2, 
                mb: 2,
                height: 48,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1rem'
              }}
            >
              {loading ? <CircularProgress size={24} /> : 'Create Account'}
            </Button>
          </form>
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Link 
              component={RouterLink} 
              to="/login"
              sx={{
                textDecoration: 'none',
                color: 'primary.main',
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              Already have an account? Sign in
            </Link>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register; 