import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { Button, Container, TextField, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
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
