import React from 'react';
import { Typography, Box } from '@mui/material';
import MeetingScheduler from '../components/MeetingScheduler';

const Dashboard = () => {
  return (
    <Box mt={5} textAlign='center'>
      <Typography variant='h4'>Welcome to Bayer Healthcare</Typography>
      <MeetingScheduler />
    </Box>
  );
};

export default Dashboard;
