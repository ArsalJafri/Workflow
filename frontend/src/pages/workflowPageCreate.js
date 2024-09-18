import { useState, useEffect} from 'react';
import axios from 'axios';
import { Container, Box, TextField, MenuItem, Button, Typography, CircularProgress, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const WorkflowPageCreate = () => {
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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [triggersResponse, conditionsResponse, actionsResponse] = await Promise.all([
          axios.get('http://localhost:3001/api/triggers', { withCredentials: true }),
          axios.get('http://localhost:3001/api/conditions', { withCredentials: true }),
          axios.get('http://localhost:3001/api/actions', { withCredentials: true }),
        ]);

        setTriggers(triggersResponse.data);
        setConditions(conditionsResponse.data);
        setActions(actionsResponse.data);
      } catch (error) {
        setError('Failed to load initial data');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const handleCreate = async () => {
    try {
      await axios.post('http://localhost:3001/api/workflows', workflow, { withCredentials: true });
      navigate('/workflows'); // Redirect after creation
    } catch (error) {
      setError('Failed to create workflow');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWorkflow((prevWorkflow) => ({
      ...prevWorkflow,
      [name]: value,
    }));
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
          Create New Workflow
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: 600, margin: 'auto' }}>
        <TextField
          label="Name"
          name="name"
          value={workflow.name}
          onChange={handleInputChange}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Description"
          name="description"
          value={workflow.description}
          onChange={handleInputChange}
          margin="normal"
          fullWidth
        />
        <TextField
          select
          label="Trigger"
          name="triggerId"
          value={workflow.triggerId}
          onChange={handleInputChange}
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
          name="conditionIds"
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
          name="actionIds"
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
          <Button variant="contained" color="primary" onClick={handleCreate}>
            Create
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default WorkflowPageCreate;
