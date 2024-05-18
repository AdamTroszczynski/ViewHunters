import { fieldValidNumber, fieldValidString } from '@/middleware/validators/commonValidators';

export const getImageValidators = [fieldValidNumber('placeId'), fieldValidString('imageName')];
