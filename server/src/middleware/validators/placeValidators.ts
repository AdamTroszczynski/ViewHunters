import { fieldValidNumber } from '@/middleware/validators/commonValidators';

export const getNearestPlacesValidators = [fieldValidNumber('geoWidth'), fieldValidNumber('geoHeight')];

export const getSinglePlaceValidators = [fieldValidNumber('id')];
