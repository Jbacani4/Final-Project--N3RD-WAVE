// controllers/userController.js
const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
const { cloudinary } = require('../config/cloudinaryConfig');

// REGISTER A NEW USER
const registerUser = async (req, res, next) => {
  const { name, email, password, cpassword } = req.body;

  if (!name || !email || !password || !cpassword) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (password !== cpassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    const db = req.app.locals.db;
    const usersCollection = db.collection('users');

    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const result = await usersCollection.insertOne({ name, email, password, avatar: '', posts: 0 });
    if (result.insertedId) {
      const newUser = await usersCollection.findOne({ _id: result.insertedId });
      res.status(201).json(newUser);
    } else {
      res.status(500).json({ message: 'Failed to register user' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to register user', error: error.message });
  }
};

// LOGIN A NEW USER
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Both email and password are required' });
  }

  try {
    const db = req.app.locals.db;
    const usersCollection = db.collection('users');
    const user = await usersCollection.findOne({ email, password });

    if (user) {
      const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      res.status(200).json({ user, token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to login user', error: error.message });
  }
};

// USER PROFILE
// GET: /api/users/:id
const getUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const db = req.app.locals.db;
    const usersCollection = db.collection('users');

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const objectId = new ObjectId(id);
    const user = await usersCollection.findOne({ _id: objectId });

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Failed to get user', error);
    res.status(500).json({ message: 'Failed to get user', error: error.message });
  }
};

// CHANGE USER AVATAR
const changeAvatar = async (req, res, next) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  if (req.user._id !== userId) {
    return res.status(403).json({ message: 'You can only change your own avatar' });
  }

  try {
    const db = req.app.locals.db;
    const usersCollection = db.collection('users');

    const result = await cloudinary.uploader.upload(req.file.path);

    const updateResult = await usersCollection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { avatar: result.secure_url } }
    );

    if (updateResult.matchedCount > 0) {
      res.status(200).json({ message: 'Avatar updated successfully', avatarUrl: result.secure_url });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to change avatar', error: error.message });
  }
};

module.exports = { registerUser, loginUser, getUser, changeAvatar };
