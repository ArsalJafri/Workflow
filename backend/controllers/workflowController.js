//workflowController.js
import { workflowModel } from '../models/WorkflowModel.js';
import { triggerModel } from '../models/TriggerModel.js';
import { conditionModel } from '../models/ConditionModel.js';
import { actionModel } from '../models/ActionModel.js';

// Create a new workflow
export const createWorkflow = async (req, res) => {
  try {
    const { name, description, triggerId, conditionIds, actionIds } = req.body;

    // Validate input data
    if (!name || !triggerId || !conditionIds || !actionIds) {
      return res.status(400).json({ error: 'Name, trigger, conditions, and actions are required' });
    }

    // Validate trigger ID
    const trigger = await triggerModel.findById(triggerId);
    if (!trigger) {
      return res.status(400).json({ error: 'Invalid trigger selected' });
    }

    // Validate condition IDs
    const conditions = await conditionModel.find({ _id: { $in: conditionIds } });
    if (conditions.length !== conditionIds.length) {
      return res.status(400).json({ error: 'One or more invalid conditions selected' });
    }

    // Validate action IDs
    const actions = await actionModel.find({ _id: { $in: actionIds } });
    if (actions.length !== actionIds.length) {
      return res.status(400).json({ error: 'One or more invalid actions selected' });
    }

    // Create and save the workflow
    const workflow = new workflowModel({ name, description, triggerId, conditionIds, actionIds });
    await workflow.save();
    res.status(201).json(workflow);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all workflows
export const getWorkflows = async (req, res) => {
  try {
    const workflows = await workflowModel
      .find()
      .populate('triggerId')          // Populates trigger data
      .populate('conditionIds')        // Populates conditions data
      .populate('actionIds');          // Populates actions data

    res.status(200).json(workflows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single workflow by ID
export const getWorkflowById = async (req, res) => {
  try {
    const workflow = await workflowModel
      .findById(req.params.id)
      .populate('triggerId')          // Populates trigger data
      .populate('conditionIds')        // Populates conditions data
      .populate('actionIds');          // Populates actions data

    if (!workflow) return res.status(404).json({ error: 'Workflow not found' });
    res.status(200).json(workflow);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a workflow by ID
export const updateWorkflow = async (req, res) => {
  try {
    const { name, description, triggerId, conditionIds, actionIds } = req.body;

    // Validate input data
    if (!name || !triggerId || !conditionIds || !actionIds) {
      return res.status(400).json({ error: 'Name, trigger, conditions, and actions are required' });
    }

    // Validate trigger ID
    const trigger = await triggerModel.findById(triggerId);
    if (!trigger) {
      return res.status(400).json({ error: 'Invalid trigger selected' });
    }

    // Validate condition IDs
    const conditions = await conditionModel.find({ _id: { $in: conditionIds } });
    if (conditions.length !== conditionIds.length) {
      return res.status(400).json({ error: 'One or more invalid conditions selected' });
    }

    // Validate action IDs
    const actions = await actionModel.find({ _id: { $in: actionIds } });
    if (actions.length !== actionIds.length) {
      return res.status(400).json({ error: 'One or more invalid actions selected' });
    }

    // Update and save the workflow
    const workflow = await workflowModel.findByIdAndUpdate(req.params.id, {
      name,
      description,
      triggerId,
      conditionIds,
      actionIds,
    }, { new: true })
      .populate('triggerId')          // Populates updated trigger data
      .populate('conditionIds')        // Populates updated conditions data
      .populate('actionIds');          // Populates updated actions data

    if (!workflow) return res.status(404).json({ error: 'Workflow not found' });

    res.status(200).json(workflow);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a workflow by ID
export const deleteWorkflow = async (req, res) => {
  try {
    const workflow = await workflowModel.findByIdAndDelete(req.params.id);
    if (!workflow) return res.status(404).json({ error: 'Workflow not found' });

    res.status(200).json({ message: 'Workflow deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
