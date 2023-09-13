import { body } from 'express-validator';

export const loginValidation = [
  body('email', 'not right form').isEmail(),
  body('password', 'write more than five symboles').isLength({ min: 5 }),
];

export const registerValidation = [
  body('email', 'not right form of email').isEmail(),
  body('password', 'write more than five symboles').isLength({ min: 5 }),
  body('fullName', 'write your name').isLength({ min: 3 }),
  body('avatarUrl', 'not right link').optional().isURL(),
];

export const postCreateValidation = [
  body('title', 'start to type the title').isLength({ min: 3 }).isString(),
  body('text', 'type your text').isLength({ min: 3 }).isString(),
  body('tags', 'not right form of tags').optional().isString(),
  body('imageUrl', 'not right link on an image').optional().isString(),
];