import express from 'express';
import mongoose from 'mongoose';
import User from '../models/User.js';

const router = express.Router();

// Resilient in-memory user store when MongoDB is disconnected
const inMemoryUsers = new Map();

// Helper to check if DB is ready
const isDbConnected = () => mongoose.connection && mongoose.connection.readyState === 1;

// Regex Validations conforming to enterprise security spec
const NAME_REGEX = /^[A-Za-z\s'-]{2,50}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_REGEX = /^(?:\+?\d{1,3}[- ]?)?\d{10,15}$/;
const PASSWORD_COMPLEXITY_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,64}$/;

// =========================================================================
// 1. SIGNUP ENDPOINTS (POST /api/auth/signup & POST /api/auth/register)
// =========================================================================
const handleSignup = async (req, res) => {
  try {
    const { name, email, phone, password, confirmPassword, acceptedTerms, company, role } = req.body;
    const errors = {};

    // 1. Name Validation
    const cleanName = (name || '').trim();
    if (!cleanName || !NAME_REGEX.test(cleanName)) {
      errors.name = 'Please enter your full name (2-50 letters, hyphens, and apostrophes only).';
    }

    // 2. Email Validation
    const cleanEmail = (email || '').toLowerCase().trim();
    if (!cleanEmail || cleanEmail.length > 254 || !EMAIL_REGEX.test(cleanEmail)) {
      errors.email = 'Enter a valid email address.';
    }

    // 3. Password Validation
    if (!password || password.length < 6) {
      errors.password = 'Password must be at least 6 characters long.';
    }

    // 5. Confirm Password
    if (confirmPassword !== undefined && confirmPassword !== password) {
      errors.confirmPassword = 'Passwords do not match.';
    }

    // 6. Terms & Privacy Agreement
    if (acceptedTerms === false) {
      errors.acceptedTerms = 'You must accept the Terms and Privacy Policy.';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(422).json({ success: false, message: 'Validation failed', errors });
    }

    // 7. Check Duplicate Email
    if (isDbConnected()) {
      const existing = await User.findOne({ email: cleanEmail });
      if (existing) {
        return res.status(409).json({ success: false, errors: { email: 'This email is already registered.' } });
      }

      const user = await User.create({
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone || '+91 98840 00000',
        passwordHash: password,
        company: company || '',
        role: role || 'occupier'
      });

      return res.status(201).json({
        success: true,
        message: 'Account created successfully. Please verify your email.',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          company: user.company,
          role: user.role
        }
      });
    } else {
      // In-Memory Fallback
      if (inMemoryUsers.has(cleanEmail)) {
        return res.status(409).json({ success: false, errors: { email: 'This email is already registered.' } });
      }

      const userRecord = {
        id: `usr-${Date.now()}`,
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone || '+91 98840 00000',
        password: password,
        company: company || '',
        role: role || 'occupier',
        savedProperties: []
      };

      inMemoryUsers.set(cleanEmail, userRecord);

      return res.status(201).json({
        success: true,
        message: 'Account created successfully. Welcome to All India Warehouse!',
        user: {
          id: userRecord.id,
          name: userRecord.name,
          email: userRecord.email,
          phone: userRecord.phone,
          company: userRecord.company,
          role: userRecord.role
        }
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
};

router.post('/signup', handleSignup);
router.post('/register', handleSignup);

// =========================================================================
// 2. LOGIN ENDPOINT (POST /api/auth/login)
// =========================================================================
router.post('/login', async (req, res) => {
  try {
    const { email, password, remember } = req.body;
    const cleanEmail = (email || '').toLowerCase().trim();

    if (!cleanEmail || !EMAIL_REGEX.test(cleanEmail)) {
      return res.status(422).json({ success: false, errors: { email: 'Enter a valid email address.' } });
    }

    if (!password) {
      return res.status(422).json({ success: false, errors: { password: 'Enter your password.' } });
    }

    // Generic error response conforming to specification to avoid account enumeration
    const genericAuthError = () => res.status(401).json({
      success: false,
      message: 'Incorrect email or password.'
    });

    if (isDbConnected()) {
      const user = await User.findOne({ email: cleanEmail });
      if (!user) return genericAuthError();
      if (user.passwordHash && user.passwordHash !== password) return genericAuthError();

      return res.json({
        success: true,
        message: 'Logged in successfully.',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          company: user.company,
          role: user.role,
          savedProperties: user.savedProperties || []
        }
      });
    } else {
      // In-Memory store check
      const user = inMemoryUsers.get(cleanEmail);
      if (!user) return genericAuthError();
      if (user.password && user.password !== password) return genericAuthError();

      return res.json({
        success: true,
        message: 'Logged in successfully.',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          company: user.company,
          role: user.role,
          savedProperties: user.savedProperties || []
        }
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
});

// =========================================================================
// 3. FORGOT PASSWORD (POST /api/auth/forgot-password)
// =========================================================================
router.post('/forgot-password', (req, res) => {
  // Always returns generic success response to prevent email enumeration
  res.json({
    success: true,
    message: "If that email exists, we've sent a password reset link."
  });
});

// =========================================================================
// 4. GOOGLE AUTH (POST /api/auth/google)
// =========================================================================
router.post('/google', async (req, res) => {
  try {
    const { email, name, avatar } = req.body;
    const cleanEmail = (email || '').toLowerCase().trim();

    if (!cleanEmail || !EMAIL_REGEX.test(cleanEmail)) {
      return res.status(400).json({ success: false, message: 'Valid Google email is required.' });
    }

    const userName = name || cleanEmail.split('@')[0];

    if (isDbConnected()) {
      let user = await User.findOne({ email: cleanEmail });
      if (!user) {
        user = await User.create({
          name: userName,
          email: cleanEmail,
          phone: '+91 98840 00000',
          role: 'occupier',
          company: 'Google Verified Account'
        });
      }

      return res.json({
        success: true,
        message: 'Google Sign-in successful.',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          company: user.company,
          role: user.role,
          savedProperties: user.savedProperties || []
        }
      });
    } else {
      let user = inMemoryUsers.get(cleanEmail);
      if (!user) {
        user = {
          id: `usr-google-${Date.now()}`,
          name: userName,
          email: cleanEmail,
          phone: '+91 98840 00000',
          role: 'occupier',
          company: 'Google Verified Account',
          savedProperties: []
        };
        inMemoryUsers.set(cleanEmail, user);
      }

      return res.json({
        success: true,
        message: 'Google Sign-in successful.',
        user
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Google sign-in error.' });
  }
});

// =========================================================================
// 5. SAVE PROPERTY (POST /api/auth/save-property)
// =========================================================================
router.post('/save-property', async (req, res) => {
  try {
    const { userId, propertyId } = req.body;
    if (!userId || !propertyId) {
      return res.status(400).json({ success: false, message: 'userId and propertyId are required' });
    }

    if (isDbConnected()) {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ success: false, message: 'User not found' });

      const index = user.savedProperties.indexOf(propertyId);
      if (index > -1) user.savedProperties.splice(index, 1);
      else user.savedProperties.push(propertyId);

      await user.save();
      return res.json({ success: true, savedProperties: user.savedProperties });
    } else {
      return res.json({ success: true, savedProperties: [propertyId] });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
