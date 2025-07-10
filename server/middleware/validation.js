import { body } from 'express-validator';
import sanitize from 'mongo-sanitize';

export const validatePost = [
  body('title')
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters'),
  body('message')
    .trim()
    .isLength({ min: 5, max: 1000 })
    .withMessage('Message must be between 5 and 1000 characters'),
  body('creator')
    .trim()
    .isLength({ max: 100 })
    .withMessage('Creator name cannot exceed 100 characters'),
  body('tags')
    .isArray()
    .withMessage('Tags must be an array')
    .optional(),
  body('selectedFile')
    .isString()
    .withMessage('Selected file must be a string')
    .matches(/^[a-zA-Z0-9+/]*={0,2}$/)
    .withMessage('Invalid base64 image data')
    .optional(),
  (req, res, next) => {
    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.map(err => err.msg)
      });
    }
    next();
  }
];

// Sanitize input middleware
export const sanitizeInput = (req, res, next) => {
  req.body = sanitize(req.body);
  next();
};
