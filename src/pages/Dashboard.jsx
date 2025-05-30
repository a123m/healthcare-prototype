import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { Button, Typography, Box } from '@mui/material';
import MeetingScheduler from '../components/MeetingScheduler';

const Dashboard = () => {
  const dispatch = useDispatch();

  return (
    <Box mt={5} textAlign='center'>
      <Typography variant='h4'>Welcome to Dashboard</Typography>
      <Button
        variant='contained'
        color='error'
        onClick={() => dispatch(logout())}
        sx={{ mt: 2 }}
      >
        Logout
      </Button>
      <MeetingScheduler />
    </Box>
  );
};

export default Dashboard;
