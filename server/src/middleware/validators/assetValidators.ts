import { fieldValidNumber, fieldValidString } from '@/middleware/validators/commonValidators';

export const getImageValidators = [fieldValidNumber('userId'), fieldValidString('imageName')];
