// triggerController.js
import { triggerModel } from '../models/TriggerModel.js';

// Predefined valid options for triggers
const validTriggerTypes = [
  'Email Received',
  'File Downloaded',
  'Picture Posted'
];

// Create a new trigger
export const createTrigger = async (req, res) => {
  try {
    const { name, event } = req.body;

    // Validate input data
    if (!name || !event) {
      return res.status(400).json({ error: 'Name and event are required' });
    }

    // Validate event type
    if (!validTriggerTypes.includes(event)) {
      return res.status(400).json({ error: 'Invalid event type' });
    }

    const trigger = new triggerModel({ name, event });
    await trigger.save();
    res.status(201).json(trigger);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all triggers
export const getTriggers = async (req, res) => {
  try {
    const triggers = await triggerModel.find();
    res.status(200).json(triggers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single trigger by ID
export const getTriggerById = async (req, res) => {
  try {
    const trigger = await triggerModel.findById(req.params.id);
    if (!trigger) return res.status(404).json({ error: 'Trigger not found' });
    res.status(200).json(trigger);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a trigger by ID
export const updateTrigger = async (req, res) => {
  try {
    const { name, event } = req.body;

    // Validate input data
    if (!name || !event) {
      return res.status(400).json({ error: 'Name and event are required' });
    }

    // Validate event type
    if (!validTriggerTypes.includes(event)) {
      return res.status(400).json({ error: 'Invalid event type' });
    }

    const trigger = await triggerModel.findByIdAndUpdate(req.params.id, { name, event }, { new: true });
    if (!trigger) return res.status(404).json({ error: 'Trigger not found' });
    res.status(200).json(trigger);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a trigger by ID
export const deleteTrigger = async (req, res) => {
  try {
    const trigger = await triggerModel.findByIdAndDelete(req.params.id);
    if (!trigger) return res.status(404).json({ error: 'Trigger not found' });
    res.status(200).json({ message: 'Trigger deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
