import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Box, TextField, MenuItem, Button, CircularProgress, Alert, Typography } from '@mui/material';

export const WorkflowEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [workflow, setWorkflow] = useState({
    name: '',
    description: '',
    triggerId: '',
    conditionIds: [],
    actionIds: []
  });
  const [triggers, setTriggers] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWorkflowData = async () => {
      try {
        // Fetch the workflow details
        const workflowResponse = await axios.get(`http://localhost:3001/api/workflows/${id}`, {withCredentials: true});
        const fetchedWorkflow = workflowResponse.data;

        setWorkflow({
          ...fetchedWorkflow,
          triggerId: fetchedWorkflow.triggerId || '',
          conditionIds: fetchedWorkflow.conditionIds || [],
          actionIds: fetchedWorkflow.actionIds || []
        });

        // Fetch the list of triggers, conditions, and actions
        const [triggersResponse, conditionsResponse, actionsResponse] = await Promise.all([
          axios.get('http://localhost:3001/api/triggers', {withCredentials: true}),
          axios.get('http://localhost:3001/api/conditions', {withCredentials: true}),
          axios.get('http://localhost:3001/api/actions', {withCredentials: true}),
        ]);

        setTriggers(triggersResponse.data);
        setConditions(conditionsResponse.data);
        setActions(actionsResponse.data);

      } catch (error) {
        setError('Failed to load workflow data');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkflowData();
  }, [id]);

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:3001/api/workflows/${id}`, workflow, { withCredentials: true });
      navigate('/workflows'); // Redirect after saving
    } catch (error) {
      setError('Failed to update workflow');
    }
  };

  const handleTriggerChange = (e) => {
    setWorkflow({ ...workflow, triggerId: e.target.value });
  };
  
  const handleConditionsChange = (e) => {
    const selectedConditions = e.target.value;
    setWorkflow({ ...workflow, conditionIds: selectedConditions });
  };
  
  const handleActionsChange = (e) => {
    const selectedActions = e.target.value;
    setWorkflow({ ...workflow, actionIds: selectedActions });
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ marginTop: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ marginTop: 4 }}>
      <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
        <Typography variant="h4" gutterBottom>
          Edit Workflow
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: 600, margin: 'auto' }}>
        <TextField
          label="Name"
          value={workflow.name}
          onChange={(e) => setWorkflow({ ...workflow, name: e.target.value })}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Description"
          value={workflow.description}
          onChange={(e) => setWorkflow({ ...workflow, description: e.target.value })}
          margin="normal"
          fullWidth
        />
        <TextField
          select
          label="Trigger"
          value={workflow.triggerId}
          onChange={handleTriggerChange}
          margin="normal"
          fullWidth
        >
          {triggers.map((trigger) => (
            <MenuItem key={trigger._id} value={trigger._id}>
              {trigger.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Conditions"
          multiple
          value={workflow.conditionIds}
          onChange={handleConditionsChange}
          margin="normal"
          fullWidth
          SelectProps={{ multiple: true }}
        >
          {conditions.map((condition) => (
            <MenuItem key={condition._id} value={condition._id}>
              {condition.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Actions"
          multiple
          value={workflow.actionIds}
          onChange={handleActionsChange}
          margin="normal"
          fullWidth
          SelectProps={{ multiple: true }}
        >
          {actions.map((action) => (
            <MenuItem key={action._id} value={action._id}>
              {action.name}
            </MenuItem>
          ))}
        </TextField>
        <Box sx={{ marginTop: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default WorkflowEditPage;
