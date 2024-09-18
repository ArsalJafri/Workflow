//src/pages/homePages.js
import React from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export const HomePage = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ textAlign: 'center', marginTop: 8 }}>
        <Typography variant="h2" gutterBottom>
          Welcome to Your Workflow Automation Platform
        </Typography>
        <Typography variant="h6" paragraph>
          Automate and manage your workflows efficiently.
        </Typography>
        <Box sx={{ marginTop: 4 }}>
          <Button variant="outlined" color="primary" component={Link} to="/auth" sx={{ margin: 1 }}>
            Login / Register
          </Button>
          <Button variant="outlined" color="primary" component={Link} to="/workflows" sx={{ margin: 1 }}>
            View Workflows
          </Button>
          <Button variant="outlined" color="primary" component={Link} to="/profile" sx={{ margin: 1 }}>
            Profile
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;







