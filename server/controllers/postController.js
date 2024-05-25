const { ObjectId } = require('mongodb');
const { cloudinary } = require('../config/cloudinaryConfig');

// CREATE POST
const createPost = async (req, res, next) => {
  const { title, description, location, creator } = req.body;

  if (!title || !description || !location || !creator) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const db = req.app.locals.db;
    const postsCollection = db.collection('posts');

    let imageUrl = '';
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
    }

    const post = {
      title,
      description,
      creator: new ObjectId(creator),
      image: imageUrl,
      location,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await postsCollection.insertOne(post);

    if (result.insertedId) {
      res.status(201).json({ message: 'Post created successfully', postId: result.insertedId });
    } else {
      res.status(500).json({ message: 'Failed to create post' });
    }
  } catch (error) {
    console.error('Failed to create post', error);
    res.status(500).json({ message: 'Failed to create post', error: error.message });
  }
};

// GET ALL POSTS
const getPosts = async (req, res, next) => {
  try {
    const db = req.app.locals.db;
    const postsCollection = db.collection('posts');
    const posts = await postsCollection.find().toArray();
    res.status(200).json(posts);
  } catch (error) {
    console.error('Failed to get posts', error);
    res.status(500).json({ message: 'Failed to get posts', error: error.message });
  }
};

// GET SINGLE POST
const getSinglePost = async (req, res, next) => {
  const { id } = req.params;

  try {
    const db = req.app.locals.db;
    const postsCollection = db.collection('posts');

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid post ID' });
    }

    const post = await postsCollection.findOne({ _id: new ObjectId(id) });

    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    console.error('Failed to get post', error);
    res.status(500).json({ message: 'Failed to get post', error: error.message });
  }
};

// GET POSTS BY USER
const getUserPosts = async (req, res, next) => {
  const { id } = req.params;

  try {
    const db = req.app.locals.db;
    const postsCollection = db.collection('posts');

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const posts = await postsCollection.find({ creator: new ObjectId(id) }).toArray();
    res.status(200).json(posts);
  } catch (error) {
    console.error('Failed to get user posts', error);
    res.status(500).json({ message: 'Failed to get user posts', error: error.message });
  }
};

// EDIT POST
const editPost = async (req, res, next) => {
  const { id } = req.params;
  const { title, description, location } = req.body;
  const userId = req.user._id;

  try {
    const db = req.app.locals.db;
    const postsCollection = db.collection('posts');

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid post ID' });
    }

    const post = await postsCollection.findOne({ _id: new ObjectId(id) });

    if (!post || post.creator.toString() !== userId) {
      return res.status(403).json({ message: 'You can only edit your own posts' });
    }

    const updateData = {
      ...(title && { title }),
      ...(description && { description }),
      ...(location && { location }),
      updatedAt: new Date()
    };

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      updateData.image = result.secure_url;
    }

    const result = await postsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount > 0) {
      res.status(200).json({ message: 'Post updated successfully' });
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    console.error('Failed to edit post', error);
    res.status(500).json({ message: 'Failed to edit post', error: error.message });
  }
};

// DELETE POST
const deletePost = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const db = req.app.locals.db;
    const postsCollection = db.collection('posts');

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid post ID' });
    }

    const post = await postsCollection.findOne({ _id: new ObjectId(id) });

    if (!post || post.creator.toString() !== userId) {
      return res.status(403).json({ message: 'You can only delete your own posts' });
    }

    const result = await postsCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount > 0) {
      res.status(200).json({ message: 'Post deleted successfully' });
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    console.error('Failed to delete post', error);
    res.status(500).json({ message: 'Failed to delete post', error: error.message });
  }
};

module.exports = { createPost, getPosts, getSinglePost, getUserPosts, editPost, deletePost };
