//conditionController.js
import { conditionModel } from '../models/ConditionModel.js';

// Predefined valid options for conditions
const validConditionTypes = [
  'Email Keyword: ',
  'Type of File:',
  'Posted on Instagram:'
];

// Create a new condition
export const createCondition = async (req, res) => {
  try {
    const { type, config } = req.body;

    // Validate input data
    if (!type) {
      return res.status(400).json({ error: 'Type is required' });
    }

    // Validate condition type
    if (!validConditionTypes.includes(type)) {
      return res.status(400).json({ error: 'Invalid condition type' });
    }

    // Create and save the condition
    const condition = new conditionModel({ type, config });
    await condition.save();
    res.status(201).json(condition);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all conditions
export const getConditions = async (req, res) => {
  try {
    const conditions = await conditionModel.find();
    res.status(200).json(conditions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single condition by ID
export const getConditionById = async (req, res) => {
  try {
    const condition = await conditionModel.findById(req.params.id);
    if (!condition) return res.status(404).json({ error: 'Condition not found' });
    res.status(200).json(condition);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a condition by ID
export const updateCondition = async (req, res) => {
  try {
    const { type, config } = req.body;

    // Validate input data
    if (!type) {
      return res.status(400).json({ error: 'Type is required' });
    }

    // Validate condition type
    if (!validConditionTypes.includes(type)) {
      return res.status(400).json({ error: 'Invalid condition type' });
    }

    // Update the condition
    const condition = await conditionModel.findByIdAndUpdate(req.params.id, { type, config }, { new: true });
    if (!condition) return res.status(404).json({ error: 'Condition not found' });
    res.status(200).json(condition);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a condition by ID
export const deleteCondition = async (req, res) => {
  try {
    const condition = await conditionModel.findByIdAndDelete(req.params.id);
    if (!condition) return res.status(404).json({ error: 'Condition not found' });
    res.status(200).json({ message: 'Condition deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


