// src/components/NavBar.js
import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
} from '@mui/material';
import { Home as HomeIcon, AccountCircle } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';

const NavBar = () => {
  const { isAuthenticated, role } = useSelector((s) => s.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <AppBar position='static'>
      <Toolbar>
        <IconButton
          edge='start'
          color='inherit'
          component={Link}
          to='/dashboard'
        >
          <HomeIcon />
        </IconButton>
        <Typography variant='h6' sx={{ flexGrow: 1 }}>
          Healthcare
        </Typography>

        {isAuthenticated && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {role === 'admin' && (
              <Button color='inherit' component={Link} to='/admin'>
                Admin
              </Button>
            )}
            <IconButton color='inherit' component={Link} to='/profile'>
              <AccountCircle />
            </IconButton>
            <Button color='inherit' onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
