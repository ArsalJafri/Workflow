// src/pages/authPage.js
import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';

export const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    usernameOrEmail: '' // Added for login
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (isRegister) {
        // Registration Request
        res = await axios.post('http://localhost:3001/api/auth/register', {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }, { withCredentials: true });
        setMessage(res.data.message || 'Registration successful!');
      } else {
        // Login Request
        res = await axios.post('http://localhost:3001/api/auth/login', {
          usernameOrEmail: formData.usernameOrEmail,
          password: formData.password,
        }, { withCredentials: true });
  
  
        // Update message based on response
        setMessage(res.data.message || 'Login successful!');
      }
    } catch (error) {
      console.log('Login Error:', error);  // Debugging line
      setMessage(error.response?.data?.message || 'An error occurred.');
    }
  };

  return (
    <Container>
      <Box sx={{ textAlign: 'center', marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          {isRegister ? 'Register' : 'Login'}
        </Typography>
        <Box sx={{ marginTop: 2 }}>
          <form onSubmit={handleSubmit}>
            {isRegister && (
              <>
                <TextField
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                />
              </>
            )}
            {!isRegister && (
              <TextField
                label="Username or Email"
                name="usernameOrEmail"
                value={formData.usernameOrEmail}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                margin="normal"
                required
              />
            )}
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              margin="normal"
              required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              {isRegister ? 'Register' : 'Login'}
            </Button>
            <Button
              variant="text"
              color="secondary"
              fullWidth
              onClick={() => setIsRegister(!isRegister)}
              sx={{ marginTop: 2 }}
            >
              {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
            </Button>
          </form>
        </Box>
        {message && (
          <Typography variant="body1" color="error" sx={{ marginTop: 2 }}>
            {message}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default AuthPage;










