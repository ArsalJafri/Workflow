// backend/routes/user.js
import express from 'express';
import { registerUser, loginUser, logoutUser, getUserProfile, getGuestProfile, } from '../controllers/userController.js';
import { authenticateToken } from '../middleware/authmiddleware.js'; // Importing the authentication middleware

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);  // Ensure this route is added

// Protecting the profile route with authentication middleware
router.get('/profile', authenticateToken, getUserProfile);  

// New route for guest profile
router.get('/guest', getGuestProfile); 


export { router as userRouter };








