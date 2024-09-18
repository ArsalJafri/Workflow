// routes/trigger.js
import express from 'express';
import { createTrigger, getTriggers, getTriggerById, updateTrigger, deleteTrigger } from '../controllers/triggerController.js';
import { authenticateToken } from '../middleware/authmiddleware.js';  // Adjust path if needed

const router = express.Router();

router.post('/', authenticateToken, createTrigger); // Creates a trigger (authentication required)
router.get('/', authenticateToken, getTriggers); // Gets all triggers (authentication required)
router.get('/:id', authenticateToken, getTriggerById); // Gets a specific trigger (authentication required)
router.put('/:id', authenticateToken, updateTrigger); // Updates a specific trigger (authentication required)
router.delete('/:id', authenticateToken, deleteTrigger); // Deletes a specific trigger (authentication required)

export { router as triggerRouter };

