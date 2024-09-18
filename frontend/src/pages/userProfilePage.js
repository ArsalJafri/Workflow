// src/pages/userProfilePage.js
import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, CircularProgress, Alert, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const UserProfilePage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // First, try to fetch the profile as an authenticated user
        const profileResponse = await axios.get('http://localhost:3001/api/auth/profile', {
          withCredentials: true,
        });
        setFormData({
          username: profileResponse.data.username,
          email: profileResponse.data.email,
        });
        setIsLoggedIn(true);
      } catch (error) {
        // If fetching authenticated profile fails, fall back to guest profile
        try {
          const guestResponse = await axios.get('http://localhost:3001/api/auth/guest');
          setFormData({
            username: guestResponse.data.username,
            email: guestResponse.data.email,
          });
          setIsLoggedIn(false);
        } catch (guestError) {
          setError('Failed to load profile');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3001/api/auth/logout', {}, { withCredentials: true });
      // Redirect to home or login page after successful logout
      navigate('/');
    } catch (error) {
      setError('Failed to log out');
    }
  };

  return (
    <Container>
      <Box sx={{ textAlign: 'center', marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          User Profile
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <Box sx={{ marginTop: 2 }}>
            <Typography variant="h6">Username:</Typography>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              {formData.username}
            </Typography>
            <Typography variant="h6">Email:</Typography>
            <Typography variant="body1">
              {formData.email}
            </Typography>
            {isLoggedIn && (
              <Button
                variant="contained"
                color="secondary"
                onClick={handleLogout}
                sx={{ marginTop: 2 }}
              >
                Logout
              </Button>
            )}
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default UserProfilePage;
