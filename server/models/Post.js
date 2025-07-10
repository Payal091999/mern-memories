import mongoose from 'mongoose';
import sanitize from 'mongo-sanitize';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    minlength: [3, 'Title must be at least 3 characters long'],
    maxlength: 100
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    minlength: [5, 'Message must be at least 5 characters long'],
    maxlength: 1000
  },
  creator: {
    type: String,
    required: [true, 'Creator is required'],
    trim: true,
    maxlength: 100
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: 50
  }],
  selectedFile: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        return /^[a-zA-Z0-9+/]*={0,2}$/.test(v);
      },
      message: 'Invalid base64 image data'
    }
  },
  likeCount: {
    type: Number,
    default: 0,
    min: 0,
    max: 1000000
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Create indexes for better performance
postSchema.index({ creator: 1, createdAt: -1 });
postSchema.index({ tags: 1 });
postSchema.index({ createdAt: -1 });

// Virtual for formatted createdAt
postSchema.virtual('formattedDate').get(function() {
  return this.createdAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

// Method to update like count
postSchema.methods.updateLikeCount = async function() {
  const post = this;
  post.likeCount += 1;
  post.updatedAt = new Date();
  await post.save();
  return post;
};

// Sanitize input
postSchema.pre('save', function(next) {
  const sanitized = sanitize(this.toObject());
  Object.assign(this, sanitized);
  next();
});

const Post = mongoose.model('Post', postSchema);

export default Post;
