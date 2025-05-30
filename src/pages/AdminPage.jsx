// src/pages/AdminPage.js
import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import AssignmentTab from '../components/AssignmentTab';
import AdminDashboardTab from '../components/AdminDashboardTab';

const AdminPage = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (e, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Box p={3}>
      <Typography variant='h4' gutterBottom>
        Admin Panel
      </Typography>

      <Tabs
        value={tabIndex}
        onChange={handleChange}
        textColor='primary'
        indicatorColor='primary'
      >
        <Tab label='Staff List Management' />
        <Tab label='Shift Scheduler' />
      </Tabs>

      <Box mt={2}>
        {tabIndex === 0 && <AdminDashboardTab />}
        {tabIndex === 1 && <AssignmentTab />}
      </Box>
    </Box>
  );
};

export default AdminPage;
