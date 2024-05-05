import { fieldValidString, baseValid } from '@/middleware/validators/commonValidators';

export const loginValidators = [fieldValidString('username').isLength({ min: 3, max: 120 }), baseValid('password')];

export const registerValidators = [
  fieldValidString('username').isLength({ min: 3, max: 120 }),
  fieldValidString('email').isEmail(),
  baseValid('password'),
  baseValid('passwordRepeat'),
];
