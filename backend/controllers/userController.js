//backend/controllers/userController.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';  // Importing JWT package
import { userModel } from '../models/UserModel.js';

// Register Route
export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await userModel.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: "Username or Email Already Exists!" });
        }

        const hashedPassword = await bcrypt.hash(password, 11);
        const newUser = new userModel({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: "Server error", error });
    }
};

// Login Route
export const loginUser = async (req, res) => {
    const { usernameOrEmail, password } = req.body;

    try {
        // Find user by username or email
        const user = await userModel.findOne({ $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }] });
        if (!user) {
            console.log('User not found');
            return res.status(400).json({ message: "User Doesn't Exist!" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Password mismatch');
            return res.status(400).json({ message: "Username/Email or Password is Incorrect" });
        }

        // Create JWT token
        const token = jwt.sign(
            { userID: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '6h' }  // Token expires in 6 hours
        );

        // Set token in HttpOnly cookie
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'Strict',  // Ensures the cookie is sent with same-site requests
            secure: process.env.NODE_ENV === 'production', // Set to true in production
            maxAge: 3600000,  // 1 hour in milliseconds
        });

        // Return success message
        res.status(200).json({ message: 'Login successful!' });
    } catch (error) {
        console.error('Error during login:', error);  // Log any errors
        res.status(500).json({ message: "Server error", error });
    }
};

// Logout Route to clear cookie
export const logoutUser = (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict'
        });
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get User Profile by userID (Protected Route)
export const getUserProfile = async (req, res) => {
    const { userID } = req.user;  // Extract userID from the token

    try {
        const user = await userModel.findById(userID);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({
            username: user.username,
            email: user.email
        });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: "Server error", error });
    }
};


// Get Guest Profile
export const getGuestProfile = (req, res) => {
    // Return fixed guest profile data
    res.json({
        username: 'Guest',
        email: 'guest@example.com'
    });
};


