const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
const { cloudinary } = require('../config/cloudinaryConfig');

// !! REGISTER A NEW USER
// POST: /api/users/register
const registerUser = async (req, res, next) => {
  const { name, email, password, cpassword } = req.body;

  // Validate the input
  if (!name || !email || !password || !cpassword) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Validate that password and cpassword match
  if (password !== cpassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    const db = req.app.locals.db;
    const usersCollection = db.collection('users');

    // Check if the user already exists
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
    console.error('Failed to register user', error);
    res.status(500).json({ message: 'Failed to register user', error: error.message });
  }
};

// !! LOGIN A NEW USER
// POST: /api/users/login
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  // Validate the input
  if (!email || !password) {
    return res.status(400).json({ message: 'Both email and password are required' });
  }

  try {
    const db = req.app.locals.db;
    const usersCollection = db.collection('users');
    const user = await usersCollection.findOne({ email, password });

    if (user) {
      // Generate a token
      const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '1h', // Token expiration time
      });

      // Return the user and token
      res.status(200).json({ user, token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Failed to login user', error);
    res.status(500).json({ message: 'Failed to login user', error: error.message });
  }
};

// !! USER PROFILE
// GET: /api/users/:id
// PROTECTED
const getUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const db = req.app.locals.db;
    const usersCollection = db.collection('users');

    // Ensure id is a valid ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const objectId = new ObjectId(id);

    // Log the ObjectId for debugging
    console.log("Searching for user with ObjectId:", objectId);

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

// !! CHANGE USER AVATAR
// POST: /api/users/change-avatar
// PROTECTED
const changeAvatar = async (req, res, next) => {
  const { userId } = req.body;

  // Validate the input
  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  // Ensure the user is changing their own avatar
  if (req.user._id !== userId) {
    return res.status(403).json({ message: 'You can only change your own avatar' });
  }

  try {
    const db = req.app.locals.db;
    const usersCollection = db.collection('users');

    // Upload image to Cloudinary
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
    console.error('Failed to change avatar', error);
    res.status(500).json({ message: 'Failed to change avatar', error: error.message });
  }
};

module.exports = { registerUser, loginUser, getUser, changeAvatar };
