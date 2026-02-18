const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @POST /api/auth/register
const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user — password auto hashed by pre-save hook
    const user = await User.create({
      name,
      email,
      password,
      phone
    });

    // Send back response
    if (user) {
      res.status(201).json({
        _id:   user._id,
        name:  user.name,
        email: user.email,
        role:  user.role,
        token: generateToken(user._id)
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }

  } catch (error) {
    console.log('Register Error:', error); // ← this will show full error in terminal
    res.status(500).json({ message: error.message });
  }
};

// @POST /api/auth/login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id:   user._id,
        name:  user.name,
        email: user.email,
        role:  user.role,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.log('Login Error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @GET /api/auth/profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @PUT /api/auth/profile
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.name    = req.body.name    || user.name;
    user.phone   = req.body.phone   || user.phone;
    user.address = req.body.address || user.address;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updated = await user.save();
    res.json({ message: 'Profile updated', user: updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser, getUserProfile, updateProfile };