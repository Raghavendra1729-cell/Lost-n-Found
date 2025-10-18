import { body, validationResult } from 'express-validator'

// Validation middleware
export const validateRequest = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors.array()
    })
  }
  next()
}

// Object validation rules
export const validateObject = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Name must be between 1 and 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description must be less than 500 characters'),
  body('type')
    .isIn(['lost', 'found'])
    .withMessage('Type must be either "lost" or "found"'),
  body('location')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Location must be between 1 and 200 characters'),
  body('date')
    .isISO8601()
    .withMessage('Date must be a valid ISO 8601 date'),
  validateRequest
]

// User validation rules
export const validateUser = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Must be a valid email address'),
  body('phone')
    .optional()
    .isMobilePhone()
    .withMessage('Must be a valid phone number'),
  validateRequest
]

// Chat message validation
export const validateMessage = [
  body('content')
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Message must be between 1 and 1000 characters'),
  validateRequest
]
