// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="sticky" color="transparent" elevation={0} sx={{ backdropFilter: 'blur(10px)', boxShadow: 'none' }}>
      <Toolbar>
        <Typography color="inherit" variant="h5" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Workflow Automation</Link>
        </Typography>
        <Button color="inherit" sx={{ fontSize: '1.1rem' }}>
          <Link to="/auth" style={{ textDecoration: 'none', color: 'inherit' }}>Login / Register</Link>
        </Button>
        <Button color="inherit" sx={{ fontSize: '1.1rem' }}>
          <Link to="/workflows" style={{ textDecoration: 'none', color: 'inherit' }}>View Workflows</Link>
        </Button>
        <Button color="inherit" sx={{ fontSize: '1.1rem' }}>
          <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>Profile</Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;




