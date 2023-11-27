import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { postLogin } from '../services/UserSevice';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
const defaultTheme = createTheme();

function Login() {
    const navigate = useNavigate();
    const { user, loginContext } = useContext(UserContext);

    useEffect(() => {
        let token = localStorage.getItem('token');
        if (token) {
            navigate('/');
        }
    }, []);
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        handleLogin(data.get('email'), data.get('password'));
    };

    const handleLogin = async (email, password) => {
        // console.log(email, password);
        let res = await postLogin(email, password);
        if (res && res.token) {
            toast.success('Log in successfully');
            localStorage.setItem('token', res.token);
            localStorage.setItem('email', email);
            loginContext(email);
            navigate('/');
            // console.log(user);
        } else {
            toast.error('Failed to login');
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        {/* <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" /> */}
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Sign In
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default Login;
