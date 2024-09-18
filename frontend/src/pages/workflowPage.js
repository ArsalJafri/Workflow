// src/pages/workflowPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container, Box, Typography, Grid, Card, CardContent,
  Button, CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const StyledCard = styled(Card)(({ theme }) => ({
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: theme.shadows[5],
  },
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
}));

export const WorkflowPage = () => {
  const [workflows, setWorkflows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [triggers, setTriggers] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [actions, setActions] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch workflows, triggers, conditions, actions
        const [workflowRes, triggerRes, conditionRes, actionRes] = await Promise.all([
          axios.get('http://localhost:3001/api/workflows', { withCredentials: true }),
          axios.get('http://localhost:3001/api/triggers', { withCredentials: true }),
          axios.get('http://localhost:3001/api/conditions', { withCredentials: true }),
          axios.get('http://localhost:3001/api/actions', { withCredentials: true })
        ]);

        // Update state with fetched data
        setWorkflows(workflowRes.data);
        setTriggers(triggerRes.data);
        setConditions(conditionRes.data);
        setActions(actionRes.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCreateWorkflow = () => {
    navigate('/workflows/create');
  };

  const handleEditClick = (workflowId) => {
    navigate(`/workflows/edit/${workflowId}`);
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ marginTop: 4 }}>
      <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
        <Typography variant="h4" gutterBottom>
          Your Workflows
        </Typography>
        <Box sx={{ marginBottom: 4, textAlign: 'center' }}>
          <Button variant="contained" color="primary" onClick={handleCreateWorkflow}>
            Create Workflow
          </Button>
        </Box>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {workflows.map((workflow) => {
          const trigger = triggers.find(t => t._id === workflow.triggerId);
          const workflowConditions = conditions.filter(c => workflow.conditionIds.includes(c._id));
          const workflowActions = actions.filter(a => workflow.actionIds.includes(a._id));

          return (
            <Grid item xs={12} sm={6} md={4} key={workflow._id}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {workflow.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" paragraph>
                    {workflow.description}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" paragraph>
                    Trigger: {trigger ? trigger.name : 'N/A'}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" paragraph>
                    Conditions: {workflowConditions.map(condition => condition.name).join(', ') || 'None'}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" paragraph>
                    Actions: {workflowActions.map(action => action.name).join(', ') || 'None'}
                  </Typography>
                </CardContent>
                <Box sx={{ padding: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => handleEditClick(workflow._id)}
                  >
                    Edit
                  </Button>
                </Box>
              </StyledCard>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default WorkflowPage;
