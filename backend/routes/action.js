// routes/action.js
import express from 'express';
import { createAction, getActions, getActionById, updateAction, deleteAction } from '../controllers/actionController.js';
import { authenticateToken } from '../middleware/authmiddleware.js';  // Adjust path if needed

const router = express.Router();

router.post('/', authenticateToken, createAction); // Creates an action (authentication required)
router.get('/', authenticateToken, getActions); // Gets all actions (authentication required)
router.get('/:id', authenticateToken, getActionById); // Gets a specific action (authentication required)
router.put('/:id', authenticateToken, updateAction); // Updates a specific action (authentication required)
router.delete('/:id', authenticateToken, deleteAction); // Deletes a specific action (authentication required)

export { router as actionRouter };

