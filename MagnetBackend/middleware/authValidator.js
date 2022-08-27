import {check, validationResult} from 'express-validator';

const registerPostValidtor = [
   check('name')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('User name can not be empty!')
    .bail()
    .isLength({min: 3})
    .withMessage('Minimum 3 characters required!')
    .bail(),
  check('email')
    .trim()
    .normalizeEmail()
    .not()
    .isEmpty()
    .withMessage('Invalid email address!')
    .bail(),
  check('password')
    .trim()
    .not()
    .isEmpty()
    .isLength({min: 8})
    .withMessage('Password must be 8 length')
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({errors})
    next();
  },
];


const loginPostValidtor = [
  check('email')
    .trim()
    .normalizeEmail()
    .not()
    .isEmpty()
    .withMessage('Invalid email address!')
    .bail(),
  check('password')
    .trim()
    .not()
    .isEmpty()
    .isLength({min: 4})
    .withMessage('Password must be 4 length'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json(errors)
    next();
  }, 
];


export {registerPostValidtor,loginPostValidtor}