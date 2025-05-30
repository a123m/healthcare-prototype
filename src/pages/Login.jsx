import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginApi } from '../api/auth';
import { login } from '../store/authSlice';
import { Button, Container, TextField, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const data = await loginApi(email, password);
      console.log('Login success:', data);
      // Save token or user data here (e.g., localStorage)
    } catch (error) {
      setErrorMsg(error.detail || 'Login failed');
    } finally {
      setLoading(false);
    }
    dispatch(login({ role: 'admin' }));
    navigate('/dashboard');
  };

  return (
    <Container maxWidth='xs'>
      <Box mt={10} p={3} boxShadow={3}>
        <Typography variant='h5' mb={2}>
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField fullWidth label='Username' margin='normal' required />
          <TextField
            fullWidth
            type='password'
            label='Password'
            margin='normal'
            required
          />
          <Button fullWidth variant='contained' type='submit' sx={{ mt: 2 }}>
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
