const { ObjectId } = require('mongodb');

// !! REGISTER A NEW USER
// POST: /api/users/register
const registerUser = async (req, res, next) => {
    const { name, email, password } = req.body;

    // Validate the input
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
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
            res.status(200).json(user);
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
        const user = await usersCollection.findOne({ _id: new ObjectId(id) });

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

// !! USER AVATAR
// POST: /api/users/change-avatar
// PROTECTED
const changeAvatar = async (req, res, next) => {
    const { userId, avatarUrl } = req.body;

    // Validate the input
    if (!userId || !avatarUrl) {
        return res.status(400).json({ message: 'User ID and Avatar URL are required' });
    }

    try {
        const db = req.app.locals.db;
        const usersCollection = db.collection('users');
        const result = await usersCollection.updateOne(
            { _id: new ObjectId(userId) },
            { $set: { avatar: avatarUrl } }
        );

        if (result.matchedCount > 0) {
            res.status(200).json({ message: 'Avatar updated successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Failed to change avatar', error);
        res.status(500).json({ message: 'Failed to change avatar', error: error.message });
    }
};

module.exports = { registerUser, loginUser, getUser, changeAvatar };
