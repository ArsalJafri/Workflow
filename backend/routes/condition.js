// routes/condition.js
import express from 'express';
import { createCondition, getConditions, getConditionById, updateCondition, deleteCondition } from '../controllers/conditionController.js';
import { authenticateToken } from '../middleware/authmiddleware.js';  // Adjust path if needed

const router = express.Router();

router.post('/', authenticateToken, createCondition); // Creates a condition (authentication required)
router.get('/', authenticateToken, getConditions); // Gets all conditions (authentication required)
router.get('/:id', authenticateToken, getConditionById); // Gets a specific condition (authentication required)
router.put('/:id', authenticateToken, updateCondition); // Updates a specific condition (authentication required)
router.delete('/:id', authenticateToken, deleteCondition); // Deletes a specific condition (authentication required)

export { router as conditionRouter };

