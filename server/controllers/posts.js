// controllers/posts.js
import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

export const getPosts = async (req, res) => { 
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res) => { 
  const { id } = req.params;
  try {
    const postMessage = await PostMessage.findById(id);
    if (!postMessage) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(postMessage);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const { title, message, selectedFile, creator, tags } = req.body;

  // Validate required fields
  if (!title || !message || !creator) {
    return res.status(400).json({ 
      message: 'Missing required fields',
      required: ['title', 'message', 'creator']
    });
  }

  try {
    const postMessage = new PostMessage({ 
      title, 
      message, 
      selectedFile, 
      creator, 
      tags: tags || []
    });
    await postMessage.save();
    res.status(201).json(postMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, message, creator, selectedFile, tags } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid post ID' });
  }

  try {
    const postMessage = await PostMessage.findById(id);
    if (!postMessage) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Update only the provided fields
    const updateFields = {};
    if (title) updateFields.title = title;
    if (message) updateFields.message = message;
    if (creator) updateFields.creator = creator;
    if (selectedFile) updateFields.selectedFile = selectedFile;
    if (tags) updateFields.tags = tags;

    const updatedPostMessage = await PostMessage.findByIdAndUpdate(
      id,
      updateFields,
      { new: true, runValidators: true }
    );

    res.json(updatedPostMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid post ID' });
  }

  try {
    const postMessage = await PostMessage.findById(id);
    if (!postMessage) {
      return res.status(404).json({ message: 'Post not found' });
    }

    await postMessage.deleteOne();
    res.json({ message: 'Post deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid post ID' });
  }

  try {
    const postMessage = await PostMessage.findById(id);
    if (!postMessage) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Update like count directly since we removed the method
    const updatedPostMessage = await PostMessage.findByIdAndUpdate(
      id,
      { likeCount: postMessage.likeCount + 1 },
      { new: true }
    );

    res.json(updatedPostMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
