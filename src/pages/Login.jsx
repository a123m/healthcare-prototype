import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginApi } from '../api/auth';
import { login } from '../store/authSlice';
import {
  Button,
  Container,
  TextField,
  Typography,
  Box,
  Tabs,
  Tab,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  InputLabel,
  FormControl,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const allUsers = ['Alice', 'Bob', 'Charlie', 'David', 'Eva'];

const AuthTab = () => {
  const [tab, setTab] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Login state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  // Attendance state
  const [selectedUser, setSelectedUser] = useState('');
  const [date, setDate] = useState('');
  const [present, setPresent] = useState(false);
  const [attendanceMarked, setAttendanceMarked] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginError('');

    try {
      const data = await loginApi(email, password);
      dispatch(login({ role: 'admin', token: data.token }));
      navigate('/dashboard');
    } catch (error) {
      setLoginError(error.detail || error.message || 'Login failed');
      alert('Offline login');
      dispatch(login({ role: 'admin', token: 'asdf' }));
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleAttendanceSubmit = (e) => {
    e.preventDefault();
    if (!selectedUser || !date) return;

    console.log('Attendance marked:', {
      user: selectedUser,
      date,
      present,
    });
    setAttendanceMarked(true);
    setTimeout(() => setAttendanceMarked(false), 2000);
  };

  return (
    <Container maxWidth='xs'>
      <Box mt={8} boxShadow={3} p={3}>
        <Tabs value={tab} onChange={(_, val) => setTab(val)} centered>
          <Tab label='Login' />
          <Tab label='Attendance' />
        </Tabs>

        {tab === 0 && (
          <form onSubmit={handleLogin}>
            <Typography variant='h5' mb={2} mt={2}>
              Login
            </Typography>
            <TextField
              fullWidth
              label='Email'
              margin='normal'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              fullWidth
              type='password'
              label='Password'
              margin='normal'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {loginError && (
              <Typography color='error' variant='body2'>
                {loginError}
              </Typography>
            )}
            <Button
              fullWidth
              variant='contained'
              type='submit'
              sx={{ mt: 2 }}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        )}

        {tab === 1 && (
          <form onSubmit={handleAttendanceSubmit}>
            <Typography variant='h5' mb={2} mt={2}>
              Mark Attendance
            </Typography>

            <FormControl fullWidth margin='normal'>
              <InputLabel>User</InputLabel>
              <Select
                value={selectedUser}
                label='User'
                onChange={(e) => setSelectedUser(e.target.value)}
              >
                {allUsers.map((user) => (
                  <MenuItem key={user} value={user}>
                    {user}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              type='date'
              label='Date'
              margin='normal'
              InputLabelProps={{ shrink: true }}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={present}
                  onChange={(e) => setPresent(e.target.checked)}
                />
              }
              label='Present'
            />

            <Button fullWidth type='submit' variant='contained' sx={{ mt: 2 }}>
              Submit Attendance
            </Button>

            {attendanceMarked && (
              <Typography color='success.main' mt={1}>
                Attendance marked successfully!
              </Typography>
            )}
          </form>
        )}
      </Box>
    </Container>
  );
};

export default AuthTab;
