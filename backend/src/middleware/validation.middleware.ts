import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain, body } from 'express-validator';

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Run all validations
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    return res.status(400).json({
      errors: errors.array().map(err => ({
        field: err.msg.split(' ')[0],
        message: err.msg
      }))
    });
  };
};

// Example validation schemas
export const authValidation = {
  register: [
    body('username')
      .isString()
      .trim()
      .isLength({ min: 3 })
      .withMessage('Username must be at least 3 characters long'),
    body('password')
      .isString()
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long')
  ],
  login: [
    body('username').isString().trim(),
    body('password').isString()
  ]
};

export const taskValidation = {
  create: [
    body('title')
      .isString()
      .trim()
      .notEmpty()
      .withMessage('Title is required'),
    body('description')
      .optional()
      .isString()
      .trim()
  ],
  update: [
    body('title')
      .optional()
      .isString()
      .trim(),
    body('description')
      .optional()
      .isString()
      .trim(),
    body('isComplete')
      .optional()
      .isBoolean()
  ]
}; 