import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'; // Import your custom theme
import HomePage from './pages/homePage';
import AuthPage from './pages/authPage';
import WorkflowPage from './pages/workflowPage';
import WorkflowPageCreate from './pages/workflowPageCreate';
import UserProfilePage from './pages/userProfilePage';
import Navbar from './components/Navbar'; 
import WorkflowEditPage from './pages/workflowEditPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar /> 
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/workflows" element={<WorkflowPage />} />
          <Route path="/workflows/create" element={<WorkflowPageCreate />} />
          <Route path="/workflows/edit/:id" element={<WorkflowEditPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
} 

export default App;




