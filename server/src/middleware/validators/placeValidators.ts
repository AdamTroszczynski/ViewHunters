import { fieldValidNumber, fieldValidString } from '@/middleware/validators/commonValidators';

export const getNearestPlacesValidators = [fieldValidNumber('geoWidth'), fieldValidNumber('geoHeight')];

export const getSinglePlaceValidators = [fieldValidNumber('id')];

export const getExploredPlacesValidators = [fieldValidNumber('userId')];

export const unlockPlaceValidators = [
  fieldValidNumber('placeId'),
  fieldValidNumber('userId'),
  fieldValidString('code'),
];
