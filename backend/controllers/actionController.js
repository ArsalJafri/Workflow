//actionController.js
import { actionModel } from '../models/ActionModel.js';

// Predefined valid options for actions
const validActionTypes = [
  'Move Email',
  'Move File',
  'Post on all Platforms'
];

// Create a new action
export const createAction = async (req, res) => {
  try {
    const { name, type, target } = req.body;

    // Validate input data
    if (!name || !type || !target) {
      return res.status(400).json({ error: 'Name, type, and target are required' });
    }

    // Validate action type
    if (!validActionTypes.includes(type)) {
      return res.status(400).json({ error: 'Invalid action type' });
    }

    // Create and save the action
    const action = new actionModel({ name, type, target });
    await action.save();
    res.status(201).json(action);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all actions
export const getActions = async (req, res) => {
  try {
    const actions = await actionModel.find();
    res.status(200).json(actions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single action by ID
export const getActionById = async (req, res) => {
  try {
    const action = await actionModel.findById(req.params.id);
    if (!action) return res.status(404).json({ error: 'Action not found' });
    res.status(200).json(action);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an action by ID
export const updateAction = async (req, res) => {
  try {
    const { name, type, target } = req.body;

    // Validate input data
    if (!name || !type || !target) {
      return res.status(400).json({ error: 'Name, type, and target are required' });
    }

    // Validate action type
    if (!validActionTypes.includes(type)) {
      return res.status(400).json({ error: 'Invalid action type' });
    }

    // Update the action
    const action = await actionModel.findByIdAndUpdate(req.params.id, { name, type, target }, { new: true });
    if (!action) return res.status(404).json({ error: 'Action not found' });
    res.status(200).json(action);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an action by ID
export const deleteAction = async (req, res) => {
  try {
    const action = await actionModel.findByIdAndDelete(req.params.id);
    if (!action) return res.status(404).json({ error: 'Action not found' });
    res.status(200).json({ message: 'Action deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
