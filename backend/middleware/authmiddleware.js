import jwt from 'jsonwebtoken';


export const authenticateToken = (req, res, next) => {
  // Extract the token from the cookies 
  const token = req.cookies.token;  // Access the token stored in the HttpOnly cookie

  if (!token) { 
    console.log('Token missing. Access denied.');
    return res.status(401).json({ message: 'Token missing. Access denied.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Attach the decoded user data to the request object
    next();  // Pass control to the next middleware/route handler
  } catch (error) {
    console.log('Invalid or expired token:', error);
    res.status(403).json({ message: 'Invalid or expired token.' });
  }
};



