// routes/workflow.js
import express from 'express';
import { createWorkflow, getWorkflows, getWorkflowById, updateWorkflow, deleteWorkflow } from '../controllers/workflowController.js';
import { authenticateToken } from '../middleware/authmiddleware.js';

const router = express.Router();
 
router.post('/', authenticateToken, createWorkflow); //creates a workflow
router.get('/', authenticateToken, getWorkflows); // gets all workflows
router.get('/:id',authenticateToken, getWorkflowById); //gets specific workflows
router.put('/:id',authenticateToken, updateWorkflow); // updates specific workflows
router.delete('/:id', authenticateToken, deleteWorkflow); //deletes specific workflows

export {router as workflowRouter}
